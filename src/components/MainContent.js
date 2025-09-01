import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const FileTextIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14,2 14,8 20,8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10,9 9,9 8,9"></polyline>
  </svg>
);

const MainContent = () => {
  const navigate = useNavigate();

  const documents = [
    { name: 'Quiz', color: 'blue' },
    { name: 'Lecture', color: 'pink' },
  ];

  return (
    <div className="main-content">
      {/* User Info Panel */}
      <div className="user-info-panel">
        <h3 className="panel-title">Info</h3>
        <div className="info-items">
          <div className="info-item">
            <div className="info-icon"><UserIcon /></div>
            <div className="info-content">
              <div className="info-label">Username</div>
              <div className="info-value">Teacher</div>
            </div>
          </div>
          {/* <div className="info-item">
            <div className="info-icon"><MailIcon /></div>
            <div className="info-content">
              <div className="info-label">Email Address</div>
              <div className="info-value email">aarish@gmail.com</div>
            </div>
          </div> */}
        </div>
        {/* <div className="bio-section">
          <h4 className="bio-title">Bio</h4>
          <p className="bio-text">
            A passionate learner and resourceful user of the platform,
            constantly exploring new quizzes, lectures, and study tools.
            Enjoys customizing learning experiences through language
            preferences and saved resources. Focused on productivity and
            efficiency in everyday learning tasks.
          </p>
        </div> */}
      </div>

      {/* Saved Documents */}
      <div className="documents-section">
        <h3 className="documents-title">Saved Documents</h3>
        <div className="documents-list">
          {documents.map((doc, index) => (
            <div
              key={index}
              className={`document-item ${doc.color}`}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/history')}
            >
              <div className="document-left">
                <div className="document-icon"><FileTextIcon /></div>
                <span className="document-name">{doc.name}</span>
              </div>
              <div className="document-right">
                <span className="document-size">{doc.size}</span>
                <button className="document-menu">{/* MoreHorizontalIcon if needed */}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Dashboard.css';

// const UserIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//     <circle cx="12" cy="7" r="4"></circle>
//   </svg>
// );

// const MailIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//     <polyline points="22,6 12,13 2,6"></polyline>
//   </svg>
// );

// const FileTextIcon = () => (
//   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//     <polyline points="14,2 14,8 20,8"></polyline>
//     <line x1="16" y1="13" x2="8" y2="13"></line>
//     <line x1="16" y1="17" x2="8" y2="17"></line>
//     <polyline points="10,9 9,9 8,9"></polyline>
//   </svg>
// );

// const MainContent = () => {
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState({
//     username: 'Loading...',
//     email: 'Loading...'
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         console.warn('No auth token found');
//         setProfile({ username: 'Teacher', email: 'N/A' });
//         return;
//       }

//       try {
//         const resp = await axios.get('http://localhost:8000/api/profile/', {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Token ${token}`
//           }
//         });
//         console.log('Profile fetched:', resp.data);  // debug
//         setProfile({
//           username: resp.data.username || 'Teacher',
//           email: resp.data.email || 'N/A'
//         });
//       } catch (err) {
//         console.error('Failed to fetch profile:', err);
//         setProfile({ username: 'Teacher', email: 'N/A' });
//       }
//     };

//     fetchProfile();
//   }, []);

//   const documents = [
//     { name: 'Quiz', color: 'blue' },
//     { name: 'Lecture', color: 'pink' },
//   ];

//   return (
//     <div className="main-content">
//       {/* User Info Panel */}
//       <div className="user-info-panel">
//         <h3 className="panel-title">Info</h3>
//         <div className="info-items">
//           <div className="info-item">
//             <div className="info-icon"><UserIcon /></div>
//             <div className="info-content">
//               <div className="info-label">Username</div>
//               <div className="info-value">{profile.username}</div>
//             </div>
//           </div>
//           <div className="info-item">
//             <div className="info-icon"><MailIcon /></div>
//             <div className="info-content">
//               <div className="info-label">Email Address</div>
//               <div className="info-value email">{profile.email}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Saved Documents */}
//       <div className="documents-section">
//         <h3 className="documents-title">Saved Documents</h3>
//         <div className="documents-list">
//           {documents.map((doc, index) => (
//             <div
//               key={index}
//               className={`document-item ${doc.color}`}
//               style={{ cursor: 'pointer' }}
//               onClick={() => navigate('/history')}
//             >
//               <div className="document-left">
//                 <div className="document-icon"><FileTextIcon /></div>
//                 <span className="document-name">{doc.name}</span>
//               </div>
//               <div className="document-right">
//                 {/* <span className="document-size">{doc.size}</span> */}
//                 <button className="document-menu">{/* optional menu */}</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainContent;
