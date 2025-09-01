import React, { useState } from 'react';
import PromptInput from './PromptInput';
import FileUploader from './FileUploader';
import '../styles/MainSectionQuiz.css';
import axios from 'axios';

export default function MainSection() {
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [taskType, setTaskType] = useState('quiz');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    setLoading(true);  // start loading
    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Token ${token}` }),
      };

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('task_type', taskType);
      formData.append('text', prompt);

      console.log('Sending request...');
      const resp = await axios.post(
        'http://localhost:8000/api/upload/',
        formData,
        { headers }
      );

      console.log('Upload response:', resp.data);
      setResponse(resp.data);
      setError('');
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please check console.');
    } finally {
      setLoading(false);  // stop loading
    }
  };

  return (
    <main className="main-content">
      <div className="rounded-section">
        <div className="hero-section">
          <h2>Generate Your Quiz Questions</h2>
          <p>AI-powered MCQs, fill-in-the-blanks and more — tailored to your topics</p>
        </div>

        <FileUploader
          fileName={fileName}
          setFileName={setFileName}
          setSelectedFile={setSelectedFile}
        />

        <PromptInput
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="quiz-controls">
          <div className="selects">
            <select
              className="dropdown"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            >
              <option value="quiz">MCQs</option>
              <option value="fill_in_blanks">Fill in the Blanks</option>
            </select>
          </div>
          <button
            className="generate-btn"
            onClick={handleUpload}
            disabled={loading}   // disable while loading
          >
            {loading ? 'Generating...' : 'Generate Now'}
          </button>
        </div>

        {response && (
          <div className="response">
            <h3>Generated Content:</h3>

            {taskType === 'quiz' && response.generated_content?.mcqs?.length > 0 && (
              <div className="mcq-list">
                {response.generated_content.mcqs.map((mcq, index) => (
                  <div key={index} className="mcq-card">
                    <div className="mcq-question">Q{index + 1}: {mcq.question}</div>
                    <ul className="mcq-options">
                      {mcq.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                    <div className="mcq-answer">✅ Correct Answer: <strong>{mcq.correct_answer}</strong></div>
                  </div>
                ))}
              </div>
            )}


            {taskType === 'fill_in_blanks' && response.generated_content?.fill_in_blanks?.length > 0 && (
              <div>
                {response.generated_content.fill_in_blanks.map((item, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>Q{index + 1}: {item.question}</strong>
                    <br />
                    Correct Answer: {item.correct_answer}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </main>
  );
}
