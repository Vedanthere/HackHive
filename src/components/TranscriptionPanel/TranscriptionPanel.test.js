import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StyledTranscriptionPanel, TranscriptionText } from './TranscriptionPanel.styles';
import TranscriptionPanel from './TranscriptionPanel';

// Mock styled-components
jest.mock('./TranscriptionPanel.styles', () => ({
  ...jest.requireActual('./TranscriptionPanel.styles'),
  StyledTranscriptionPanel: ({ children }) => <div>{children}</div>,
  TranscriptionText: ({ children }) => <div>{children}</div>,
}));

describe('TranscriptionPanel', () => {
  const mockTranscription = "This is a sample transcription text.";
  const mockOnStartStop = jest.fn();
  const mockStatus = "Transcribing...";

  test('renders without crashing', () => {
    render(<TranscriptionPanel />);
    expect(screen.getByTestId('transcription-panel')).toBeInTheDocument();
  });

  test('displays transcription text', () => {
    render(<TranscriptionPanel transcription={mockTranscription} />);
    expect(screen.getByText(mockTranscription)).toBeInTheDocument();
  });

  test('handles start/stop button click', () => {
    render(<TranscriptionPanel isTranscribing={false} onStartStop={mockOnStartStop} />);
    const button = screen.getByRole('button', { name: /start/i });
    fireEvent.click(button);
    expect(mockOnStartStop).toHaveBeenCalled();
  });

  test('shows stop button when transcribing', () => {
    render(<TranscriptionPanel isTranscribing={true} />);
    expect(screen.getByRole('button', { name: /stop/i })).toBeInTheDocument();
  });

  test('displays status message', () => {
    render(<TranscriptionPanel status={mockStatus} />);
    expect(screen.getByText(mockStatus)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <TranscriptionPanel
        transcription={mockTranscription}
        status={mockStatus}
        isTranscribing={true}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});