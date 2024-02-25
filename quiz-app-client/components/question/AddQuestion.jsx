import React, { useState } from 'react'
import {createQuestion, getSubjects} from '../../utils/QuizService'
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

            }),
            subject
        }
        await createQuestion(result)
        setQuestion("")
        setQuestionType("single")
        setChoices([""])
        setCorrectAnswers([""])
        setSubject("")
    } catch (error) {
        return console.log(error)
    }
}

const handleAddSubject = () => {
    if(newSubject.trim() !== ""){{
        setSubject(newSubject.trim())
        setSubjectOptions([...subjectOptions, newSubject.trim()])
        setNewSubject("")
    }}
}

  return (
    <div className='container'>
        <div className='row justify-contentt-center'>
            <div className='col-md--6 mt-5'>
                <div className='card'>
                    <div className='card-header'>
                        <h5 className='card-title'>Add New Question</h5>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit} className='p-2'>
                            <div className='mb-3'>
                                <label htmlFor='subject' className='form-label text-info'>
                                    Select a Subject
                                </label>
                                <select
                                id='subject'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className='form-control'>
                                    <option value={""}>Select a Subject</option>
                                    <option value={"New"}>Add New Subject</option>
                                    {subjectOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            {subject === "New" && (
                                <div className='mb-3 '>
                                    <label htmlFor='new-subject' className='form--label text-info'>
                                        Add a new Subject
                                    </label>
                                    <input
                                    type='text'
                                    id='new-subject'
                                    value={newSubject}
                                    onChange={(e) => setNewSubject(e.target.value)}
                                    className='form--control'
                                    />
                                    <button
                                    type='button'
                                    className='btn btn-outline-primary btn-sm mt-2'
                                    onClick={handleAddSubject}>
                                    Add Subject
                                    </button>

                                </div>
                            )}
                            <div className='mb-2 '>
                                <label htmlFor='question' className='form-label text-info'>
                                Question
                                </label>
                                <textarea
                                className='form-control'
                                rows={4}
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                >
                                </textarea>
                            </div>
                            <div className='mb-3 '>
                            <label htmlFor='question-type' className='form-label text-info'>
                                Question Type
                            </label>
                            <select className='form-control'
                            id='question'
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}>
                            <option value={"single"}>Single Answer</option>
                            <option value={"multiple"}>Multiple Answers</option>
                            </select>
                            </div>
                            <div className='mb-3 '>
                                <label htmlFor='choices' className='form-label text-info'>
                                Choices
                                </label>
                                {choices.map((choice, index) => (
                                    <div key={index} className='input-group mb-3'>
                                        <input
                                        type='text'
                                        value={choice}
                                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                                        className='form-control'
                                        />
                                        <button
                                        type='button'
                                        onClick={() => handleRemoveChoice(index)}
                                        className='btn btn-outline-danger btn-sm'>
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        </div>
        
    </div>
  )
}

export default AddQuestion