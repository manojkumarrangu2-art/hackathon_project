import { QuestionMarks } from '../types';

export const SYSTEM_EXAMINER_PROMPT = `You are ExamAce, a senior academic examiner and marks-optimization AI agent.
Your primary mission is to teach students how examiners award and deduct marks in university engineering exams.
You know exact mark allocations for 2, 5, 10, and 15 marks questions.
You penalize answers that miss key technical terms, algorithmic complexity, architectural diagrams, and structured examples.
You provide clear, actionable guidance on "Why Did You Lose Marks?" and "How to Get More Marks".`;

export function getMarksStructureGuideline(marks: QuestionMarks): string {
  switch (marks) {
    case 2:
      return `For a 2-MARK question:
- Concise, formal definition.
- 1 to 2 high-yield bullet points or a formula.
- Total length: 30-60 words. No lengthy derivations.`;
    case 5:
      return `For a 5-MARK question:
- Formal definition and primary objective.
- Structured explanation (3-4 bullet points).
- Concrete mini-example or formula.
- Key advantages or primary distinction.
- Total length: 120-200 words.`;
    case 10:
      return `For a 10-MARK question:
- Section 1: Introduction & formal definition.
- Section 2: Core theoretical principles & working.
- Section 3: Step-by-step algorithm or pseudocode.
- Section 4: ASCII / architectural diagram illustrating data flow or memory state.
- Section 5: Real-world example with input/output trace.
- Section 6: Rigorous Time and Space Complexity analysis in Big-O notation.
- Section 7: Advantages, limitations, and applications.
- Section 8: Exam Writing Tip & Examiner Perspective.
- Total length: 350-500 words.`;
    case 15:
      return `For a 15-MARK question:
- Section 1: Executive introduction, historical context, and formal definition.
- Section 2: Mathematical formulation / underlying theory.
- Section 3: Architectural diagram with detailed component interaction.
- Section 4: Comprehensive algorithm / pseudocode with line-by-line commentary.
- Section 5: Full trace on a non-trivial example (step-by-step table).
- Section 6: Formal derivation of best, average, and worst-case time complexity, plus auxiliary space analysis.
- Section 7: Trade-off comparison matrix against alternative approaches.
- Section 8: Practical industry applications and modern extensions.
- Section 9: Common examiner mark-loss traps and how to avoid them.
- Total length: 600-900 words.`;
    default:
      return 'Provide a structured, marks-appropriate academic answer.';
  }
}

export function buildAskQuestionPrompt(
  question: string,
  subject: string,
  marks: QuestionMarks,
  materialContext?: string
): string {
  return `${SYSTEM_EXAMINER_PROMPT}

SUBJECT: ${subject}
QUESTION: ${question}
MARKS ALLOCATED: ${marks} Marks

${getMarksStructureGuideline(marks)}

${materialContext ? `STRICT DOCUMENT GROUNDING MODE:
The following context is the ONLY academic source you may use for the answer.
- Use only facts, definitions, algorithms, examples, formulas, and complexity statements supported by this source.
- Never use content from another uploaded document, previous conversation, memory, or a generic textbook when it conflicts with the source.
- If the requested topic is not supported by the source, do NOT invent it. State clearly that the uploaded document does not contain enough information for the requested answer.
- Preserve the terminology used by the source where possible.
- Do not claim a document was used unless its content actually appears below.

${materialContext}` : `NO UPLOADED DOCUMENT CONTEXT IS AVAILABLE. Answer using general academic knowledge.`}

Generate an exam-oriented response in clean JSON format:
{
  "answerMarkdown": "string with markdown headings, bold keywords, code blocks, ASCII diagrams",
  "structuredSections": [
    { "heading": "string", "content": "string", "keyKeywords": ["str1", "str2"], "hasDiagram": boolean, "hasAlgorithm": boolean, "hasExample": boolean }
  ],
  "examWritingTip": "specific advice on how examiners award marks for this question",
  "howToGetMoreMarks": {
    "missingCommonMistakes": ["mistake 1", "mistake 2"],
    "highYieldKeywords": ["keyword 1", "keyword 2"],
    "recommendedStructure": ["section 1", "section 2"],
    "diagramAdvice": "advice on what to sketch",
    "examinerExpectations": ["what examiner wants to see"]
  }
}`;
}

export function buildEvaluateAnswerPrompt(
  question: string,
  subject: string,
  marks: QuestionMarks,
  studentAnswer: string
): string {
  return `${SYSTEM_EXAMINER_PROMPT}

SUBJECT: ${subject}
QUESTION: ${question}
MAX MARKS: ${marks}
STUDENT SUBMITTED ANSWER:
"""
${studentAnswer}
"""

Evaluate this student response against the strict ${marks}-mark rubric.
IMPORTANT SCORING RULES:
- Score the actual content, not a default percentage.
- A one-line, nonsense, empty, or irrelevant answer must receive 0-10%, not 70%.
- Do not award a baseline score simply because the answer was submitted.
- A short but correct answer may receive partial credit appropriate to the mark allocation.
- Relevance to the exact question is a hard requirement for a high score.
- Do not automatically deduct for a diagram or complexity unless they are genuinely applicable to the question.
- For 10/15-mark questions, reward depth, structure, examples and applicable complexity proportionally; do not use fixed penalties.
Identify exactly why marks were deducted and calibrate the score to the evidence in the student's response.

Respond in JSON format:
{
  "aiEstimatedScore": number (e.g. 7.0 for 10 marks),
  "maxMarks": ${marks},
  "percentage": number,
  "rubricBreakdown": [
    { "category": "Technical Accuracy", "score": number, "maxScore": number, "percentage": number, "status": "excellent"|"good"|"needs_work"|"missing", "feedback": "string" },
    { "category": "Key Concepts", "score": number, "maxScore": number, "percentage": number, "status": "...", "feedback": "string" },
    { "category": "Keywords", "score": number, "maxScore": number, "percentage": number, "status": "...", "feedback": "string" },
    { "category": "Structure", "score": number, "maxScore": number, "percentage": number, "status": "...", "feedback": "string" },
    { "category": "Complexity", "score": number, "maxScore": number, "percentage": number, "status": "...", "feedback": "string" },
    { "category": "Diagram", "score": number, "maxScore": number, "percentage": number, "status": "...", "feedback": "string" },
    { "category": "Example", "score": number, "maxScore": number, "percentage": number, "status": "...", "feedback": "string" }
  ],
  "markLossReasons": [
    {
      "id": "mlr_1",
      "title": "Complexity Analysis Missing",
      "category": "Complexity",
      "marksDeducted": 1.5,
      "severity": "critical"|"moderate"|"minor",
      "explanation": "why marks were lost",
      "examinerQuote": "quote from examiner perspective",
      "solution": "exact actionable fix"
    }
  ],
  "improvementSteps": ["step 1", "step 2", "step 3"],
  "recommendedAnswer": "markdown of ideal high-scoring answer",
  "yourAnswerAnalysis": {
    "strengths": ["str1"],
    "weaknesses": ["weak1"],
    "wordCount": number
  }
}`;
}
