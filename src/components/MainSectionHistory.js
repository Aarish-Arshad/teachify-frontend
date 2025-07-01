import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MainSectionHistory.css';

export default function MainSectionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState(null); // track which item is open

  useEffect(() => {
    const fetchHistory = async () => {
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
        setHistory(resp.data.history);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.detail || 'Failed to load history'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading history…</p>;
  if (error) return <p className="error">{error}</p>;

  // Filter to only lectures
  const lectureHistory = history.filter(item => item.generation_type === 'lecture');

  return (
    <main className="main-content">
      <div className="rounded-section">
        <div className="hero-section">
          <h2>Your Lecture History</h2>
          <p>All your past generated lectures.</p>
        </div>

        {lectureHistory.length === 0 ? (
          <p>No lectures generated yet. Generate one first!</p>
        ) : (
          <ul className="history-list">
            {lectureHistory.map(item => (
              <li key={item.id} className="history-item">
                <div
                  className="history-header"
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <strong>{new Date(item.created_at).toLocaleString()}</strong> — 
                  <code style={{ marginLeft: '6px' }}>{item.document_name || 'prompt'}</code>
                  <span style={{ float: 'right' }}>
                    {openId === item.id ? '▲' : '▼'}
                  </span>
                </div>

                {openId === item.id && item.content?.lectures && item.content.lectures.length > 0 && (
                  <div className="history-details" style={{ marginTop: '8px' }}>
                    {item.content.lectures.map((lec, index) => (
                      <div key={index} className="lecture-block">
                        <strong>{lec.heading}</strong>
                        <ul>
                          {lec.points.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                        {lec.summary && <p><em>Summary: {lec.summary}</em></p>}
                        {lec.examples && lec.examples.length > 0 && (
                          <p>Examples: {lec.examples.join(', ')}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
