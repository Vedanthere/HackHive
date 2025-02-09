import React from 'react';
import TranscriptionPanel from './components/TranscriptionPanel';
import QuestionPanel from './components/QuestionPanel';
import DocumentUpload from './components/DocumentUpload';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Study Engine
          </h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TranscriptionPanel />
            <DocumentUpload />
          </div>
          <QuestionPanel />
        </div>
      </main>
    </div>
  );
}

export default App;