import { createSlice } from '@reduxjs/toolkit';

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState: {
    quiz: [], // Stores quiz questions (MCQs)
    flashcards: [], // Stores flashcards data
    scores: {}, // Stores user scores for quizzes
    isLoading: false, // Loading state for assessment data
    error: null, // Stores any errors during assessment
  },
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload; // Update quiz questions
      state.isLoading = false; // Reset loading state
      state.error = null; // Clear any errors
    },
    setFlashcards: (state, action) => {
      state.flashcards = action.payload; // Update flashcards
      state.isLoading = false; // Reset loading state
      state.error = null; // Clear any errors
    },
    setScores: (state, action) => {
      state.scores = action.payload; // Update user scores
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload; // Set loading state
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error message
      state.isLoading = false; // Reset loading state
    },
    clearAssessment: (state) => {
      state.quiz = []; // Clear quiz questions
      state.flashcards = []; // Clear flashcards
      state.scores = {}; // Clear scores
      state.error = null; // Clear errors
    },
  },
});

export const { setQuiz, setFlashcards, setScores, setLoading, setError, clearAssessment } =
  assessmentSlice.actions;
export default assessmentSlice.reducer;