import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Flashcard from './Flashcard';

describe('Flashcard', () => {
  const mockCard = {
    question: 'What is React?',
    answer: 'A JavaScript library for building user interfaces'
  };

  test('flips on click', () => {
    render(<Flashcard {...mockCard} />);
    const card = screen.getByRole('button');
    fireEvent.click(card);
    expect(screen.getByText(mockCard.answer)).toBeInTheDocument();
    fireEvent.click(card);
    expect(screen.getByText(mockCard.question)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<Flashcard {...mockCard} />);
    expect(asFragment()).toMatchSnapshot();
  });
});