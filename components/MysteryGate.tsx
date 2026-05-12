import React, { useState } from 'react';
import { LocationData } from '../types';
import Button from './Button';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface MysteryGateProps {
  locations: LocationData[];
  onComplete: () => void;
}

const MysteryGate: React.FC<MysteryGateProps> = ({ locations, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'neutral' | 'correct' | 'incorrect'>('neutral');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const currentLocation = locations[currentIndex];

  const getSentences = (textArray: string[]) => {
    const fullText = textArray.join(' ');
    return fullText.match(/[^\.!\?]+[\.!\?]+/g) || [fullText];
  };

  const sentences = getSentences(currentLocation.readingText);

  const handleSentenceClick = (sentence: string) => {
    if (feedback !== 'neutral') return;

    const cleanClicked = sentence.trim();
    const cleanTarget = currentLocation.mysterySentence.trim();

    if (cleanClicked.includes(cleanTarget)) {
      setFeedback('correct');
      setFeedbackMsg("Correct! That is the mystery.");

      setTimeout(() => {
        if (currentIndex < locations.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setFeedback('neutral');
          setFeedbackMsg('');
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      setFeedback('incorrect');
      setFeedbackMsg("This is a fact, not a mystery. Read again.");

      setTimeout(() => {
        setFeedback('neutral');
        setFeedbackMsg('');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-serif text-red-400 mb-2">The Gate of Secrets</h2>
      <div className="w-16 h-1 bg-red-700 mb-6"></div>

      <p className="text-slate-300 mb-8 text-center max-w-lg bg-slate-900 p-4 rounded-lg border border-slate-700">
        <span className="block font-bold text-red-400 mb-1">Instruction:</span>
        Click the sentence that shows the <span className="text-white font-bold">mystery</span> (something unknown, unexplained, or based on belief).
      </p>

      <div className="w-full max-w-2xl bg-slate-800 rounded-xl shadow-2xl border-2 border-slate-600 overflow-hidden">
        <div className="bg-black/40 p-4 border-b border-slate-700 flex justify-between items-center">
          <span className="text-slate-400 font-serif">Location {currentIndex + 1} / {locations.length}</span>
          <span className="text-xl font-bold text-white">{currentLocation.name}</span>
        </div>

        <div className="p-8 text-lg leading-loose text-slate-200 font-sans">
          {sentences.map((sentence, idx) => (
            <span
              key={idx}
              onClick={() => handleSentenceClick(sentence)}
              className={`
                cursor-pointer px-1 py-0.5 rounded transition-colors mr-1
                ${feedback === 'neutral' ? 'hover:bg-red-900/40 hover:text-red-100' : ''}
                ${feedback === 'correct' && sentence.includes(currentLocation.mysterySentence) ? 'bg-green-600/50 text-white' : ''}
                ${feedback === 'incorrect' ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {sentence}
            </span>
          ))}
        </div>

        <div className={`
          p-4 flex items-center justify-center gap-3 font-bold transition-all duration-300
          ${feedback === 'neutral' ? 'bg-slate-900 text-slate-500' : ''}
          ${feedback === 'correct' ? 'bg-green-900 text-green-200' : ''}
          ${feedback === 'incorrect' ? 'bg-red-900 text-red-200 animate-pulse' : ''}
        `}>
          {feedback === 'neutral' && "Select a sentence..."}
          {feedback === 'correct' && (
            <>
              <ShieldCheck className="w-6 h-6" /> {feedbackMsg}
            </>
          )}
          {feedback === 'incorrect' && (
            <>
              <AlertCircle className="w-6 h-6" /> {feedbackMsg}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MysteryGate;
