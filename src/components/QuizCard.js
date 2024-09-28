import Link from 'next/link';

export default function QuizCard({ quiz }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
      <p className="text-gray-600 mb-4">{quiz.description}</p>
      <p className="text-sm text-gray-500 mb-2">
        Questions: {quiz.questions.length}
      </p>
      <Link
        href={`/quizzes/${quiz._id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Take Quiz
      </Link>
    </div>
  );
}