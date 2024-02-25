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
    <section className='container'>
        <div className='row mt-5'>
            <div className='col-md-6 mb-2 md-mb-0' style={{color: 'GrayText'}}>
                <h4>All Quiz Questions</h4>
            </div>
            <div className='col-md-4 d-flex justify-content-end'>
                {/* ToDo: add a link to navigate to add new question form */}
            </div>
        </div>
        <hr/>
        {isQuestionDeleted && <div className='alert alert-success'>{deleteSuccessMessage}</div>}

        {questions.map((question, index) => (
            <div>
                <h4 style={{color: 'GrayText'}}>{`${index + 1}. ${question.question}`}</h4>

                <ul>
                    {question.choices.map((choice, index) => (
                        <li key={index}>{choice}</li>
                    ))}
                </ul>
            </div>
        ))}
    </section>
  )
}

export default GetAllQuiz