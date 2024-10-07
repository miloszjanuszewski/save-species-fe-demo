
import React from 'react';
import './NavButton.css';

interface NavButtonProps {
  label: string;
  variant?: 'login' | 'logout';
  href?: string;
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, variant, href, onClick }) => {
  const className = `nav-button ${variant ? `nav-button--${variant}` : ''}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default NavButton;
