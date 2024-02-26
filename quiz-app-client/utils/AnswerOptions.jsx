import React from "react";

const AnswerOptions = ({
  question,
  isChecked,
  handleAnswerChange,
  handleCheckboxChange,
}) => {
  if (!question) {
    return <div>No questions available</div>;
  }
  const { id, questionType, choices } = question;

  if (questionType === "single") {
    return (
      <div>
        {choices.sort().map((choice, index) => (
          <div key={choice} className="form-check mb-3">
            <input
              type="radio"
              className="form-check-input"
              id={choice}
              value={choice}
              checked={isChecked(question.id, choice)}
              onChange={() => handleAnswerChange(id, choice)}
            />
            <label className="form-check-label ms-2">{choice}</label>
          </div>
        ))}
      </div>
    );
    
  }};

export default AnswerOptions;
