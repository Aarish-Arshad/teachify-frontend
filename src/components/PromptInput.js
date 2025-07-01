import React from 'react';


import '../styles/PromptInput.css';


const PromptInput = () => {
  return (
    <div className="prompt-input-wrapper">
      <input type="text" name="username" placeholder="Enter a topic (e.g. ‘Photosynthesis process’) or paste your text here to generate questions…"></input>
    </div>
  );
};

export default PromptInput;
