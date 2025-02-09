import React, { useState, useEffect } from 'react';
import TranscriptionPanel from './components/TranscriptionPanel';
import QuestionPanel from './components/QuestionPanel';
import DocumentUpload from './components/DocumentUpload';
import { Book, Mic, Sparkles } from 'lucide-react';

const App = () => {
  const [isUploadView, setIsUploadView] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only update position if not hovering over main content
      const target = e.target as HTMLElement;
      const isOverContent = target.closest('main') !== null;
      
      if (!isOverContent) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Dynamic background effects */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-purple-100/40 opacity-50"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />

      <header className="bg-white/70 backdrop-blur-md shadow-lg sticky top-0 z-10 border-b border-blue-100">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3 shadow-lg">
                <h1 className="text-3xl font-bold text-white flex items-center">
                  SE
                  <Sparkles className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h1>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Study Engine
              </h1>
            </div>

            <button
              onClick={() => setIsUploadView(!isUploadView)}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
                         hover:shadow-xl transition-all duration-300
                         overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur"></div>
              <div className="flex items-center space-x-3">
                {!isUploadView ? (
                  <>
                    <Mic className="w-5 h-5" />
                    <span className="font-semibold">Transcriber</span>
                  </>
                ) : (
                  <>
                    <Book className="w-5 h-5" />
                    <span className="font-semibold">Upload Document</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="transform transition-all duration-500 ease-in-out">
          {!isUploadView ? (
            <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8 hover:shadow-2xl 
                          transition-all duration-300 border border-blue-50">
              <DocumentUpload />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8 
                              hover:shadow-2xl transition-all duration-300 border border-blue-50">
                  <TranscriptionPanel />
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8 
                            hover:shadow-2xl transition-all duration-300 border border-blue-50">
                <QuestionPanel />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced decorative elements */}
      <div className="fixed top-1/4 -left-16 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/3 -right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-2/3 left-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Additional subtle decorative elements */}
      <div className="fixed top-1/2 right-1/4 w-48 h-48 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
      <div className="fixed bottom-1/4 left-1/3 w-32 h-32 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-4000"></div>
    </div>
  );
};

export default App;