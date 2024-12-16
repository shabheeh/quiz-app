// components/QuizCard.js
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

const QuizCard = ({ title, questions, quizLink }: { title: string, questions: number, quizLink: string}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 m-3 max-w-xs flex flex-col items-center">
      <div className="bg-green-700 text-white p-3 rounded-lg mb-3 w-full flex items-center justify-center">
        <span className="text-2xl">{"</>"}</span>
      </div>
      <h2 className="text-lg text-green-600 font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-3">{questions} Questions</p>
      <div className="flex items-center mb-3">
        {/* <FaCheckCircle className="text-green-500 mr-2" /> */}
      </div>
      <Link href={quizLink}>
        <button className="bg-green-700 text-white py-2 px-3 rounded-full flex items-center text-sm">
          <FaPlay className="mr-2" />
          Play
        </button>
      </Link>
    </div>
  );
};

export default QuizCard;
