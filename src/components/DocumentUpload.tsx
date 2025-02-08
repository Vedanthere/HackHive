import React, { useCallback } from 'react';
import { generateSummary } from '../services/huggingface';
import useLectureStore from '../store/lectureStore';

const DocumentUpload: React.FC = () => {
  const { setCurrentSummary, setDocumentText } = useLectureStore();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setDocumentText(text); // Store full document text
      const summary = await generateSummary(text);
      setCurrentSummary(summary);
    } catch (error) {
      console.error('Error processing document:', error);
    }
  }, [setCurrentSummary, setDocumentText]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Upload Documents</h3>
      <input
        type="file"
        accept=".txt,.pdf"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
    </div>
  );
};

export default DocumentUpload;