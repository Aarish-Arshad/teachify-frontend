import React from 'react';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import '../styles/footer.css';
import ScrollLink from "./ScrollLink";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
const menuItems = [
    {
        key: "home",
        label: <ScrollLink to="home">Home</ScrollLink>,
    },
    {
        key: "features",
        label: <ScrollLink to="features">Features</ScrollLink>,
    },
    {
        key: "whychoose",
        label: <ScrollLink to="whychoose">Why Choose Us</ScrollLink>,
    },
    {
        key: "testimonials",
        label: <ScrollLink to="testimonials">Testimonials</ScrollLink>,
    },
];

const menuData = [
    {
        key: "quizzes",
        label: <Link to="/login">Quizzes</Link>,
    },
    {
        key: "Fill-in-the-blanks",
        label: <Link to="/login">Fill-in-the-blanks</Link>,
    },
    {
        key: "Lecture Generator",
        label: <Link to="/login">Lecture Generator</Link>,
    },
];

const Footer = () => {

    
    return (

        <footer className="footer">
            <div className="footer-content">
                {/* Teachify Info */}
                <div className="footer-section">
                    <h3>TEACHIFY</h3>
                    <p>
                        TEACHIFY is a smart content platform designed for educators — instantly generate quizzes,
                        lectures, and fill-in-the-blank questions from your own materials.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <Menu
                        // theme="light"
                        backgroundColor="transparent"
                        mode="vertical"
                        selectable={false}
                        // className="center-menu"
                        items={menuItems}
                    />
                </div>

                {/* Facilities */}
                <div className="footer-section">
                    <h4>Facilities</h4>
                    <Menu
                        // theme="light"
                        backgroundColor="transparent"
                        mode="vertical"
                        selectable={false}
                        // className="center-menu"
                        items={menuData}
                    />
                    {/* <ul>
                        <button className='footer-btn' onClick={handleLoginClick}>Quizzes</button>
                        <button className='footer-btn' onClick={handleLoginClick}>Fill-in-the-blanks</button>
                        <button className='footer-btn' onClick={handleLoginClick}>Lecture Generator</button>

                    </ul> */}
                </div>
            </div>

            <hr className="footer-divider" />

            {/* Bottom bar */}
            <div className="footer-bottom">
                <span><strong>Copyright TEACHIFY</strong></span>
                <div className="footer-contact">
                    <span><MailOutlined /> junaidamjad03@gmail.com</span>
                    <span><PhoneOutlined /> +92 326 9623532</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
