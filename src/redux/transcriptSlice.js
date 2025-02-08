import { createSlice } from '@reduxjs/toolkit';

const transcriptSlice = createSlice({
  name: 'transcript',
  initialState: {
    transcript: '', // Stores the transcribed text
    isLoading: false, // Loading state for transcription process
    error: null, // Stores any errors during transcription
  },
  reducers: {
    setTranscript: (state, action) => {
      state.transcript = action.payload; // Update transcript
      state.isLoading = false; // Reset loading state
      state.error = null; // Clear any errors
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload; // Set loading state
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error message
      state.isLoading = false; // Reset loading state
    },
    clearTranscript: (state) => {
      state.transcript = ''; // Clear transcript
      state.error = null; // Clear errors
    },
  },
});

export const { setTranscript, setLoading, setError, clearTranscript } = transcriptSlice.actions;
export default transcriptSlice.reducer;