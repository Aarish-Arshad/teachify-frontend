import React from 'react';
import '../styles/Dashboard.css';
import DashboardHeader from './DashboardHeader';
import UserProfileSection from './UserProfileSection';
import MainContent from './MainContent';
const MainSection = () => {
  return (
    <main className="main-content">
      <div className="rounded-section">
        <DashboardHeader/>
        <UserProfileSection/>
        <MainContent/>
      </div>
    </main>
  );
};

export default MainSection;