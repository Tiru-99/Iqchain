import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to QuizApp</h1>
      <p className="mb-4">Create and solve quizzes on various topics!</p>
      <Link href="/quizzes" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Browse Quizzes
      </Link>
    </div>
  );
}
