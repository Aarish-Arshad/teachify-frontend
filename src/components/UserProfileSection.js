import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const UserProfileSection = () => {
  const [quizCount, setQuizCount] = useState(0);
  const [lectureCount, setLectureCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('authToken');
        const resp = await axios.get(
          'http://localhost:8000/api/history/',
          {
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Token ${token}` })
            }
          }
        );

        const history = resp.data.history || [];

        // Count quizzes: generation_type === 'quiz' or 'fill_in_blanks'
        const quizzes = history.filter(item =>
          item.generation_type === 'quiz' || item.generation_type === 'fill_in_blanks'
        ).length;

        // Count lectures: generation_type === 'lecture'
        const lectures = history.filter(item =>
          item.generation_type === 'lecture'
        ).length;

        setQuizCount(quizzes);
        setLectureCount(lectures);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

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
            <h2 className="profile-name">Teacher</h2>
            <p className="profile-role">Teacher</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        {loading ? (
          <p>Loading stats...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <div className="stat-card">
              <div className="stat-number">{quizCount}</div>
              <div className="stat-label">Quizzes Generated</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{lectureCount}</div>
              <div className="stat-label">Lectures Generated</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfileSection;
