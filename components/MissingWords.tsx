import React, { useState } from 'react';
import { MissingWordsTask } from '../types';
import Button from './Button';
import { Check, ArrowRight, TextCursorInput } from 'lucide-react';

interface MissingWordsProps {
  tasks: MissingWordsTask[];
  onComplete: () => void;
}

const MissingWords: React.FC<MissingWordsProps> = ({ tasks, onComplete }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');

  const currentTask = tasks[currentTaskIndex];

  const handleOptionClick = (option: string) => {
    if (feedback === 'correct') return;

    if (option === currentTask.correctOption) {
      setSelectedOption(option);
      setFeedback('correct');
    } else {
      setSelectedOption(option);
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback('none');
        setSelectedOption(null);
      }, 1500);
    }
  };

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
      setFeedback('none');
      setSelectedOption(null);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-10 rounded-xl shadow-xl border border-slate-600">
        <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
          <h2 className="text-xl font-serif text-red-400 flex items-center gap-2">
            <TextCursorInput className="w-5 h-5" /> Missing Words
          </h2>
          <span className="text-slate-400 text-sm">Task {currentTaskIndex + 1} / {tasks.length}</span>
        </div>

        <p className="text-slate-300 mb-8 text-center italic">
          Click the correct word to fill the gap.
        </p>

        <div className="bg-black/40 rounded-lg p-6 mb-8 border border-slate-700 text-center">
          <p className="text-xl sm:text-2xl leading-relaxed text-slate-200">
            {currentTask.sentenceParts[0]}
            <span className={`inline-block mx-2 px-3 py-1 rounded min-w-[80px] border-b-2 transition-all font-bold ${
              feedback === 'correct'
                ? 'text-green-300 border-green-500 bg-green-900/20'
                : feedback === 'incorrect'
                ? 'text-red-300 border-red-500 bg-red-900/20'
                : 'text-red-400 border-red-500/50 bg-slate-800'
            }`}>
              {feedback === 'correct' ? selectedOption : (feedback === 'incorrect' ? selectedOption : "_____")}
            </span>
            {currentTask.sentenceParts[1]}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {currentTask.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              disabled={feedback === 'correct'}
              className={`py-3 px-4 rounded-lg font-bold shadow-md transition-all transform active:scale-95 ${
                selectedOption === option && feedback === 'correct'
                  ? 'bg-green-600 text-white border-2 border-green-400'
                  : selectedOption === option && feedback === 'incorrect'
                  ? 'bg-red-800 text-red-100 border-2 border-red-600'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-100 border-2 border-slate-500 hover:border-red-400'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="min-h-[4rem] flex flex-col items-center justify-center">
          {feedback === 'incorrect' && (
            <div className="text-red-400 font-bold animate-pulse">
              That word does not fit. Read the text again.
            </div>
          )}

          {feedback === 'correct' && (
            <div className="w-full flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="text-green-400 font-bold flex items-center gap-2">
                <Check className="w-5 h-5" /> Well done. This sentence is correct.
              </div>
              <Button onClick={handleNext} className="w-full max-w-xs">
                {currentTaskIndex < tasks.length - 1 ? 'Next Sentence' : 'Complete Task'} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissingWords;
