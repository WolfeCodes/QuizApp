import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([
    {
      id: "",
      correctAnswers: "",
      question: "",
      questionType: "",
    },
  ]);

  const [selectedAnswer, setSelectedAnswer] = useState([
    {
      id: "",
      answer: "",
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScores, setTotalScores] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSubject, selectedNumOfQuestions } = location.state;

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    if (selectedNumOfQuestions && selectedSubject) {
      const questions = await fetchQuizForUser(
        selectedNumOfQuestions,
        selectedSubject
      );
      setQuizQuestions(questions);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswer((prevAnswers) => {
        const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId)
    })
  }

  return <div>Quiz</div>;
};

export default Quiz;
