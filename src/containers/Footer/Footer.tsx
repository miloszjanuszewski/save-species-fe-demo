
import React from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>Demo app created by Your Name</p>
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="mailto:your.email@example.com">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
