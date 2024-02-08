import React from 'react';

interface ResultPageProps {
  score: number;
  totalQuestions: number;
}

const ResultPage: React.FC<ResultPageProps> = ({ score, totalQuestions }) => {
  return (
    <div className="result-page">
      <h2>Results</h2>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {score}</p>
    </div>
  );
};

export default ResultPage;
