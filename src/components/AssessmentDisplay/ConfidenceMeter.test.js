import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfidenceMeter from './ConfidenceMeter';

describe('ConfidenceMeter', () => {
  test('selects confidence levels', () => {
    const mockSelect = jest.fn();
    render(<ConfidenceMeter onSelect={mockSelect} />);
    
    fireEvent.click(screen.getByText('Medium'));
    expect(mockSelect).toHaveBeenCalledWith('medium');
    
    fireEvent.click(screen.getByText('High'));
    expect(mockSelect).toHaveBeenCalledWith('high');
  });

  test('shows active state', () => {
    render(<ConfidenceMeter currentLevel="low" />);
    const lowButton = screen.getByText('Low');
    expect(lowButton).toHaveStyle('background-color: #dc3545'); // Assuming error color
  });
});