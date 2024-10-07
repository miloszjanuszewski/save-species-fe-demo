
import React from 'react';
import './Tile.css';

interface Species {
  name: string;
  imagePath: string;
  category: string;
}

interface TileProps {
  data: Species;
  onTileClick: (species: Species) => void;
}

const Tile: React.FC<TileProps> = ({ data, onTileClick }) => {
  return (
    <div className="tile" onClick={() => onTileClick(data)}>
      <div
        className="tile-image"
        style={{ backgroundImage: `url(${data.imagePath})` }}
      >
        <div className="tile-overlay">
          <span className="tile-name">{data.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Tile;
