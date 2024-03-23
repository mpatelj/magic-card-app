import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the input field
  const handleChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);

    // Call the onSearch function with debouncing
    setTimeout(() => {
      onSearch(input);
    }, 1000); // Adjust the delay as needed
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for a card..."
      />
    </div>
  );
};

export default SearchBar;