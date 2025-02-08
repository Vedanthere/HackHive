import React, { useState } from 'react';
import useLectureStore from '../store/lectureStore';
import { generateAnswer } from '../services/huggingface';

const QuestionPanel: React.FC = () => {
  const [question, setQuestion] = useState('');
  const { questions, addQuestion, transcripts } = useLectureStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const context = transcripts.map(t => t.text).join(' ');
    try {
      const answer = await generateAnswer(question, context);
      addQuestion({
        id: Date.now().toString(),
        text: question,
        answer,
        timestamp: Date.now(),
      });
      setQuestion('');
    } catch (error) {
      console.error('Error getting answer:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Questions</h3>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Ask
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="border-b pb-4">
            <p className="font-medium text-gray-800">{q.text}</p>
            {q.answer && (
              <p className="mt-2 text-gray-600">{q.answer}</p>
            )}
            <span className="text-sm text-gray-400">
              {new Date(q.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;