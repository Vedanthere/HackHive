import React, { useEffect, useState, useRef } from 'react';
import useLectureStore from '../store/lectureStore';

interface Transcript {
  id: string;
  text: string;
  timestamp: number;
}

interface IWebkitSpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [key: number]: {
      isFinal: boolean;
      [key: number]: {
        transcript: string;
      };
    };
    length: number;
  };
}

interface IWebkitSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: IWebkitSpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: any) => void;
  start: () => void;
  stop: () => void;
}

const TranscriptionPanel: React.FC = () => {
  const { isRecording, transcripts, setIsRecording, addTranscript } = useLectureStore();
  const [currentText, setCurrentText] = useState<string>('');
  const [finalText, setFinalText] = useState<string>('');
  const recognitionRef = useRef<IWebkitSpeechRecognition | null>(null);
  const accumulatedTextRef = useRef<string>('');
  const isUserStoppedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition() as IWebkitSpeechRecognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: IWebkitSpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = accumulatedTextRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += ' ' + transcript;
          accumulatedTextRef.current = finalTranscript.trim();
          setFinalText(finalTranscript.trim());
        } else {
          interimTranscript += transcript;
        }
      }

      setCurrentText(interimTranscript);
    };

    recognition.onend = () => {
      if (isUserStoppedRef.current) {
        const finalText = accumulatedTextRef.current.trim();
        if (finalText) {
          addTranscript({
            id: Date.now().toString(),
            text: finalText,
            timestamp: Date.now(),
          });
        }
        setIsRecording(false);
        setCurrentText('');
        setFinalText('');
        accumulatedTextRef.current = '';
        isUserStoppedRef.current = false;
      } else if (isRecording) {
        recognition.start();
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' && isRecording) {
        recognition.stop();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        isUserStoppedRef.current = true;
        recognitionRef.current.stop();
      }
    };
  }, [addTranscript, setIsRecording, isRecording]);

  const startListening = () => {
    if (recognitionRef.current) {
      isUserStoppedRef.current = false;
      accumulatedTextRef.current = '';
      setFinalText('');
      setCurrentText('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      isUserStoppedRef.current = true;
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Live Transcription</h2>
        <button
          onClick={isRecording ? stopListening : startListening}
          className={`px-4 py-2 rounded ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white transition-colors`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
      
      <div className="h-[600px] overflow-y-auto bg-white rounded-lg shadow p-4">
        {transcripts.length === 0 && !currentText && !finalText ? (
          <p className="text-gray-500 text-center py-4">
            No transcriptions yet. Click "Start Recording" to begin.
          </p>
        ) : (
          <>
            {isRecording && (
              <div className="mb-4 p-3 bg-yellow-100 rounded-lg">
                <span className="text-gray-500 text-sm block mb-1">
                  {new Date().toLocaleTimeString()}
                </span>
                <p className="text-gray-800">
                  {finalText} <span className="text-gray-600">{currentText}</span>
                </p>
              </div>
            )}
            
            {transcripts.map((transcript) => (
              <div key={transcript.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500 text-sm block mb-1">
                  {new Date(transcript.timestamp).toLocaleTimeString()}
                </span>
                <p className="text-gray-800">{transcript.text}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TranscriptionPanel;