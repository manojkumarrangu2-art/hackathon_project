import { NextRequest, NextResponse } from 'next/server';
import { AIProviderService } from '@/lib/ai/aiProvider';
import { QuestionMarks } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, subject, marks, studentAnswer, settings } = body;

    if (!question || !studentAnswer) {
      return NextResponse.json({ error: 'Question and studentAnswer are required' }, { status: 400 });
    }

    const marksNum = (marks ? Number(marks) : 10) as QuestionMarks;
    const { result, providerUsed } = await AIProviderService.evaluateAnswer({
      question,
      subject: subject || 'Computer Science',
      marks: marksNum,
      studentAnswer,
      settings,
    });

    return NextResponse.json({ success: true, result, providerUsed });
  } catch (error: any) {
    console.error('Error in /api/ai/evaluate:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
