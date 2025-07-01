import react from 'react';
import '../styles/Dashboard.css';


// const MoreHorizontalIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="12" cy="12" r="1"></circle>
//     <circle cx="19" cy="12" r="1"></circle>
//     <circle cx="5" cy="12" r="1"></circle>
//   </svg>
// );

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

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
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
  const documents = [
    { name: 'My Report.pdf', color: 'blue' },
    { name: 'Quiz', color: 'yellow' },
    { name: 'Quiz1', color: 'pink' },
    { name: 'Quiz2', color: 'green' },
    
  ];

  return (
    <div className="main-content">
      {/* User Info Panel */}
      <div className="user-info-panel">
        <h3 className="panel-title">Info</h3>
        
        <div className="info-items">
          <div className="info-item">
            <div className="info-icon">
              <UserIcon />
            </div>
            <div className="info-content">
              <div className="info-label">Role</div>
              <div className="info-value">Teacher</div>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <MailIcon />
            </div>
            <div className="info-content">
              <div className="info-label">Email Address</div>
              <div className="info-value email">abc@abc.com</div>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <UserIcon />
            </div>
            <div className="info-content">
              <div className="info-label">Gender</div>
              <div className="info-value">Male</div>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">
              <CalendarIcon />
            </div>
            <div className="info-content">
              <div className="info-label">Date of Birth</div>
              <div className="info-value">26 March 1975</div>
            </div>
          </div>
        </div>

        <div className="bio-section">
          <h4 className="bio-title">Bio</h4>
          <p className="bio-text">
            A passionate learner and resourceful user of the platform, 
            constantly exploring new quizzes, lectures, and study tools. 
            Enjoys customizing learning experiences through language 
            preferences and saved resources. Focused on productivity and 
            efficiency in everyday learning tasks.
          </p>
        </div>
      </div>

      {/* Saved Documents */}
      <div className="documents-section">
        <h3 className="documents-title">Saved Documents</h3>
        
        <div className="documents-list">
          {documents.map((doc, index) => (
            <div key={index} className={`document-item ${doc.color}`}>
              <div className="document-left">
                <div className="document-icon">
                  <FileTextIcon />
                </div>
                <span className="document-name">{doc.name}</span>
              </div>
              <div className="document-right">
                <span className="document-size">{doc.size}</span>
                <button className="document-menu">
                  {/* <MoreHorizontalIcon /> */}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MainContent;
