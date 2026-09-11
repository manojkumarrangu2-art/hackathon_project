import {
  AnswerGenerationResult,
  EvaluationResult,
  QuestionMarks,
  AISettings,
} from '../types';
import {
  buildAskQuestionPrompt,
  buildEvaluateAnswerPrompt,
} from './promptTemplates';
import {
  getMockAnswerForQuestion,
  evaluateStudentAnswerMock,
} from './mockAIResponses';

/**
 * Robust JSON parser that handles markdown fences, leading/trailing text,
 * and common JSON quirks returned by LLMs.
 */
function cleanAndParseJSON(raw: string): any | null {
  if (!raw || typeof raw !== 'string') return null;

  let text = raw.trim();

  // Strip markdown code fences if present (```json ... ``` or ``` ...)
  if (text.startsWith('```')) {
    text = text.replace(/^```[a-zA-Z]*\n?/, '').replace(/```\s*$/, '').trim();
  }

  // Find outermost JSON object { ... }
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    text = text.slice(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(text);
  } catch (firstErr) {
    // Attempt minor fixes: remove trailing commas before closing braces/brackets
    try {
      const fixed = text
        .replace(/,\s*([}\]])/g, '$1')
        .replace(/[\u201C\u201D]/g, '"'); // smart quotes
      return JSON.parse(fixed);
    } catch {
      return null;
    }
  }
}

/**
 * Attempts a Gemini API call with multiple model fallbacks in order of speed and stability.
 */
async function callGemini(apiKey: string, prompt: string): Promise<any | null> {
  const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.3,
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = cleanAndParseJSON(rawText);
          if (parsed) return parsed;
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        console.warn(`Gemini model ${model} returned HTTP ${res.status}:`, errData);
      }
    } catch (err) {
      console.warn(`Gemini model ${model} fetch failed:`, err);
    }
  }

  return null;
}

/**
 * Attempts an OpenAI API call.
 */
async function callOpenAI(apiKey: string, prompt: string): Promise<any | null> {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        return cleanAndParseJSON(content);
      }
    } else {
      console.warn(`OpenAI returned HTTP ${res.status}`);
    }
  } catch (err) {
    console.warn('OpenAI API call encountered error:', err);
  }

  return null;
}

export class AIProviderService {
  /**
   * Resolves the active AI provider based on settings and available API keys.
   */
  private static resolveProvider(settings?: AISettings): {
    provider: 'gemini' | 'openai' | 'demo';
    geminiKey?: string;
    openaiKey?: string;
  } {
    const geminiKey =
      settings?.geminiApiKey?.trim() ||
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const openaiKey =
      settings?.openaiApiKey?.trim() ||
      process.env.OPENAI_API_KEY ||
      process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    let provider: 'gemini' | 'openai' | 'demo' = settings?.provider || 'demo';

    // If explicit provider is requested and has a key, respect it.
    if (provider === 'gemini' && geminiKey) return { provider: 'gemini', geminiKey, openaiKey };
    if (provider === 'openai' && openaiKey) return { provider: 'openai', geminiKey, openaiKey };

    // Auto-detection: if configured with an API key, activate the corresponding provider
    if (geminiKey) return { provider: 'gemini', geminiKey, openaiKey };
    if (openaiKey) return { provider: 'openai', geminiKey, openaiKey };

    return { provider: 'demo', geminiKey, openaiKey };
  }

