import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import useLectureStore from '../store/lectureStore';
import { jsPDF } from 'jspdf';

const TranscriptionPanel = () => {
  const { isRecording, transcripts, setIsRecording, addTranscript } = useLectureStore();
  const [currentText, setCurrentText] = useState('');
  const recognitionRef = useRef(null);
  const accumulatedTextRef = useRef('');
  const isUserStoppedRef = useRef(false);

  const initializeRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.');
      return null;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      if (isUserStoppedRef.current) return;

      let interimTranscript = '';
      let finalTranscript = accumulatedTextRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += ' ' + transcript;
          accumulatedTextRef.current = finalTranscript.trim();
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
          ReactDOM.flushSync(() => {
            addTranscript({
              id: Date.now().toString(),
              text: finalText,
              timestamp: Date.now(),
            });
            accumulatedTextRef.current = '';
          });
        }
        setIsRecording(false);
        recognitionRef.current = null;
      } else if (isRecording && recognitionRef.current) {
        recognition.start();
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' && isRecording) {
        recognition.stop();
      }
    };

    return recognition;
  };

  const startListening = () => {
    if (isRecording) return;

    const recognition = initializeRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;
    isUserStoppedRef.current = false;
    accumulatedTextRef.current = '';
    setCurrentText('');

    try {
      recognition.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recognition:', error);
      recognitionRef.current = null;
      setIsRecording(false);
    }
  };

  const stopListening = () => {
    if (!isRecording) return;

    isUserStoppedRef.current = true;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  useEffect(() => {
    return () => {
      isUserStoppedRef.current = true;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    const marginX = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - 2 * marginX;

    doc.text('Lecture Transcriptions', marginX, 20);

    let yPosition = 30;
    transcripts.forEach((transcript) => {
      const formattedText = `[${new Date(transcript.timestamp).toLocaleTimeString()}] ${transcript.text}`;
      const splitText = doc.splitTextToSize(formattedText, maxLineWidth);

      doc.text(splitText, marginX, yPosition);
      yPosition += splitText.length * 7;

      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save('lecture_transcription.pdf');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Live Transcription</h2>
        <button
          onClick={isRecording ? stopListening : startListening}
          className={`px-4 py-2 rounded ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>

      <div className="h-[600px] overflow-y-auto bg-white rounded-lg shadow p-4">
        {transcripts.length === 0 && !currentText ? (
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
                  {accumulatedTextRef.current} <span className="text-gray-600">{currentText}</span>
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

      <div className="mt-4">
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Download Transcription as PDF
        </button>
      </div>
    </div>
  );
};

export default TranscriptionPanel;