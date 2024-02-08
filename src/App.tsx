import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard/QuestionCard'; // Correct your import paths
import ResultPage from './components/ResultsPage/ResultsPage'; // Correct your import paths

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    if (questionNumber < TOTAL_QUESTIONS) {
      setQuestionNumber(prevNumber => prevNumber + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionNumber(1);
    setQuizCompleted(false);
  };

  return (
    <div className="App">
      {!quizCompleted ? (
        <QuestionCard
          questionNumber={questionNumber}
          totalQuestions={TOTAL_QUESTIONS}
          handleAnswer={handleAnswer}
          handleCompletion={() => setQuizCompleted(true)}
        />
      ) : (
        <ResultPage score={score} totalQuestions={TOTAL_QUESTIONS} />
      )}
    </div>
  );
};

export default App;
