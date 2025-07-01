import React from 'react';
import MainSectionLecture from '../components/MainSectionLecture';
import '../styles/Feature1.css';
import Sidebar from '../components/Sidebar';

const QuizGeneratorPage = () => {
  return (
    <div className="quiz-generator-container">
      <Sidebar />
      <MainSectionLecture />
    </div>
  );
};

export default QuizGeneratorPage;
