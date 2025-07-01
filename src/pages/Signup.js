// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Signup.css';
// import { Carousel, Button } from 'antd';
// // import Teacher1 from '../assets/Teacher1.png';
// // import Teacher2 from '../assets/Teacher2.jpg';
// // import Teacher3 from '../assets/Teacher3.jpeg';
// import Teacher7 from '../assets/Teacher7.png';
// import Teacher5 from '../assets/Teacher5.png';
// import Teacher6 from '../assets/Teacher6.png';
// import Logo from '../assets/logo.png';

// function Signup() {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const onFinish = (e) => {
//     e.preventDefault();
//     navigate('/login');
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-left">
//         <Carousel autoplay effect="fade" className="signup-carousel">

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
//           <h1>Join TEACHIFY Today!</h1>
//           <p>
//             Start creating quizzes, fill-in-the-blanks, and lectures effortlessly.
//             Sign up in seconds and transform the way you teach.
//           </p>
//           <form className="signup-form" onSubmit={onFinish}>
//             <label>Name</label>
//             <input type="text" placeholder="Enter your name" required />

//             <label>Username</label>
//             <input type="text" placeholder="Choose a username" required />

//             <label>Email Address</label>
//             <input type="email" placeholder="@example.com" required />

//             <label>Password</label>
//             <input type="password" placeholder="Enter your password" required />



//             <button type="submit">Sign Up</button>
//             <p className="login-link">
//               Already have an account?
//               <Button className='login-link' onClick={handleLoginClick}>
//                 Log In
//               </Button>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';
import { Carousel, Button } from 'antd';
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
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const payload = { name, username, email, password };
      const resp = await axios.post(
        'http://localhost:8000/api/signup/',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (resp.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      const data = err.response?.data;
      if (data) {
        const firstField = Object.keys(data)[0];
        setError(`${firstField}: ${data[firstField].join(' ')}`);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
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
          {error && <div className="error">{error}</div>}
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

            <button type="submit">Sign Up</button>
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
