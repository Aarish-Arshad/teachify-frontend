import React, { useState } from 'react';
import PromptInput from './PromptInput';
import FileUploader from './FileUploader';
import '../styles/MainSectionQuiz.css';  
import axios from 'axios';

export default function MainSectionLecture() {
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const taskType = 'lecture'; 

  const handleUpload = async () => {
    if (!selectedFile && !prompt.trim()) {
      alert('Please upload a file or enter text prompt.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Token ${token}` }),
      };

      const formData = new FormData();
      if (selectedFile) formData.append('file', selectedFile);
      if (prompt) formData.append('text', prompt);
      formData.append('task_type', taskType);

      console.log('Sending lecture request...');
      const resp = await axios.post(
        'http://localhost:8000/api/upload/',
        formData,
        { headers }
      );

      console.log('Lecture response:', resp.data);
      setResponse(resp.data);
      setError('');
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please check console.');
    }
  };

  return (
    <main className="main-content">
      <div className="rounded-section">
        <div className="hero-section">
          <h2>Generate Your Lectures</h2>
          <p>AI-powered lecture content from your files or text prompt</p>
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
          <button className="generate-btn" onClick={handleUpload}>
            Generate Now
          </button>
        </div>

        {/* Render response content */}
        {response && (
          <div className="response">
            <h3>Generated Content:</h3>

            {response.generated_content?.lectures?.length > 0 && (
              <div>
                {response.generated_content.lectures.map((lec, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{lec.heading}</strong>
                    <ul>
                      {lec.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
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
