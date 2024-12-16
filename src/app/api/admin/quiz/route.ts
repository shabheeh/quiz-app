import { connectDatabase } from "../../utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        
        const { quizName, questions } = await request.json();

        const { db } = await connectDatabase();
        const quizCollection = db.collection('quizzes');

        const existingQuiz = await quizCollection.findOne({
            quizName: { $regex: `^${quizName}$`, $options: "i" }, 
          });
     
          if (existingQuiz) {
            return NextResponse.json({ message: "Quiz name already exists" }, { status: 409});
          }

        await quizCollection.insertOne({
            quizName,
            questions,
            createdAt: new Date()
        })

        return NextResponse.json({message: "Quiz added successfully" }, { status: 201 })

    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({message: err.message || 'Server Error' }, { status: 500 })
        } else {
            return NextResponse.json({message: "Server Error" }, { status: 500 })
        }
      }
}