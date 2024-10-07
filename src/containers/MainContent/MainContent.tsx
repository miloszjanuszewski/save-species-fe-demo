
import React from 'react';
import {DonateSection, YourDonationsSection} from '..';
import { useAuthStore } from '../../stores/authStore';

const MainContent: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <main>
      <DonateSection />
      {isAuthenticated && <YourDonationsSection />}
    </main>
  );
};

export default MainContent;
