import { ObjectId } from "mongodb";
import { connectDatabase } from "../../api/utils/db"; 
import { Question } from "@/app/components/AddQuiz";
import QuizComponent from "@/app/components/Quiz";

export interface IQuiz {
  quizName: string;
  questions: Question[]
}

async function fetchQuizData(quizId: string): Promise<IQuiz | null> {
  try {
    const { db } = await connectDatabase(); 

    const quizData = await db.collection("quizzes").findOne({ _id: new ObjectId(quizId) });

    if (!quizData) {
      return null; 
    }

    return {
      quizName: quizData.name,
      questions: quizData.questions,
    };
  } catch (error) {
    console.error("Error fetching quiz", error);
    return null;
  }
}



export default async function QuizPage({ params }: { params: { quizId: string } }) {

  const quizId = params.quizId;

  const quizData = await fetchQuizData(quizId);

  if (!quizData) {
    return <div>Quiz not found!</div>;
  }

  return (
    <div>
      <QuizComponent quizName={quizData.quizName} questions={quizData.questions} />
    </div>
  );
}

