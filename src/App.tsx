import React, { useState } from 'react';
import TranscriptionPanel from './components/TranscriptionPanel';
import QuestionPanel from './components/QuestionPanel';
import DocumentUpload from './components/DocumentUpload';
import { Book, Mic } from 'lucide-react';
import './App.css';

const App = () => {
  const [isUploadView, setIsUploadView] = useState(true);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 shadow-lg">
                <h1 className="text-3xl font-bold text-white">
                  SE
                </h1>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Study Engine
              </h1>
            </div>
            
            <button
              onClick={() => setIsUploadView(!isUploadView)}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg 
                         hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 
                         overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-150"></div>
              <div className="flex items-center space-x-2">
                {!isUploadView ? (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>Transcriber</span>
                  </>
                ) : (
                  <>
                    <Book className="w-5 h-5" />
                    <span>Upload Document</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="transform transition-all duration-300 ease-in-out">
          {!isUploadView ? (
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <DocumentUpload />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300">
                  <TranscriptionPanel />
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <QuestionPanel />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Decorative elements */}
      <div className="fixed top-1/4 -left-4 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl"></div>
      <div className="fixed bottom-1/3 -right-8 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>
      <div className="fixed top-2/3 left-1/4 w-40 h-40 bg-pink-400/10 rounded-full blur-2xl"></div>
    </div>
  );
};

export default App;