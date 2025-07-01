import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AppRoutes from './Routes';

function App() {
  return (
    <Router>
      <div className="app-container ">
        <main className="app-content">
          <AppRoutes />
        </main>
        
      </div>
    </Router>
  );
}

export default App;

