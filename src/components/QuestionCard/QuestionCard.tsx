import React, { useState, useEffect } from 'react';
import { fetchQuestion } from '../../api/triviaAPI';
import './QuestionCard.css';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  handleAnswer: (isCorrect: boolean) => void;
  handleCompletion: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  handleAnswer,
  handleCompletion,
}) => {
  const [question, setQuestion] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      setIsLoading(true);
      const questions = await fetchQuestion();
      setQuestion(questions[0]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching question:', error);
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOptionSelected(true);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption === question.correct_answer;
      setIsCorrectAnswer(isCorrect);
      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    if (questionNumber < totalQuestions) {
      loadQuestion();
      const isCorrect = selectedOption === question.correct_answer;
      handleAnswer(isCorrect);
      // Load next question
    } else {
      handleCompletion(); // If it's the last question, invoke completion handler
    }

    setShowResult(false);
    setSelectedOption(null);
    setIsOptionSelected(false);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="question-card">
      <>
        <h3>Question {questionNumber}/{totalQuestions}</h3>
        <p dangerouslySetInnerHTML={{ __html: question?.question }}></p>
        <div className="options">
          {question?.incorrect_answers.concat(question?.correct_answer).map((option: string, index: number) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}
                disabled={showResult}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} disabled={showResult || !isOptionSelected}>
          Submit
        </button>
        {showResult && (
          <div className="answer-result">
            <p>{isCorrectAnswer ? 'Correct!' : 'Wrong!'}</p>
            {!isCorrectAnswer && (
              <div className="explanation">
                <p>Correct answer: {question?.correct_answer}</p>
              </div>
            )}
          </div>
        )}
        {showResult && (
          <button onClick={handleNextQuestion}>
            {questionNumber === totalQuestions ? 'Finish' : 'Next'}
          </button>
        )}
      </>
    </div>
  );
};

export default QuestionCard;
