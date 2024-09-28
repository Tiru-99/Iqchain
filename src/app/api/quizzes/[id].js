// pages/api/quizzes/[id].js

import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    // Connect to your database
    const { db } = await connectToDatabase();

    // Fetch the quiz by its ID
    const quiz = await db.collection('quizzes').findOne({ _id: id });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Send back the quiz data
    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
}
