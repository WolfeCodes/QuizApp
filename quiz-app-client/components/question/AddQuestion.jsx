import React, { useState } from 'react'
import {getSubjects} from '../../utils/QuizService'

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
    const newChoiceLetter = tring.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1)
    const newChoice = `${newChoiceLetter}.`
    setChoices([...choices, newChoice])
}

  return (
    <div>
        AddQuestion
    </div>
  )
}

export default AddQuestion