import { use } from 'react';
import QuizCard from '../../components/QuizCard';

async function getQuizzes() {
  const res = await fetch('http://localhost:3000/api/quizzes', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch quizzes');
  }
  return res.json();
}

export default function Quizzes() {
  const quizzes = use(getQuizzes());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}