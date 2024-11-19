import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Scoreboard from './components/Scoreboard';

const App = () => {
  const initialCards = [
    '🍎', '🍌', '🍇', '🍉', '🍓',
    '🍒', '🥝', '🍍', '🍑', '🍋'
  ];

  const [cards, setCards] = useState([...initialCards]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleCardClick = (card) => {
    if (clickedCards.includes(card)) {
      if (currentScore > bestScore) setBestScore(currentScore);
      setClickedCards([]);
      setCurrentScore(0);
    } else {
      setClickedCards([...clickedCards, card]);
      setCurrentScore(currentScore + 1);
    }
    shuffleCards();
  };

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <div className="card-container">
        {cards.map((card, index) => (
          <Card key={index} value={card} onClick={() => handleCardClick(card)} />
        ))}
      </div>
    </div>
  );
};

export default App;