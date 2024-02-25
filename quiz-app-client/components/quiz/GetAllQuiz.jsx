import React, { useEffect, useState } from 'react'
import { deleteQuestion, getAllQuestions } from '../../utils/QuizService'

const GetAllQuiz = () => {
    const[questions, setQuestions] = useState([{id: "", question: "", correctAnswers: "", choices: []}])
    const[isLoading, setIsLoading] = useState(true)
    const[isQuestionDeleted, setIsQuestionDeleted] = useState(false)
    const[deleteSuccessMessage, setDeleteSuccessMessage] = useState("")

useEffect(() => {
    fetchAllQuestions()
}, [])

    const fetchAllQuestions = async() => {
        try {
            const data = await getAllQuestions()
            setQuestions(data)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }
    const handleDelete = async(id) => {
        try {
            await deleteQuestion(id)
            setQuestions(questions.filter((question) => question.id != id))
            setIsQuestionDeleted(true)
            setDeleteSuccessMessage("Question deleted successfully!")
        } catch (error) {
            console.error(error)
        }
        setTimeout(() => {
            setDeleteSuccessMessage("")
        }, 4000)
    }
    if(isLoading){
        return <div>Loading</div>
    }
  return (
    <div>
        
    </div>
  )
}

export default GetAllQuiz