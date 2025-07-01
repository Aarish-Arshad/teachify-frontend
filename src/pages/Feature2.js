import React from 'react';
import MainSectionQuiz from '../components/MainSectionQuiz';
import '../styles/Feature1.css';
import Sidebar from '../components/Sidebar';

const QuizGeneratorPage = () => {
  return (
    <div className="quiz-generator-container">
      <Sidebar />
      <MainSectionQuiz />
    </div>
  );
};

export default QuizGeneratorPage;
