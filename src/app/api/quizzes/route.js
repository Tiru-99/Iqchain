import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Quiz from '../../../models/Quiz';
import { auth } from '@clerk/nextjs/server';

export async function POST(request) {
  console.log('POST request received');

  try {
    // Authentication check with logging
    let userId;
    try {
      const authData = auth();
      userId = authData.userId;
      console.log('User ID from Clerk:', userId);
    } catch (authError) {
      console.error('Error in Clerk auth:', authError);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    if (!userId) {
      console.log('Unauthorized: No user ID');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Attempt to connect to the database
    try {
      await connectToDatabase();
      console.log('Connected to the database');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
    }

    // Parsing request body
    let data;
    try {
      data = await request.json();
      console.log('Received data:', data);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Validate data before creating the quiz
    if (!data.title || !data.questions || !Array.isArray(data.questions)) {
      console.error('Invalid data structure:', data);
      return NextResponse.json({ error: 'Invalid quiz data' }, { status: 400 });
    }

    // Create a new quiz and save it to the database
    try {
      const newQuiz = new Quiz({ ...data, createdBy: userId });
      await newQuiz.save();
      console.log('Quiz saved successfully:', newQuiz);
      return NextResponse.json(newQuiz, { status: 201 });
    } catch (saveError) {
      console.error('Error saving quiz:', saveError);
      return NextResponse.json({ error: 'Failed to save quiz' }, { status: 500 });
    }

  } catch (error) {
    console.error('General error in POST /api/quizzes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Fetch all quizzes from the database
      const quizzes = await Quiz.find();
      
      // Return the quizzes as JSON
      return NextResponse.json(quizzes, { status: 200 });
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
    }
  }

