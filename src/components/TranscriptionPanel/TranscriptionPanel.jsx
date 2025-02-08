import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startTranscription, stopTranscription } from '../../redux/transcriptSlice';
import { Button, Paper, Typography } from '@mui/material';;
import { getSocket } from '../../services/socket';
import { initializeAudioStream, stopAudioStream } from '../../utils/audioUtils';
import styled from 'styled-components';

const TranscriptContainer = styled.div`
  height: 300px;
  overflow-y: auto;
  margin-top: 16px;
  padding: 8px;
  border: 1px solid #ddd;
`;

const TranscriptionPanel = () => {
  const dispatch = useDispatch();
  const { isTranscribing, chunks } = useSelector((state) => state.transcript);
  const socket = getSocket();

  const handleStart = async () => {
    try {
      const { stream } = await initializeAudioStream((audioChunk) => {
        socket.emit('audio-chunk', audioChunk);
      });
      
      socket.on('transcript-chunk', (chunk) => {
        dispatch(addTranscriptChunk(chunk));
      });

      dispatch(startTranscription());
    } catch (error) {
      console.error('Audio capture failed:', error);
    }
  };

  const handleStop = () => {
    stopAudioStream();
    dispatch(stopTranscription());
    socket.off('transcript-chunk');
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6">Live Transcription</Typography>
      <Button 
        onClick={handleStart} 
        disabled={isTranscribing} 
        variant="contained"
        color="primary"
      >
        Start
      </Button>
      <Button 
        onClick={handleStop} 
        disabled={!isTranscribing} 
        variant="outlined" 
        sx={{ ml: 2 }}
      >
        Stop
      </Button>
      <TranscriptContainer>
        {chunks.map((chunk, index) => (
          <p key={index}>{chunk}</p>
        ))}
      </TranscriptContainer>
    </Paper>
  );
};

export default TranscriptionPanel;