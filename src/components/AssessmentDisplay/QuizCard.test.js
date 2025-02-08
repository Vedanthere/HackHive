import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizCard from './QuizCard';

const mockCards = [
  { question: 'Q1', answer: 'A1' },
  { question: 'Q2', answer: 'A2' }
];

describe('QuizCard', () => {
  test('navigates between cards', () => {
    render(<QuizCard cards={mockCards} />);
    
    // Test Next button
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Card 2 of 2')).toBeInTheDocument();
    
    // Test Previous button
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Card 1 of 2')).toBeInTheDocument();
  });

  test('tracks confidence levels', () => {
    render(<QuizCard cards={mockCards} />);
    
    fireEvent.click(screen.getByText('Medium'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('High'));
    
    // Go back to first card
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Medium')).toHaveStyle('background-color: #ffc107');
  });
});