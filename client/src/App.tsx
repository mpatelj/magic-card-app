// App.js
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CardList from './CardList';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const fetchCards = async (q) => {
    try {
      const response = await axios.get(`http://localhost:3001/cards/search?q=${encodeURIComponent(q)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error.message);
    }
  };

  // Debounce function to limit API requests
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedFetchCards = debounce(fetchCards, 1000);

  return (
    <div>
      <SearchBar onSearch={debouncedFetchCards} />
      <CardList cards={searchResults} />
    </div>
  );
};

export default App;
