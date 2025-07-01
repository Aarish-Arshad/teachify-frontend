// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Login.css';
// import { Carousel, Button } from 'antd';
// // import Teacher1 from '../assets/Teacher1.png';
// // import Teacher2 from '../assets/Teacher2.jpg';
// // import Teacher3 from '../assets/Teacher3.jpeg';
// import Teacher7 from '../assets/Teacher7.png';
// import Teacher5 from '../assets/Teacher5.png';
// import Teacher6 from '../assets/Teacher6.png';
// import Logo from '../assets/logo.png';

// function Login() {
//   const navigate = useNavigate();

//   const handleSignupClick = () => {
//     navigate('/signup');
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-left">
//         <Carousel autoplay effect="fade" className="signup-carousel">
//           {/* <div>
//             <img src={Teacher1} alt="Teacher 1" className="signup-image" />
//           </div>
//           <div>
//             <img src={Teacher2} alt="Teacher 2" className="signup-image" />
//           </div>
//           <div>
//             <img src={Teacher3} alt="Teacher 3" className="signup-image" />
//           </div> */}
//           <div>
//             <img src={Teacher7} alt="Teacher 7" className="signup-image" />
//           </div>
//           <div>
//             <img src={Teacher5} alt="Teacher 5" className="signup-image" />
//           </div>
//           <div>
//             <img src={Teacher6} alt="Teacher 6" className="signup-image" />
//           </div>
//         </Carousel>
//       </div>

//       <div className="signup-right">
//         <div className="form-wrapper">
//           <img src={Logo} alt="Teachify Logo" className="logo" />
//           <h1>Welcome Back, Teacher!</h1>
//           <p>
//             Unlock your teaching toolkit — generate quizzes, create lectures, and manage your classroom all in one place.
//           </p>
//           <form className="signup-form">
//             <label>Email Address</label>
//             <input type="email" placeholder="@example.com" required />

//             <label>Password</label>
//             <input type="password" required />



//             <button type="submit" onClick={() => navigate("/dashboard")}>Login</button>
//             <p className="login-link">
//               Don't have an account yet?
//               <Button
//                 className='signup-link'
//                 onClick={handleSignupClick}
//               >
//                 Sign Up
//               </Button>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
import { Carousel, Button } from 'antd';
import Teacher7 from '../assets/Teacher7.png';
import Teacher5 from '../assets/Teacher5.png';
import Teacher6 from '../assets/Teacher6.png';
import Logo from '../assets/logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const resp = await axios.post(
        'http://localhost:8000/api/login/',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Example response shape:
      // { status: "success", message: "...", data: { name, email, token } }
      const { data } = resp.data;
      const { token, name } = data;

      // Save token (and optionally user info) for later API calls
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', name);

      // Redirect to your dashboard or protected route
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
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
          {error && <div className="error">{error}</div>}
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

            <button type="submit">Login</button>

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