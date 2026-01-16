'use client';

import React from 'react';

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
};

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  questions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quiz</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {questions.map((q, index) => (
            <div key={index}>
              <p className="font-medium mb-2">
                {index + 1}. {q.question}
              </p>
              <ul className="space-y-1">
                {q.options.map((option) => (
                  <li
                    key={option}
                    className="rounded border px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
