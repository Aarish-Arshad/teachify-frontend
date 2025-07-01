import React from 'react';
import MainSectionLecture from '../components/MainSectionLecture';
import '../styles/Feature4.css';
import Sidebar from '../components/Sidebar';
import MainSectionHistory from '../components/MainSectionHistory';


const QuizGeneratorPage = () => {
  return (
    <div className="quiz-generator-container">
      <Sidebar />
      <MainSectionHistory />
    </div>
  );
};

export default QuizGeneratorPage;
