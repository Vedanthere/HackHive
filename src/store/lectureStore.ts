import { create } from 'zustand';
import { LectureState, Question, Transcript } from '../types';

interface LectureActions {
  setIsRecording: (isRecording: boolean) => void;
  addTranscript: (transcript: Transcript) => void;
  addQuestion: (question: Question) => void;
  setCurrentSummary: (summary: string) => void;
}

const useLectureStore = create<LectureState & LectureActions>((set) => ({
  isRecording: false,
  transcripts: [],
  questions: [],
  currentSummary: '',

  setIsRecording: (isRecording) => set({ isRecording }),
  
  addTranscript: (transcript) => 
    set((state) => ({ 
      transcripts: [...state.transcripts, transcript] 
    })),
  
  addQuestion: (question) =>
    set((state) => ({
      questions: [...state.questions, question]
    })),
  
  setCurrentSummary: (summary) => set({ currentSummary: summary }),
}));

export default useLectureStore;