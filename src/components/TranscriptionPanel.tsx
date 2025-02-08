import React, { useEffect, useRef } from 'react';
import useLectureStore from '../store/lectureStore';
import { transcribeAudio } from '../services/huggingface';

const TranscriptionPanel: React.FC = () => {
  const { isRecording, transcripts, setIsRecording, addTranscript } = useLectureStore();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        } 
      });
      
      // Check for supported MIME types
      const mimeType = MediaRecorder.isTypeSupported('audio/wav') 
        ? 'audio/wav' 
        : 'audio/webm';
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType
      });
      
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        try {
          if (chunksRef.current.length > 0) {
            const audioBlob = new Blob(chunksRef.current, { type: mimeType });
            
            // Convert to ArrayBuffer for processing
            const arrayBuffer = await audioBlob.arrayBuffer();
            if (arrayBuffer.byteLength > 0) {
              const text = await transcribeAudio(new Blob([arrayBuffer], { type: mimeType }));
              if (text) {
                addTranscript({
                  id: Date.now().toString(),
                  text,
                  timestamp: Date.now(),
                });
              }
            }
          }
          chunksRef.current = [];
        } catch (error) {
          console.error('Failed to process audio:', error);
          alert('Failed to process audio. Please try again.');
        }
      };

      // Record in smaller chunks for better handling
      mediaRecorderRef.current.start(500);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      if (error instanceof Error) {
        alert(`Failed to access microphone: ${error.message}`);
      } else {
        alert('Failed to access microphone');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        stopRecording();
      }
    };
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Live Transcription</h2>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-4 py-2 rounded ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white transition-colors`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
      
      <div className="h-[600px] overflow-y-auto bg-white rounded-lg shadow p-4">
        {transcripts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No transcriptions yet. Click "Start Recording" to begin.
          </p>
        ) : (
          transcripts.map((transcript) => (
            <div key={transcript.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500 text-sm block mb-1">
                {new Date(transcript.timestamp).toLocaleTimeString()}
              </span>
              <p className="text-gray-800">{transcript.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TranscriptionPanel;