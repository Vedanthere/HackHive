import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme';
import TranscriptionPanel from './components/TranscriptionPanel';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <TranscriptionPanel
        transcription="Your transcription text here"
        isTranscribing={true}
        status="Live transcription in progress"
        onStartStop={() => console.log('Toggle transcription')}
      />
    </ThemeProvider>
  );
}