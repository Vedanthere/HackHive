import React, { useState, ChangeEvent } from 'react';
import pdfToText from "react-pdftotext";
import { generateSummary } from '../services/huggingface';

const DocumentUpload: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [sumText, setSumText] = useState<string>("");

  // Extract text from PDF
  const extractText = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];

    pdfToText(file)
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
      <h3 className="text-lg font-semibold mb-4">Upload Documents</h3>
      <input type="file" accept="application/pdf" onChange={extractText} />

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
