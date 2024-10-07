
import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
