import React, { useState, ChangeEvent } from 'react';
import pdfToText from "react-pdftotext";
import { generateFlashcards, generateSummary} from '../services/huggingface';

const DocumentUpload: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [sumText, setSumText] = useState<string>("");

  const [flashCards, setFlashCards] = useState<{question:string, answer:string}[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Gets the file and set the State.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  // Handle the file
  const handleProcessFile = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
  
    pdfToText(selectedFile)
      .then((texto) => {
        return generateSummary(texto); // Get the summary of the text
      })
      .then((summary) => {
        return generateFlashcards(summary); // Pass the summary to generate flashcards
      })
      .then((flashCards) => {
        console.log(flashCards); // Check the generated flashcards
      })
      .catch((error) => {
        console.error("Error during processing:", error);
      });
  };
  

  // Extract text from PDF
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
    <div className="p-4 bg-white rounded-lg shadow flex flex-col justify-center items-center">
      <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
      <div className="flex items-center justify-center">
      <input className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100" type="file" accept="application/pdf" onChange={handleFileChange} />
    </div>
      <button 
        onClick={handleProcessFile} 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Process File
      </button>
      <button 
        onClick={extractText} 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Get Summary
      </button>

      {sumText && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg">Summary:</h4>
          <p>{sumText}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
