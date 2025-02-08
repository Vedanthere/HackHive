import { createSlice } from '@reduxjs/toolkit';

const transcriptSlice = createSlice({
  name: 'transcript',
  initialState: {
    chunks: [],
    isTranscribing: false,
  },
  reducers: {
    startTranscription: (state) => {
      state.isTranscribing = true;
    },
    stopTranscription: (state) => {
      state.isTranscribing = false;
    },
    addTranscriptChunk: (state, action) => {
      state.chunks.push(action.payload);
    },
  },
});

export const { startTranscription, stopTranscription, addTranscriptChunk } = transcriptSlice.actions;
export default transcriptSlice.reducer;