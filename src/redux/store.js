import { configureStore } from '@reduxjs/toolkit';
import transcriptReducer from './transcriptSlice';
import qaReducer from './qaSlice';
import assessmentReducer from './assessmentSlice';

const store = configureStore({
  reducer: {
    transcript: transcriptReducer,
    qa: qaReducer,
    assessment: assessmentReducer,
  },
});

export default store;