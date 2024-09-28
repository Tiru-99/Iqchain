'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios'; // Import Axios

export default function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  console.log("This is params" , id);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        setLoading(true); // Start loading
        const res = await axios.get(`/api/dbsearch/${id}`); // Use Axios to fetch data
        console.log(res.data); // Log the response data
        
        setQuiz(res.data); // Set the quiz data
        setLoading(false); // Data successfully loaded
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
        setError('Failed to load quiz data. Please try again later.');
        setLoading(false); // Stop loading even if there's an error
      }
    }
    fetchQuiz();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!quiz) {
    return <div>No quiz data available.</div>;
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const renderQuestion = () => {
    const question = quiz.questions[currentQuestion];
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">{question.question}</h2>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-2 text-left border rounded ${
                selectedAnswer === index ? 'bg-blue-200' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl">
          Your score: {score} out of {quiz.questions.length}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      {!quizCompleted ? (
        <>
          {renderQuestion()}
          <div className="mt-4">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        renderResult()
      )}
    </div>
  );
}
