import React from 'react';
import MainSection from '../components/MainSection';
import '../styles/Feature1.css';
import Sidebar from '../components/Sidebar';

const QuizGeneratorPage = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <MainSection />
    </div>
  );
};

export default QuizGeneratorPage;
