import React, { useState } from 'react';
import useLectureStore from '../store/lectureStore';
import { generateAnswer } from '../services/huggingface';

const QuestionPanel: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { questions, addQuestion, transcripts, documentText } = useLectureStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setError('Please enter a question');
      return;
    }

    // Check for duplicate question
    if (questions.some(q => q.text.toLowerCase() === trimmedQuestion.toLowerCase())) {
      setError('This question has already been asked');
      return;
    }

    // Combine context sources
    const transcriptContext = transcripts.map(t => t.text).join(' ');
    const fullContext = `${transcriptContext} ${documentText || ''}`.trim();

    if (!fullContext) {
      setError('No context available - please wait for transcription or upload document');
      return;
    }

    try {
      setIsSubmitting(true);
      const answer = await generateAnswer(trimmedQuestion, fullContext);

      addQuestion({
        id: Date.now().toString(),
        text: trimmedQuestion,
        answer: answer || 'No answer could be generated',
        timestamp: Date.now(),
      });
      setQuestion('');
    } catch (error) {
      console.error('Error getting answer:', error);
      setError('Failed to get answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Questions</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                setError('');
              }}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Enter your question"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              disabled={isSubmitting || !question.trim()}
            >
              {isSubmitting ? 'Asking...' : 'Ask'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start">
              <p className="font-medium text-gray-800">{q.text}</p>
              <span className="text-sm text-gray-400">
                {new Date(q.timestamp).toLocaleTimeString()}
              </span>
            </div>
            {q.answer && (
              <p className="mt-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                {q.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;