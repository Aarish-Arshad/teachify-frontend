
import React from 'react';
import '../styles/Dashboard.css';

const SearchIcon = () => (


  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);


const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <h1 className="dashboard-title">Welcome Back, Sami!</h1>
      <div className="search-container">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search lectures, quizzes, or resources..."
          className="search-input"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;