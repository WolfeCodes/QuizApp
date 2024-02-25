import React, { useState } from 'react'
import {getSubjects} from '../../utils/QuizService'
import { i } from 'vite/dist/node/types.d-jgA8ss1A';

const AddQuestion = () => {
    const [question, setQuestion] = useState("")
    const [questionType, setQuestionType] = useState("single");
    const [choices, setChoices] = useState([""])
    const [correctAnswers, setCorrectAnswers] = useState([""])
    const [subject, setSubject] = useState("")
    const [newSubject, setNewSubject] = useState("")
    const [subjectOptions, setSubjectOptions] = useState([""])

const fetchSubjects = async() => {
    try {
        const subjectData = await getSubjects()
        setSubjectOptions(subjectData)
    } catch (error) {
         console.error(error)
    }
}

const handleAddChoice = async() => {
    const lastChoice = choices[choices.length - 1]
    const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A"
    const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1)
    const newChoice = `${newChoiceLetter}.`
    setChoices([...choices, newChoice])
}

const handleRemoveChoice = (index) => {
    setChoices(choices.filter((choices, i) => i !== index))
}

const handleChoiceChange = (index, value) => {
    setChoices(choices.map((choice, i) => (i === index ? value : choice)))
}

const handleCorrectAnswerChange = (index, value) => {
    setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)))
}

const handleCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, ""])
}

const handleRemoveCorrectAnswer = (index) => {
    setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index))
}

const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        const result = {
            question, 
            questionType, 
            choices, 
            correctAnswers: correctAnswers.map((answer) => {
                const choiceLetter = answer.charAt(0).toUpperCase
                const choiceIndex = choiceLetter.charCodeAt(0) - 65
                return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null

            })
        }
    } catch (error) {
        return console.log(error)
        
    }
}

  return (
    <div>
        AddQuestion
    </div>
  )
}

export default AddQuestion