import React from 'react';
import { HighlightOutlined, BookOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/Feature1.css';
import '../styles/Sidebar.css';
import WhiteLogo from '../assets/white-logo.png';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <aside className="sidebar">


            <nav className="sidebar-menu">
                <div className='white_logo'>
                    <img onClick={() => navigate("/dashboard")} src={WhiteLogo} alt="Teachify Logo" className="sidebar-logo-image" />
                </div>
                <HighlightOutlined onClick={() => navigate("/quiz-generation")} className="sidebar-icon" />
                <BookOutlined onClick={() => navigate("/lecture-preparation")} className="sidebar-icon" />
                <HistoryOutlined onClick={() => navigate("/history")} className="sidebar-icon" />
                {/* <MailOutlined onClick={() => navigate("/history")} className="sidebar-icon" /> */}
            </nav>


            <div className="sidebar-logout">
                <LogoutOutlined onClick={() => navigate("/login")} className="sidebar-icon" />
            </div>
        </aside>
    );
};

export default Sidebar;


