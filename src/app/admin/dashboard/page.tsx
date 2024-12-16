

import CreateFirstQuiz from "@/app/components/CreateFirstQuiz";
import Navbar from "@/app/components/Navbar";
import QuizCard from "@/app/components/QuizCard";
import { getQuizzes } from "@/app/page";
import Link from "next/link";


export default async function Dashboard() {

    const quizzes = await getQuizzes()

    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <h1 className="text-3xl font-bold text-left text-green-600 pl-10 pt-[120px] mb-5">
          Quizzes
        </h1>
        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
            {quizzes.map((quiz, index) => (
              <QuizCard
                key={index}
                title={quiz.quizName}
                questions={quiz.questions.length}
                quizLink={`/admin/quiz/${quiz._id}`}
              />
            ))}
            <Link href={'/admin/quiz'} className="bg-white shadow-md rounded-lg p-3 m-3 max-w-xs flex flex-col items-center justify-center cursor-pointer">
               <div className="bg-green-700 text-white p-4 rounded-full flex items-center justify-center mb-3">
                 <span className="text-5xl font-bold">+</span>
               </div>
               <h2 className="text-lg text-green-600 font-semibold">
                 Add New Quiz
               </h2>
            </Link>
          </div>
        ) : (
          <CreateFirstQuiz />
        )}
      </div>
    );
}
