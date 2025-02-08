import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QASection from './QASection';

// Mock QA data
const mockQA = [
  { id: '1', question: 'How to install?', answer: 'Use npm install' },
  { id: '2', question: 'How to test?', answer: 'Use npm test' },
];

describe('QASection', () => {
  test('renders with default state', () => {
    render(<QASection qaPairs={mockQA} />);
    expect(screen.getByPlaceholderText('Search questions...')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '+' })).toHaveLength(2);
  });

  test('expands/collapses questions', () => {
    render(<QASection qaPairs={mockQA} />);
    const firstToggle = screen.getAllByRole('button', { name: '+' })[0];
    fireEvent.click(firstToggle);
    expect(screen.getByText('−')).toBeInTheDocument();
  });

  test('filters questions by search', () => {
    render(<QASection qaPairs={mockQA} />);
    const searchInput = screen.getByPlaceholderText('Search questions...');
    
    fireEvent.change(searchInput, { target: { value: 'install' } });
    expect(screen.getByText('How to install?')).toBeInTheDocument();
    expect(screen.queryByText('How to test?')).not.toBeInTheDocument();
  });

  test('shows status message when no results', () => {
    render(<QASection qaPairs={[]} status="No results found" />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  test('expand/collapse all buttons work', () => {
    render(<QASection qaPairs={mockQA} />);
    
    fireEvent.click(screen.getByText('Expand All'));
    expect(screen.getAllByRole('button', { name: '−' })).toHaveLength(2);
    
    fireEvent.click(screen.getByText('Collapse All'));
    expect(screen.getAllByRole('button', { name: '+' })).toHaveLength(2);
  });

  test('calls onSearch prop', () => {
    const mockSearch = jest.fn();
    render(<QASection qaPairs={mockQA} onSearch={mockSearch} />);
    
    fireEvent.change(screen.getByPlaceholderText('Search questions...'), {
      target: { value: 'test' }
    });
    expect(mockSearch).toHaveBeenCalledWith('test');
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<QASection qaPairs={mockQA} />);
    expect(asFragment()).toMatchSnapshot();
  });
});