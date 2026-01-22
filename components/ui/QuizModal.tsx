'use client';
import React, { useEffect, useState } from 'react';

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer?: string | null;
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
  const [questionsClonedArray, setQuestionsClonedArray] =
    useState<QuizQuestion[]>([]);

  useEffect(() => {
    if (questions.length ) {
      const cloned = questions.map(q => ({
        ...q,
        selectedAnswer: null,
      }));
      setQuestionsClonedArray(cloned);
    }
  }, [questions]);

  const handleClickAnswer = (selectedAnswer: string, index: number) => {
    setQuestionsClonedArray(prev => {
      const cloned = JSON.parse(JSON.stringify(prev));
      cloned[index] = {
        ...cloned[index],
        selectedAnswer,
      };
      return cloned;
    });
  };
 if (!isOpen) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={onClose}
    />

    {/* Modal */}
    <div className="relative z-10 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Quiz</h2>
        <button
          onClick={onClose}
          className="text-xl font-bold cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="max-h-[70vh] space-y-6 overflow-y-auto">
        {questionsClonedArray.map((q, index) => (
          <div key={index}>
            <p className="mb-2 font-medium">
              {index + 1}. {q.question}
            </p>

            <ul className="space-y-2">
              {q.options.map(option => {
                const isSelected = q.selectedAnswer === option;
                const isCorrect = option === q.correctAnswer;
                const isWrong = isSelected && !isCorrect;

                return (
                  <li
                    key={option}
                    onClick={() =>
                      !q.selectedAnswer &&
                      handleClickAnswer(option, index)
                    }
                    className={`rounded border px-3 py-2 cursor-pointer transition
                      ${
                        isCorrect && q.selectedAnswer
                          ? 'bg-green-500 text-white'
                          : isWrong
                          ? 'bg-red-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="rounded bg-black px-4 py-2 text-white cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);
  
};

export default QuizModal;
