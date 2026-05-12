import React, { useState, useEffect } from 'react';
import { SentenceBuilderTask } from '../types';
import Button from './Button';
import { Check, RotateCcw, ArrowRight, LayoutGrid } from 'lucide-react';

interface SentenceBuilderProps {
  tasks: SentenceBuilderTask[];
  onComplete: () => void;
}

const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ tasks, onComplete }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [availableBlocks, setAvailableBlocks] = useState<string[]>([]);
  const [answerBlocks, setAnswerBlocks] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');

  const currentTask = tasks[currentTaskIndex];

  useEffect(() => {
    if (currentTask) {
      const shuffled = [...currentTask.blocks].sort(() => Math.random() - 0.5);
      setAvailableBlocks(shuffled);
      setAnswerBlocks([]);
      setFeedback('none');
    }
  }, [currentTask]);

  const handleBlockClick = (block: string, from: 'bank' | 'answer') => {
    if (feedback === 'correct') return;

    if (from === 'bank') {
      setAvailableBlocks(prev => prev.filter(b => b !== block));
      setAnswerBlocks(prev => [...prev, block]);
    } else {
      setAnswerBlocks(prev => prev.filter(b => b !== block));
      setAvailableBlocks(prev => [...prev, block]);
    }
    setFeedback('none');
  };

  const checkAnswer = () => {
    const currentSentence = answerBlocks.join(' ');
    const correctSentence = currentTask.blocks.join(' ');

    if (currentSentence === correctSentence) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleReset = () => {
    const allBlocks = [...answerBlocks, ...availableBlocks].sort(() => Math.random() - 0.5);
    setAnswerBlocks([]);
    setAvailableBlocks(allBlocks);
    setFeedback('none');
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-20 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-8 rounded-xl shadow-xl border border-slate-600">
        <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
          <h2 className="text-xl font-serif text-red-400 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5" /> Sentence Builder
          </h2>
          <span className="text-slate-400 text-sm">Task {currentTaskIndex + 1} / {tasks.length}</span>
        </div>

        <p className="text-slate-300 mb-8 text-center italic">
          Build the correct sentence by clicking the words in order.
        </p>

        <div className={`min-h-[4rem] bg-black/40 rounded-lg p-4 mb-6 border-2 border-dashed flex flex-wrap gap-2 items-center justify-center transition-colors ${
          feedback === 'correct' ? 'border-green-500 bg-green-900/10' :
          feedback === 'incorrect' ? 'border-red-500 bg-red-900/10' : 'border-slate-600'
        }`}>
          {answerBlocks.length === 0 && <span className="text-slate-600 text-sm">Click words below to place them here...</span>}
          {answerBlocks.map((block, idx) => (
            <button
              key={`${block}-${idx}`}
              onClick={() => handleBlockClick(block, 'answer')}
              className="bg-red-100 text-red-900 px-3 py-2 rounded font-bold shadow-md hover:bg-white transition-transform active:scale-95 animate-in zoom-in duration-200"
            >
              {block}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8 min-h-[4rem]">
          {availableBlocks.map((block, idx) => (
            <button
              key={`${block}-${idx}`}
              onClick={() => handleBlockClick(block, 'bank')}
              className="bg-slate-700 text-slate-200 px-3 py-2 rounded shadow border border-slate-600 hover:bg-slate-600 transition-colors"
            >
              {block}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          {feedback === 'incorrect' && (
            <div className="text-red-400 font-bold animate-pulse">
              This sentence is not correct. Read the text again.
            </div>
          )}

          {feedback === 'correct' && (
            <div className="text-green-400 font-bold flex items-center gap-2 animate-bounce">
              <Check className="w-5 h-5" /> Well done. You understood this place.
            </div>
          )}

          <div className="flex gap-4 w-full justify-center">
            {feedback !== 'correct' && (
              <>
                <Button variant="secondary" onClick={handleReset} title="Reset">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button onClick={checkAnswer} disabled={availableBlocks.length > 0}>
                  Check
                </Button>
              </>
            )}

            {feedback === 'correct' && (
              <Button onClick={handleNext} className="w-full max-w-xs animate-in fade-in">
                {currentTaskIndex < tasks.length - 1 ? 'Next Sentence' : 'Complete Task'} <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceBuilder;
