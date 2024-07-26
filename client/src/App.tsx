// App.tsx
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import LandingPage from './LandingPage';
import CardList from './CardList';
import { AppState } from './interfaces';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<AppState['searchResults']>([]);
  const [searchedTerm, setSearchedTerm] = useState<AppState['searchedTerm']>('');
  const [hasSearched, setHasSearched] = useState<AppState['hasSearched']>(false); // State to track whether the user has searched
  const [currentPage, setCurrentPage] = useState<AppState['currentPage']>(1);
  const [totalItems, setTotalItems] = useState<AppState['totalItems']>(0);
  const itemsPerPage: AppState['itemsPerPage'] = 12; // Number of cards per page

  const fetchCards = async (q: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/cards/search?q=${encodeURIComponent(q)}`);
      setSearchResults(response.data.data);

      // Update the searched term
      setSearchedTerm(q);

      // Total items
      setTotalItems(response.data.total_cards || 0);

      // Reset to page 1 after each search
      setCurrentPage(1);

      // Set hasSearched to true when the user performs a search
      setHasSearched(true);
    } catch (error) {
      // If there's an error, set an empty array for search results
      setSearchResults([]);

      // Still set the searched term to maintain consistency
      setSearchedTerm(q);

      // Set total items to 0 since there are no results
      setTotalItems(0);

      // Set hasSearched to true to indicate that the user has performed a search
      setHasSearched(true);
    }
  };

  // Debounce function to limit API requests
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (this: any, ...args: any[]) { // Explicitly define 'this' type
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedFetchCards = debounce(fetchCards, 1000);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {hasSearched ? (
        <div className="p-2">
          <SearchBar 
            onSearch={debouncedFetchCards} 
            searchTerm={searchedTerm}
          />
          <CardList
            cards={searchResults}
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            searchTerm={searchedTerm}
          />
        </div>
      ) : (
        <LandingPage onSearch={debouncedFetchCards} />
      )}
    </div>
  );
};

export default App;
