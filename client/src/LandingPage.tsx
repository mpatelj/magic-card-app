import React from 'react';
import SearchBar from './SearchBar';

const LandingPage = ({ onSearch }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center landing-page text-white">
        <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-4xl font-bold text-center mb-8">Scryfall is a powerful Magic: The Gathering card search</h1>
            <SearchBar onSearch={onSearch} />
        </div>
    </div>
  );
};

export default LandingPage;
