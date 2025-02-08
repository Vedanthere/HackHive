import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardWrapper = styled.div`
  perspective: 1000px;
  width: 400px;
  height: 250px;
  margin: 1rem;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) => $isFlipped ? 'rotateY(180deg)' : 'none'};
  cursor: pointer;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.background};
`;

const FrontFace = styled(CardFace)`
  transform: rotateY(0deg);
`;

const BackFace = styled(CardFace)`
  transform: rotateY(180deg);
  background: ${({ theme }) => theme.colors.lightBackground};
`;

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <CardWrapper>
      <CardInner 
        $isFlipped={isFlipped} 
        onClick={() => setIsFlipped(!isFlipped)}
        role="button"
        aria-label={isFlipped ? "Flip to question" : "Flip to answer"}
      >
        <FrontFace>
          <h3>{question}</h3>
        </FrontFace>
        <BackFace>
          <p>{answer}</p>
        </BackFace>
      </CardInner>
    </CardWrapper>
  );
};

Flashcard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Flashcard;