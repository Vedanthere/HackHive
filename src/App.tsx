import React, { useState } from 'react';
import TranscriptionPanel from './components/TranscriptionPanel';
import QuestionPanel from './components/QuestionPanel';
import DocumentUpload from './components/DocumentUpload';
import './App.css';


// App File
const App = () => {
  // State boolean to toggle between which components to display. 
  const [isUploadView, setIsUploadView] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Lecture Transcription Assistant
            </h1>
            <button
              onClick={() => setIsUploadView(!isUploadView)} // Toggles the View
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {!isUploadView ? 'Transcriber' : 'Upload Document'}
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Study Engine
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!isUploadView ? (
          <div className="bg-white shadow rounded-lg p-6">
            <DocumentUpload />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <TranscriptionPanel />
            </div>
            <QuestionPanel />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;