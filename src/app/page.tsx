
import { MongoClient } from 'mongodb';
import QuizCard from './components/QuizCard';
import Navbar from './components/Navbar';


export async function getQuizzes() {


  const MONGODB_URI: string | undefined = process.env.MONGODB_URI
  const MONGODB_DB: string | undefined = process.env.MONGODB_DB

  if(!MONGODB_URI) {
    throw new Error('Cannot find db connections string in .env.local')
  }

  if(!MONGODB_DB) {
    throw new Error('Cannot find db NAME in .env.local')
  }


  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const quizzesCollection = db.collection('quizzes');

  const quizzes = await quizzesCollection.find().toArray();
  client.close();
  
  return quizzes;
}

export default async function Home() {
  const quizzes = await getQuizzes();

  return (
<div className="bg-gray-100 min-h-screen">
  <Navbar />
  <h1 className="text-3xl font-bold text-left text-green-600 pl-10 pt-[120px] mb-5">
    Quizzes
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
    {quizzes.map((quiz, index) => (
      <QuizCard
        key={index}
        title={quiz.quizName}
        questions={quiz.questions.length}
        quizLink={`/quiz/${quiz._id}`}
      />
    ))}
  </div>
</div>

  );
}
