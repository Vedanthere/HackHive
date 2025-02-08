import { createSlice } from '@reduxjs/toolkit';

const qaSlice = createSlice({
  name: 'qa',
  initialState: {
    questions: [], // Stores the list of questions and answers
    isLoading: false, // Loading state for Q&A generation
    error: null, // Stores any errors during Q&A generation
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload; // Update questions
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
    clearQuestions: (state) => {
      state.questions = []; // Clear questions
      state.error = null; // Clear errors
    },
  },
});

export const { setQuestions, setLoading, setError, clearQuestions } = qaSlice.actions;
export default qaSlice.reducer;