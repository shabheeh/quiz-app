'use client';

import React, { useState, useEffect } from 'react';
import { IQuiz } from '../quiz/[quizId]/page';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Quiz: React.FC<IQuiz> = ({quizName, questions}) => {

  

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [quizOver, setQuizOver] = useState<boolean>(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);



  useEffect(() => {
    if (!quizOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            handleTimeout();
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestion, quizOver]);

  const handleTimeout = () => {
    setAnswers((prev) => [...prev, null]); // Log no answer
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizOver(true);
    }
  };

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      toast('Please select an answer.');
      return;
    }

    setAnswers((prev) => [...prev, selectedAnswer]);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30); 
    } else {
      setQuizOver(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        {!quizOver ? (
          <>
            <h1 className="text-2xl text-black font-bold mb-4">{quizName}</h1>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">
                Question {currentQuestion + 1} / {questions.length}
              </p>
              <p className="text-red-500 font-semibold">Time Left: {timeLeft}s</p>
            </div>
            <p className="font-medium">{questions[currentQuestion].question}</p>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {questions[currentQuestion].choices.map((answer, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                    selectedAnswer === index
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => handleAnswerClick(index)}
                >
                  {answer}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
            <p className="text-gray-600 mb-4">
              Your Score: {score} / {questions.length}
            </p>
            <ul className="list-disc pl-5">
              {questions.map((q, index) => (
                <li key={index} className="mb-2">
                  <p>
                    {q.question} -{' '}
                    <span
                      className={`${
                        answers[index] === q.correctAnswer
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {q.choices[q.correctAnswer]}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
