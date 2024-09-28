import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Quiz from '../../../models/Quiz';
import { auth } from '@clerk/nextjs';

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const quizzes = await Quiz.find({ createdBy: userId }).sort({ createdAt: -1 });
  return NextResponse.json(quizzes);
}