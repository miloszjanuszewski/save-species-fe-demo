
import React from 'react';
import {Tile} from '..';
import './TileGrid.css';

interface Species {
  name: string;
  imagePath: string;
  category: string;
}

interface TileGridProps {
  data: Species[];
  onTileClick: (species: Species) => void;
}

const TileGrid: React.FC<TileGridProps> = ({ data, onTileClick }) => {
  return (
    <div className="tile-grid">
      {data.map((species, index) => (
        <Tile key={index} data={species} onTileClick={onTileClick} />
      ))}
    </div>
  );
};

export default TileGrid;
