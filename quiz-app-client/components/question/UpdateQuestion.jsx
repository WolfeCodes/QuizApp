import React from 'react'
import { useState } from 'react'
import { getQuestionById } from '../../utils/QuizService'
import { useParams } from 'react-router-dom'

const UpdateQuestion = () => {
    const [question, setQuestion] = useState("")
    const [choices, setChoices] = useState([""])
    const [correctAnswers, setCorrectAnswers] = useState([""])
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()
    
    const fetchQuestion = async() => {
        try {
            const questionToUpdate = await getQuestionById(id)
            if(questionToUpdate ){
                setQuestion(questionToUpdate.question)
                setChoices(questionToUpdate.choices)
                setCorrectAnswers(questionToUpdate.correctAnswers)
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }
    const handleQuestionChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleChoiceChange = (index, e) => {
        const updatedChoices = [...choices]
        updatedChoices[index] = e.target.value
        setChoices(updatedChoices)
    }

    const handleCorrectAnswerChange = (e) => {
        setCorrectAnswers(e.target.value)
    }

    const handleQuestionUpdate = async(e) => {
        e.preventDefault()
        try {
            const updatedQuestion = 
            {
                question, 
                choices, 
                correctAnswers: correctAnswers.toString().split(",").map((answer) => answer.trim())
            }
            await UpdateQuestion(id, updatedQuestion)
            // Navigate back to all question page 
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div>UpdateQuestion</div>
  )
}

export default UpdateQuestion