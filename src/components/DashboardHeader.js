import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

export default function DashboardHeader() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.warn('No auth token found; default username');
        setUsername('Teacher');

        return;
      }
      try {
        const resp = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
          }
        });

        console.log('Profile API response:', resp.data); // check what comes exactly

        // Check if resp.data has username, else fallback to name
        setUsername(resp.data.username || resp.data.name || 'Teacher');
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setUsername('Teacher'); // fallback
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="dashboard-header">
      <h1 className="dashboard-title">Welcome Back, Teacher!</h1>
    </div>
  );
}
