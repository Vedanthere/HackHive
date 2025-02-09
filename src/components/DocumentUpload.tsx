import React, { useState, ChangeEvent } from 'react';
import "./DocumentUpload.css";
import pdfToText from "react-pdftotext";
import { generateFlashcards, generateSummary } from '../services/huggingface';

const FlashCard = ({ question, answer }: { question: string; answer: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-64 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Question Side */}
        <div className="absolute w-full h-full bg-white rounded-lg shadow-lg p-6 backface-hidden">
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Question</h3>
            <p className="text-gray-700 flex-grow">{question}</p>
            <p className="text-sm text-gray-500 mt-4">Click to flip</p>
          </div>
        </div>
        
        {/* Answer Side */}
        <div className="absolute w-full h-full bg-blue-50 rounded-lg shadow-lg p-6 backface-hidden rotate-y-180">
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Answer</h3>
            <p className="text-gray-700 flex-grow">{answer}</p>
            <p className="text-sm text-gray-500 mt-4">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentUpload: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [sumText, setSumText] = useState<string>("");
  const [flashCards, setFlashCards] = useState<{question:string, answer:string}[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleProcessFile = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    
    pdfToText(selectedFile)
      .then((texto) => {
        return generateSummary(texto);
      })
      .then((summary) => {
        return generateFlashcards(summary);
      })
      .then((flashCards) => {
        setFlashCards(flashCards);
      })
      .catch((error) => {
        console.error("Error during processing:", error);
      });
  };

  const extractText = () => {
    if(!selectedFile){
      alert("Not file selected.")
      return
    }
    
    pdfToText(selectedFile)
      .then((t) => {
        setText(t);
        generateSummary(t)
          .then((summary) => {
            setSumText(summary);
          })
          .catch((error) => {
            console.error("Failed to generate summary:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to extract text from PDF:", error);
      });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex flex-col justify-center items-center mb-8">
        <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
        <div className="flex items-center justify-center">
          <input 
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100" 
            type="file" 
            accept="application/pdf" 
            onChange={handleFileChange} 
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleProcessFile}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Process File
          </button>
          <button
            onClick={extractText}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Get Summary
          </button>
        </div>
      </div>

      {sumText && (
        <div className="mb-8">
          <h4 className="font-semibold text-lg mb-2">Summary:</h4>
          <p className="text-gray-700">{sumText}</p>
        </div>
      )}

      {flashCards.length > 0 && (
        <div className="mt-8">
          <h4 className="font-semibold text-lg mb-4">Flashcards:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashCards.map((card, index) => (
              <FlashCard 
                key={index} 
                question={card.question} 
                answer={card.answer} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;