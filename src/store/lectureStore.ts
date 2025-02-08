import { create } from 'zustand';
import { LectureState, Question, Transcript } from '../types';

interface LectureActions {
  setIsRecording: (isRecording: boolean) => void;
  addTranscript: (transcript: Transcript) => void;
  addQuestion: (question: Question) => void;
  setCurrentSummary: (summary: string) => void;
  setDocumentText: (text: string) => void; // Moved from state to actions
}

// Assuming LectureState in your types already includes these properties
// If not, extend it here:
type StoreState = LectureState & {
  isRecording: boolean;
  documentText: string | null;
};

const useLectureStore = create<StoreState & LectureActions>((set) => ({
  // State properties
  isRecording: false,
  transcripts: [],
  questions: [],
  currentSummary: '',
  documentText: null,

  // Actions
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
  
  setDocumentText: (text) => set({ documentText: text }) // Added action implementation
}));

export default useLectureStore;