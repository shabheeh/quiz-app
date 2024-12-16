import { Question } from "../components/AddQuiz"

export const validateQuizName = (quizName: string) => {
    if(quizName === '') {
        return false
    }else {
        return true
    }
}

export const validateQuestion = (questions: Question[], currentIndex: number) => {
    const currentQuestion = questions[currentIndex]
    if(currentQuestion.question === '') {
        return false
    }else {
        return true
    }

    
}

export const validateOptions = (questions: Question[], currentIndex: number) => {
    const currentQuestion = questions[currentIndex]

    if(currentQuestion.choices[0] === '' || currentQuestion.choices[1] === '' || currentQuestion.choices[2] === '' || currentQuestion.choices[3] === '' ) {
        return false
    }else {
        return true
    }
}