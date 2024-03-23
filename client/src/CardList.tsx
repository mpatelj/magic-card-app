import React from 'react';

const CardList = ({ cards }) => {
  if (!Array.isArray(cards.data)) {
    return <div>No cards available</div>;
  }

  return (
    <div className="card-list">
      {cards.data.map((card) => (
        <div key={card.id} className="card">
          <div className="card-image">
            <img src={card.image_uris.normal} alt={card.name} />
          </div>
          <div className="card-details">
            <p>Name: {card.name}</p>
            <p>Set Name: {card.set_name}</p>
            <p>Number: {card.collector_number}</p>
            <p>Rarity: {card.rarity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;