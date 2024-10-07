
import React, { useState } from 'react';
import {NavButton, Notification} from '../../components';
import './NavigationBar.css';
import { useAuthStore } from '../../stores/authStore';
import {LoginModal} from '../../modals';
import { useNotificationStore } from '../../stores/notificationStore';

const NavigationBar: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogoutClick = () => {
    logout();
    addNotification('You have successfully logged out.');
  };

  return (
    <>
      <nav className="navigation-bar">
        <div className="nav-left">
          <NavButton label="Donate" href="#donate-section" />
          {isAuthenticated && (
            <NavButton
              label={username ? `Your Donations (${username})` : 'Your Donations'}
              href="#your-donations-section"
            />
          )}
        </div>
        <div className="nav-right">
          {!isAuthenticated ? (
            <NavButton label="Login" variant="login" onClick={handleLoginClick} />
          ) : (
            <NavButton label="Logout" variant="logout" onClick={handleLogoutClick} />
          )}
        </div>
      </nav>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <Notification />
    </>
  );
};

export default NavigationBar;
