import React, { useState } from 'react';

const CardList = ({ cards, currentPage, itemsPerPage, totalItems, onPageChange, searchTerm }) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  if (!Array.isArray(cards) || cards.length === 0) {
    return (
      <div className="justify-center mt-8">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No cards found</p>
          <p className="text-gray-500">Your search didn’t match any cards. Try again.</p>
        </div>
      </div>
    );
  }

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedCards = () => {
    if (!sortField) {
      return cards;
    }
    return cards.slice().sort((a, b) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];

      // Convert field values to numbers if possible, to sort field containing integers correctly
      if (!isNaN(fieldA) && !isNaN(fieldB)) {
        fieldA = parseInt(fieldA);
        fieldB = parseInt(fieldB);
      }

      if (fieldA < fieldB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Calculate the range of displayed cards, to show counter near search results yield
  const rangeStart = startIndex + 1;
  const rangeEnd = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="container w-4/5 mx-auto mt-8">
      <div className="mb-4">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
          <div className="flex items-center space-x-2 mb-4 lg:mb-0">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-blue-500 hover:text-blue-700 font-bold px-4 rounded-l"
              >
              Previous
            </button>
            <span className="text-blue-500 font-bold px-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-blue-500 hover:text-blue-700 font-bold px-4 rounded-r"
            >
              Next
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Sort by:</span>
            <button
              onClick={() => handleSortChange('name')}
              className="text-blue-500 hover:text-blue-700 font-semibold focus:outline-none"
            >
              Name
            </button>
            <button
              onClick={() => handleSortChange('collector_number')}
              className="text-blue-500 hover:text-blue-700 font-semibold focus:outline-none"
            >
              Number
            </button>
            <button
              onClick={() => handleSortChange('set_name')}
              className="text-blue-500 hover:text-blue-700 font-semibold focus:outline-none"
            >
              Set Name
            </button>
            <button
              onClick={() => handleSortChange('rarity')}
              className="text-blue-500 hover:text-blue-700 font-semibold focus:outline-none"
            >
              Rarity
            </button>
          </div>
        </div>

        <hr className="mb-2"/>

        {/* Display range of cards */}
        <div className="mb-2 text-gray-500">
          {`Showing ${rangeStart} - ${rangeEnd} of ${totalItems} cards`} where the name includes {`“${searchTerm}”`}
        </div>
        
        <hr className="mb-8"/>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedCards().slice(startIndex, endIndex + 1).map((card) => (
            <div key={card.id} className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transform hover:scale-105 transition duration-300 border border-gray-300">
              {card.image_uris && card.image_uris.normal ? (
                <img className="w-full" src={card.image_uris.normal} alt={card.name} />
              ) : card.card_faces && card.card_faces[0]?.image_uris?.normal ? (
                <img className="w-full" src={card.card_faces[0].image_uris.normal} alt={card.name} />
              ) : (
                <div>No image available</div>
              )}
              <div className="px-6 py-4 bg-gray-50">
                <div className="text-gray-500 font-bold text-xl mb-2">{card.name}</div>
                <p className="text-gray-700 text-base">Set Name: {card.set_name}</p>
                <p className="text-gray-700 text-base">Number: {card.collector_number}</p>
                <p className="text-gray-700 text-base" style={{textTransform: 'capitalize'}}>Rarity: {card.rarity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;