import React, { useState } from "react";
import { FaPlus, FaSave } from "react-icons/fa";
import { validateOptions, validateQuestion, validateQuizName } from "../_lib/validateQ";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosError } from "axios";
// import { useRouter } from "next/router";

export interface Question {
  question: string;
  choices: string[];
  correctAnswer: number;
}

const AddQuiz: React.FC = () => {
  const [quizName, setQuizName] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", choices: ["", "", "", ""], correctAnswer: 0 },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [questionLable, setQuestionLabel] = useState<string>("Question");
  const [optionsLable, setOptionsLabel] = useState<string>("Options");

  const handleQuizNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizName(event.target.value);
  };

  // const router = useRouter()

  const handleQuestionChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (
    questionIndex: number,
    choiceIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices[choiceIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
  
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = parseInt(
      event.target.value,
      10
    );
    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    
    if(!validateQuestion(questions, currentQuestionIndex)) {
        setQuestionLabel('Please enter the question before going to next question')
        return
    }else {
      setQuestionLabel('Question')
    }

    if(!validateOptions(questions, currentQuestionIndex)) {
        setOptionsLabel('Please fill all the options')
        return
    }else {
      setOptionsLabel('Options')
    }

    if (currentQuestionIndex === questions.length - 1) {
      setQuestions([
        ...questions,
        { question: "", choices: ["", "", "", ""], correctAnswer: 0 },
      ]);
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

  };

  
  const handleSaveQuiz = async() => {

    if(!validateQuizName(quizName)) {
        toast.error('Please Enter the Quiz name')
        return
    }

    if(!validateQuestion(questions, currentQuestionIndex)) {
        setQuestionLabel('Please enter the question before going to next question')
        return
    }

    if(!validateOptions(questions, currentQuestionIndex)) {
        setOptionsLabel('Please fill all the options')
        return
    }


    try {
        const res = await axios.post("/api/admin/quiz", {
            quizName,
            questions
            });
      
          if (res.status !== 201) {
            throw new Error("Invalid credentials");
          }

          toast.success('Quiz added successfully')
          setQuestions([])
          setQuizName('')
          setCurrentQuestionIndex(0)
          



    } catch (err: unknown) {
        if(err instanceof AxiosError )
      if (err instanceof Error) {
        toast.error(err.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }

  }


  return (
    <div className="p-8 bg-gray-100 shadow-lg rounded-lg max-w-screen-xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-3xl font-bold mr-3 text-green-600">Add Quiz</span>
        </div>
        <button onClick={handleSaveQuiz} className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 flex items-center">
          <FaSave className="mr-2" /> Save Quiz
        </button>
      </div>

      <div className="mb-8">
        <input
          type="text"
          value={quizName}
          onChange={handleQuizNameChange}
          className="border rounded w-full p-4 text-xl text-zinc-600"
          placeholder="Enter Quiz Name"
        />
      </div>

      <div className="p-6 bg-white shadow-md rounded-lg mb-6">
        <h2 className={`text-2xl font-bold mb-4 ${ questionLable !== 'Question' ? 'text-red-500' : 'text-lime-600'}`}>
          {questionLable !== 'Question' ? questionLable : questionLable + ' ' + (currentQuestionIndex + 1)}
        </h2>
        <input
          type="text"
          value={questions[currentQuestionIndex].question}
          onChange={(e) => handleQuestionChange(currentQuestionIndex, e)}
          className="border rounded w-full p-4 text-lg mb-6 text-zinc-600"
          placeholder="Enter your question here..."
        />

        <h3 className={`text-xl font-semibold mb-4 ${ optionsLable !== 'Options' ? 'text-red-500' : 'text-lime-600'}`}>{optionsLable}</h3>
        {questions[currentQuestionIndex].choices.map((choice, choiceIndex) => (
          <div key={choiceIndex} className="flex items-center mb-4 text-zinc-600">
            <span className="mr-4 text-lg font-bold">
              {String.fromCharCode(65 + choiceIndex)}:
            </span>
            <input
              type="text"
              value={choice}
              onChange={(e) =>
                handleChoiceChange(currentQuestionIndex, choiceIndex, e)
              }
              className="border rounded w-full p-3 text-lg"
              placeholder={`Option ${choiceIndex + 1}`}
            />
          </div>
        ))}

        <div className="flex items-center mt-6 mb-4 text-zinc-600">
          <span className="mr-4 text-lg font-bold text-green-600">Correct Answer:</span>
          <select
            value={questions[currentQuestionIndex].correctAnswer}
            onChange={(e) => handleCorrectAnswerChange(currentQuestionIndex, e)}
            className="border rounded p-3 text-lg"
          >
            {questions[currentQuestionIndex].choices.map((_, choiceIndex) => (
              <option key={choiceIndex} value={choiceIndex}>
                {String.fromCharCode(65 + choiceIndex)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleNextQuestion}
          className="bg-green-600 text-white py-3 px-6 mt-6 rounded hover:bg-green-700 flex items-center text-lg"
        >
          <FaPlus className="mr-2" /> Next Question
        </button>
      </div>
    </div>
  );
};

export default AddQuiz;
