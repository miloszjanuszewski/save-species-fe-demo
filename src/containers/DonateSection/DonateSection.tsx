
import React, { useState } from 'react';
import {SearchBar, TileGrid } from '../../components';
import { useAuthStore } from '../../stores/authStore';
import { DonationModal,   LoginModal } from '../../modals';
import speciesData from '../../data/species-data.json';

import './DonateSection.css';

interface Species {
  name: string;
  imagePath: string;
  category: string;
}

const DonateSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  
  const filteredSpecies = speciesData.filter((species: Species) =>
    species.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleTileClick = (species: Species) => {
    if (isAuthenticated) {
      setSelectedSpecies(species);
      setIsDonationModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <section id="donate-section" className="donate-section">
      <h2>Donate</h2>
      <SearchBar
        placeholder="Search species..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <TileGrid data={filteredSpecies} onTileClick={handleTileClick} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      {selectedSpecies && (
        <DonationModal
          isOpen={isDonationModalOpen}
          onClose={() => setIsDonationModalOpen(false)}
          speciesName={selectedSpecies.name}
        />
      )}
    </section>
  );
};

export default DonateSection;
