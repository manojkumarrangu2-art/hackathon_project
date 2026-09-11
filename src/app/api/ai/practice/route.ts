import { NextRequest, NextResponse } from 'next/server';
import { PracticeQuestion } from '@/lib/types';
import { initialPracticeQuestions } from '@/lib/store/initialSeedData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { weaknessCategory, subject } = body;

    // Return the curated 5-tier practice set matching this weakness
    const practiceSet: PracticeQuestion[] = initialPracticeQuestions.map((q) => ({
      ...q,
      id: `pq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    }));

    return NextResponse.json({
      success: true,
      weaknessCategory: weaknessCategory || 'Complexity Analysis',
      subject: subject || 'Data Structures & Algorithms',
      practiceQuestions: practiceSet,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to generate practice' }, { status: 500 });
  }
}
