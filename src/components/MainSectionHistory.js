
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MainSectionHistory.css';

export default function MainSectionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState(null);

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


  const lectureHistory = history.filter(item => item.generation_type === 'lecture');
  const quizHistory = history.filter(item =>
    item.generation_type === 'quiz' || item.generation_type === 'fill_in_blanks'
  );

  return (
    <main className="main-content">
      <div className="rounded-section">
        <div className="hero-section">
          <h2>Your Generation History</h2>
          <p>See your past generated lectures and quizzes separately.</p>
        </div>

        {/* Lectures Section */}
        <section className="history-section">
          <h3>Lectures</h3>
          {lectureHistory.length === 0 ? (
            <p>No lectures generated yet.</p>
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

                  {openId === item.id && item.content?.lectures?.length > 0 && (
                    <div className="history-details" style={{ marginTop: '8px' }}>
                      {item.content.lectures.map((lec, index) => (
                        <div key={index} className="lecture-block" style={{ marginBottom: '10px' }}>
                          <strong>{lec.heading}</strong>
                          <ul>
                            {lec.points.map((pt, i) => <li key={i}>{pt}</li>)}
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
        </section>

        {/* Quizzes Section */}
        <section className="history-section" style={{ marginTop: '30px' }}>
          <h3>MCQs & Fill in the Blanks</h3>
          {quizHistory.length === 0 ? (
            <p>No quizzes or fill-in-the-blanks generated yet.</p>
          ) : (
            <ul className="history-list">
              {quizHistory.map(item => (
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

                  {openId === item.id && (
                    <div className="history-details" style={{ marginTop: '8px' }}>
                      {/* Render MCQs */}
                      {item.generation_type === 'quiz' && item.content?.mcqs?.length > 0 && (
                        <div className="mcq-list">
                          {item.content.mcqs.map((mcq, index) => (
                            <div key={index} className="mcq-card">
                              <div className="mcq-question">Q{index + 1}: {mcq.question}</div>
                              <ul className="mcq-options">
                                {mcq.options.map((opt, i) => (
                                  <li key={i}>{opt}</li>
                                ))}
                              </ul>
                              <div className="mcq-answer">Correct Answer: {mcq.correct_answer}</div>
                            </div>
                          ))}
                        </div>
                      )}


                      {/* Render fill in the blanks */}
                      {item.generation_type === 'fill_in_blanks' && item.content?.fill_in_blanks?.length > 0 && (
                        <div className="mcq-list">
                          {item.content.fill_in_blanks.map((fb, index) => (
                            <div key={index} className="mcq-card">
                              <div className="mcq-question">Q{index + 1}: {fb.question}</div>
                              <div className="mcq-answer">Correct Answer: {fb.correct_answer}</div>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
