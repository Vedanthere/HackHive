import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Flashcard from './Flashcard';
import ConfidenceMeter from './ConfidenceMeter';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

const Progress = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const QuizCard = ({ cards }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [confidenceLevels, setConfidenceLevels] = useState({});

  const handleConfidenceSelect = (level) => {
    setConfidenceLevels(prev => ({
      ...prev,
      [currentCard]: level
    }));
  };

  const handleNext = () => {
    setCurrentCard(prev => Math.min(prev + 1, cards.length - 1));
  };

  const handlePrev = () => {
    setCurrentCard(prev => Math.max(prev - 1, 0));
  };

  return (
    <QuizContainer>
      <Progress>
        Card {currentCard + 1} of {cards.length}
      </Progress>
      
      <Flashcard 
        question={cards[currentCard].question}
        answer={cards[currentCard].answer}
      />

      <ConfidenceMeter
        currentLevel={confidenceLevels[currentCard] || null}
        onSelect={handleConfidenceSelect}
      />

      <Navigation>
        <NavButton onClick={handlePrev} disabled={currentCard === 0}>
          Previous
        </NavButton>
        <NavButton onClick={handleNext} disabled={currentCard === cards.length - 1}>
          Next
        </NavButton>
      </Navigation>
    </QuizContainer>
  );
};

QuizCard.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default QuizCard;