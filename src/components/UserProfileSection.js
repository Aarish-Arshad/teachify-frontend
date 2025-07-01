import React from 'react';
import '../styles/Dashboard.css'; 

const UserProfileSection = () => {
  return (
    <div className="profile-section">
      {/* Profile Card */}
      <div className="profile-card">
        {/* Background decorative elements */}
        <div className="profile-decorations">
          <div className="decoration-square"></div>
          <div className="decoration-circle"></div>
        </div>
        
        <div className="profile-info">
          <div className="profile-avatar">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
              alt="Profile" 
            />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">M. Sami Khan</h2>
            <p className="profile-role">English Teacher</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">09</div>
          <div className="stat-label">Quizzes Generated</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">14</div>
          <div className="stat-label">PDFs Generated</div>
        </div>
      </div>
    </div>
  );
};
export default UserProfileSection;
