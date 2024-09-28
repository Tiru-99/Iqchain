'use client'; // Ensure the component runs client-side

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const router = useRouter();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);  // Set loading state
    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, questions }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Quiz created:', result);

        // Redirect to /quizzes page after successful creation
        router.push('/quizzes');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create quiz. Please try again.');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      {isLoading && <div>Loading...</div>} {/* Loading indicator */}
      
      <div>
        <label className="block mb-1">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="border p-4 rounded">
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
            placeholder="Question"
            required
            className="w-full p-2 border rounded mb-2"
          />
          {q.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                placeholder={`Option ${oIndex + 1}`}
                required
                className="w-full p-2 border rounded mr-2"
              />
              <input
                type="radio"
                name={`correct-${qIndex}`}
                checked={q.correctAnswer === oIndex}
                onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                required
              />
              <label className="ml-2">Correct Answer</label>
            </div>
          ))}
        </div>
      ))}
      
      <button
        type="button"
        onClick={addQuestion}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Question
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={isLoading} // Disable button during submission
      >
        Create Quiz
      </button>
    </form>
  );
}
