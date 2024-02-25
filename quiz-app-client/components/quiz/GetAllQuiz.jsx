import React, { useEffect, useState } from 'react'
import { getAllQuestions } from '../../utils/QuizService'

const GetAllQuiz = () => {
    const[question, setQuestion] = useState([{id: "", question: "", correctAnswers: "", choices: []}])
    const[isLoading, setIsLoading] = useState(true)
    const[isQuestionDeleted, setIsQuestionDeleted] = useState(false)
    const[deleteSuccessMessage, setDeleteSuccessMessage] = useState("")

useEffect(() => {
    fetchAllQuestions()
}, [])

    const fetchAllQuestions = async() => {
        try {
            const data = await getAllQuestions()
            setQuestion(data)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>

    </div>
  )
}

export default GetAllQuiz