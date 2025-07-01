import React, { useState } from 'react';
import PromptInput from './PromptInput';
import FileUploader from './FileUploader';
import '../styles/MainSectionQuiz.css';
import axios from 'axios';

export default function MainSection() {
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [taskType, setTaskType] = useState('quiz');   // ✅ this is important
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

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
        'http://localhost:8000/api/upload/',   // ✅ backend API
        formData,
        { headers }
      );

      console.log('Upload response:', resp.data);
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
          <h2>Generate Your Quiz Questions</h2>
          <p>AI-powered MCQs, fill-in-the-blanks and more — tailored to your topics</p>
        </div>

        {/* Use Antd styled FileUploader */}
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
              <option value="quiz">Quiz</option>
              <option value="fill_in_blanks">Fill in the Blanks</option>
              {/* <option value="assignment">Assignment</option> */}
            </select>
          </div>
          <button className="generate-btn" onClick={handleUpload}>Generate Now</button>
        </div>

        {/* Render result nicely */}
        {response && (
          <div className="response">
            <h3>Generated Content:</h3>

            {taskType === 'quiz' && response.generated_content?.mcqs?.length > 0 && (
              <div>
                {response.generated_content.mcqs.map((mcq, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>Q{index + 1}: {mcq.question}</strong>
                    <br />
                    Options: {mcq.options.join(', ')}
                    <br />
                    Correct Answer: {mcq.correct_answer}
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

            {/* {taskType === 'assignment' && response.generated_content && (
              <div>
                <p>{response.generated_content}</p>
              </div>
            )} */}
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </main>
  );
}
