import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';
import { Carousel, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Teacher7 from '../assets/Teacher7.png';
import Teacher5 from '../assets/Teacher5.png';
import Teacher6 from '../assets/Teacher6.png';
import Logo from '../assets/logo.png';

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);   // start loading

    try {
      const payload = { name, username, email, password };
      const resp = await axios.post(
        'http://localhost:8000/api/signup/',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (resp.status === 201) {
        toast.success('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000); // Redirect after toast
      }
    } catch (err) {
      console.error(err);
      const data = err.response?.data;
      if (data) {
        const firstField = Object.keys(data)[0];
        toast.error(`${firstField}: ${data[firstField].join(' ')}`);
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);   // stop loading
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Left side: Carousel */}
      <div className="signup-left">
        <Carousel autoplay effect="fade" className="signup-carousel">
          <div>
            <img src={Teacher7} alt="Teacher 7" className="signup-image" />
          </div>
          <div>
            <img src={Teacher5} alt="Teacher 5" className="signup-image" />
          </div>
          <div>
            <img src={Teacher6} alt="Teacher 6" className="signup-image" />
          </div>
        </Carousel>
      </div>

      {/* Right side: Signup form */}
      <div className="signup-right">
        <div className="form-wrapper">
          <img src={Logo} alt="Teachify Logo" className="logo" />
          <h1>Join TEACHIFY Today!</h1>
          <p>
            Start creating quizzes, fill-in-the-blanks, and lectures effortlessly.
            Sign up in seconds and transform the way you teach.
          </p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />

            <label>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            <p className="login-link">
              Already have an account?
              <Button className="login-link" onClick={() => navigate('/login')}>
                Log In
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
