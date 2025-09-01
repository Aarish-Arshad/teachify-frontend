import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
import { Carousel, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';           
import Teacher7 from '../assets/Teacher7.png';
import Teacher5 from '../assets/Teacher5.png';
import Teacher6 from '../assets/Teacher6.png';
import Logo from '../assets/logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);          

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);                                      // start loading

    try {
      const resp = await axios.post(
        'http://localhost:8000/api/login/',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { data } = resp.data;
      const { token, name } = data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', name);

      toast.success('Login successful! Redirecting...');    // show success toast

      setTimeout(() => navigate('/dashboard'), 1500);       // redirect after toast
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        toast.error('Invalid email or password');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);                                    // stop loading
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-center" autoClose={3000} /> 

      <div className="signup-left">
        <Carousel autoplay effect="fade" className="signup-carousel">
          <div><img src={Teacher7} alt="Teacher 7" className="signup-image" /></div>
          <div><img src={Teacher5} alt="Teacher 5" className="signup-image" /></div>
          <div><img src={Teacher6} alt="Teacher 6" className="signup-image" /></div>
        </Carousel>
      </div>

      <div className="signup-right">
        <div className="form-wrapper">
          <img src={Logo} alt="Teachify Logo" className="logo" />
          <h1>Welcome Back, Teacher!</h1>
          <p>
            Unlock your teaching toolkit — generate quizzes, create lectures, and manage 
            your classroom all in one place.
          </p>

          <form className="signup-form" onSubmit={handleSubmit}>
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
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="login-link">
              Don't have an account yet?
              <Button className="signup-link" onClick={handleSignupClick}>
                Sign Up
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