  /**
   * Generates a marks-aware answer using Gemini, OpenAI, or the enriched Demo Engine.
   */
  static async generateAnswer({
    question,
    subject,
    marks,
    materialContext,
    settings,
  }: {
    question: string;
    subject: string;
    marks: QuestionMarks;
    materialContext?: string;
    settings?: AISettings;
  }): Promise<{ result: AnswerGenerationResult; providerUsed: 'gemini' | 'openai' | 'demo' }> {
    const { provider, geminiKey, openaiKey } = this.resolveProvider(settings);

    // 1. Try Gemini if configured
    if (provider === 'gemini' && geminiKey) {
      try {
        const prompt = buildAskQuestionPrompt(question, subject, marks, materialContext);
        const parsed = await callGemini(geminiKey, prompt);

        if (parsed) {
          return {
            result: {
              id: `ans_${Date.now()}`,
              question,
              subject,
              topic: parsed.topic || subject,
              marks,
              difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
              answerMarkdown: parsed.answerMarkdown || 'No answer generated.',
              structuredSections: parsed.structuredSections || [],
              examWritingTip: parsed.examWritingTip || 'Focus on structured headings, formulas, and diagrams.',
              howToGetMoreMarks: parsed.howToGetMoreMarks || {
                missingCommonMistakes: ['Omitting algorithmic complexity', 'Skipping architectural diagram'],
                highYieldKeywords: ['Formal Definition', 'Time Complexity', 'Optimal Substructure'],
                recommendedStructure: ['Definition', 'Working Mechanism', 'Diagram', 'Complexity'],
                diagramAdvice: 'Include an architectural block or state diagram.',
                examinerExpectations: ['Technical depth', 'Formula accuracy', 'Structured layout'],
              },
              groundedMaterialsUsed: materialContext
                ? [materialContext.match(/SOURCE_DOCUMENT:\s*(.+)/i)?.[1]?.trim() || 'Uploaded document']
                : undefined,
            },
            providerUsed: 'gemini',
          };
        }
      } catch (err) {
        console.warn('Gemini API call encountered error, falling back to Demo Mode:', err);
      }
    }

    // 2. Try OpenAI if configured
    if (provider === 'openai' && openaiKey) {
      try {
        const prompt = buildAskQuestionPrompt(question, subject, marks, materialContext);
        const parsed = await callOpenAI(openaiKey, prompt);

        if (parsed) {
          return {
            result: {
              id: `ans_${Date.now()}`,
              question,
              subject,
              topic: parsed.topic || subject,
              marks,
              difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
              answerMarkdown: parsed.answerMarkdown || 'No answer generated.',
              structuredSections: parsed.structuredSections || [],
              examWritingTip: parsed.examWritingTip || 'Focus on structured headings, formulas, and diagrams.',
              howToGetMoreMarks: parsed.howToGetMoreMarks || {
                missingCommonMistakes: ['Omitting algorithmic complexity', 'Skipping architectural diagram'],
                highYieldKeywords: ['Formal Definition', 'Time Complexity', 'Optimal Substructure'],
                recommendedStructure: ['Definition', 'Working Mechanism', 'Diagram', 'Complexity'],
                diagramAdvice: 'Include an architectural block or state diagram.',
                examinerExpectations: ['Technical depth', 'Formula accuracy', 'Structured layout'],
              },
              groundedMaterialsUsed: materialContext
                ? [materialContext.match(/SOURCE_DOCUMENT:\s*(.+)/i)?.[1]?.trim() || 'Uploaded document']
                : undefined,
            },
            providerUsed: 'openai',
          };
        }
      } catch (err) {
        console.warn('OpenAI API call encountered error, falling back to Demo Mode:', err);
      }
    }

    // 3. Document Grounding Extractive Engine (when materialContext is provided)
    if (materialContext) {
      const sourceMatch = materialContext.match(/SOURCE_DOCUMENT:\s*(.+)/i);
      const source = sourceMatch?.[1]?.trim() || 'Uploaded document';
      const rawChunks = materialContext
        .split(/\n\n(?=CHUNK\s+\d+:)/i)
        .filter((part) => /^CHUNK\s+\d+:/i.test(part.trim()))
        .map((part) => part.replace(/^CHUNK\s+\d+:\s*/i, '').trim())
        .filter(Boolean);

      // Support 2+ character technical terms and acronyms (e.g., DP, OS, TCP, SQL, 2PL, ML)
      const terms = question
        .toLowerCase()
        .replace(/[^a-z0-9+#.-]+/g, ' ')
        .split(/\s+/)
        .filter((term) => term.length >= 2);

      const ranked = rawChunks
        .map((chunk) => ({
          chunk,
          score: terms.reduce(
            (score, term) => score + (chunk.toLowerCase().includes(term) ? 1 : 0),
            0
          ),
        }))
        .sort((a, b) => b.score - a.score);

      const selected = (ranked.filter((x) => x.score > 0).length
        ? ranked.filter((x) => x.score > 0)
        : ranked
      )
        .slice(0, marks >= 10 ? 6 : marks >= 5 ? 4 : 2)
        .map((x) => x.chunk);

      const answerMarkdown = selected.length
        ? `## Answer (${marks} Marks Allocation)\n\n**Grounded Source:** ${source}\n\n${selected
            .map((chunk, index) => `### Section ${index + 1}: Key Extract\n${chunk}`)
            .join('\n\n')}\n\n### Exam Writing Tip\nFormulate your handwritten response using the exact definitions, equations, terminology, and complexity classifications provided in ${source}.`
        : `## Answer (${marks} Marks Allocation)\n\n**Grounded Source:** ${source}\n\nThe uploaded material does not contain sufficient relevant text to answer this question. Please upload the relevant textbook chapter or select a different source.`;

      const grounded: AnswerGenerationResult = {
        id: `ans_${Date.now()}`,
        question,
        subject,
        topic: question,
        marks,
        difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
        answerMarkdown,
        structuredSections: selected.map((chunk, index) => ({
          heading: `Grounded Extract ${index + 1}`,
          content: chunk,
          keyKeywords: terms.slice(0, 4),
        })),
        examWritingTip: 'Cite the verified terminology and formulas from the uploaded document in your answer.',
        howToGetMoreMarks: {
          missingCommonMistakes: ['Inventing terminology not grounded in the uploaded syllabus material'],
          highYieldKeywords: terms.slice(0, 5),
          recommendedStructure: ['Definition', 'Working Principles', 'Formula / Example', 'Complexity / Conclusion'],
          diagramAdvice: 'Sketch diagrams matching the textbook figures when available.',
          examinerExpectations: ['Accurate source definitions', 'Complete derivations', 'Correct complexity notation'],
        },
        groundedMaterialsUsed: [source],
      };

      return { result: grounded, providerUsed: 'demo' };
    }

    // 4. Default high-yield knowledge engine across all core subjects and marks allocations
    const mock = getMockAnswerForQuestion(question, subject, marks);
    return {
      result: mock,
      providerUsed: 'demo',
    };
  }

  /**
   * Evaluates student answer using Gemini, OpenAI, or the calibrated Rubric Evaluator.
   */
  static async evaluateAnswer({
    question,
    subject,
    marks,
    studentAnswer,
    settings,
  }: {
    question: string;
    subject: string;
    marks: QuestionMarks;
    studentAnswer: string;
    settings?: AISettings;
  }): Promise<{ result: EvaluationResult; providerUsed: 'gemini' | 'openai' | 'demo' }> {
    const { provider, geminiKey, openaiKey } = this.resolveProvider(settings);

    // 1. Try Gemini if configured
    if (provider === 'gemini' && geminiKey) {
      try {
        const prompt = buildEvaluateAnswerPrompt(question, subject, marks, studentAnswer);
        const parsed = await callGemini(geminiKey, prompt);

        if (parsed) {
          const score = Math.max(0, Math.min(marks, Number(parsed.aiEstimatedScore ?? marks * 0.7)));
          return {
            result: {
              id: `eval_${Date.now()}`,
              questionText: question,
              subject,
              topic: parsed.topic || subject,
              marks,
              studentAnswer,
              recommendedAnswer: parsed.recommendedAnswer || getMockAnswerForQuestion(question, subject, marks).answerMarkdown,
              aiEstimatedScore: Number(score.toFixed(1)),
              maxMarks: marks,
              percentage: Math.round((score / marks) * 100),
              rubricBreakdown: parsed.rubricBreakdown || [],
              markLossReasons: parsed.markLossReasons || [],
              improvementSteps: parsed.improvementSteps || [],
              yourAnswerAnalysis: parsed.yourAnswerAnalysis || {
                strengths: ['Addressed the question.'],
                weaknesses: [],
                wordCount: studentAnswer.split(/\s+/).length,
              },
              evaluationDate: new Date().toISOString().split('T')[0],
              evaluationTimestamp: Date.now(),
            },
            providerUsed: 'gemini',
          };
        }
      } catch (err) {
        console.warn('Gemini evaluation error, falling back to calibrated evaluator:', err);
      }
    }

    // 2. Try OpenAI if configured
    if (provider === 'openai' && openaiKey) {
      try {
        const prompt = buildEvaluateAnswerPrompt(question, subject, marks, studentAnswer);
        const parsed = await callOpenAI(openaiKey, prompt);

        if (parsed) {
          const score = Math.max(0, Math.min(marks, Number(parsed.aiEstimatedScore ?? marks * 0.7)));
          return {
            result: {
              id: `eval_${Date.now()}`,
              questionText: question,
              subject,
              topic: parsed.topic || subject,
              marks,
              studentAnswer,
              recommendedAnswer: parsed.recommendedAnswer || getMockAnswerForQuestion(question, subject, marks).answerMarkdown,
              aiEstimatedScore: Number(score.toFixed(1)),
              maxMarks: marks,
              percentage: Math.round((score / marks) * 100),
              rubricBreakdown: parsed.rubricBreakdown || [],
              markLossReasons: parsed.markLossReasons || [],
              improvementSteps: parsed.improvementSteps || [],
              yourAnswerAnalysis: parsed.yourAnswerAnalysis || {
                strengths: ['Addressed the question.'],
                weaknesses: [],
                wordCount: studentAnswer.split(/\s+/).length,
              },
              evaluationDate: new Date().toISOString().split('T')[0],
              evaluationTimestamp: Date.now(),
            },
            providerUsed: 'openai',
          };
        }
      } catch (err) {
        console.warn('OpenAI evaluation error, falling back to calibrated evaluator:', err);
      }
    }

    // 3. Calibrated Fallback Rubric Evaluator
    const mock = evaluateStudentAnswerMock(question, subject, marks, studentAnswer);
    return {
      result: mock,
      providerUsed: 'demo',
    };
  }
}
