export interface Transcript {
  id: string;
  text: string;
  timestamp: number;
}

export interface Question {
  id: string;
  text: string;
  answer?: string;
  timestamp: number;
}

export interface LectureState {
  isRecording: boolean;
  transcripts: Transcript[];
  questions: Question[];
  currentSummary: string;
}