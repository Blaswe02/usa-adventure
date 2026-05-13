import React, { useState } from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

interface ReflectionProps {
  onComplete: () => void;
}

type CheckOption = 'yes' | 'maybe' | 'no' | null;

const LEARNING_GOALS = [
  "I can name the main landmarks of the USA.",
  "I can explain what the Statue of Liberty stands for.",
  "I can describe what Mount Rushmore is.",
  "I can explain what happened during the Civil Rights Movement.",
  "I can understand the main words from this chapter.",
];

const Reflection: React.FC<ReflectionProps> = ({ onComplete }) => {
  const [checks, setChecks] = useState<CheckOption[]>(new Array(LEARNING_GOALS.length).fill(null));
  const [reflectionText, setReflectionText] = useState('');
  const [selfRating, setSelfRating] = useState<number | null>(null);

  const allFilled = checks.every(c => c !== null) && reflectionText.trim().length >= 5 && selfRating !== null;

  const setCheck = (goalIdx: number, option: CheckOption) => {
    const updated = [...checks];
    updated[goalIdx] = option;
    setChecks(updated);
  };

  const optionStyle = (current: CheckOption, value: CheckOption, color: string) =>
    `w-9 h-9 rounded-lg border-2 font-bold text-sm transition-all ${
      current === value ? `${color} text-white scale-110` : 'bg-slate-700 border-slate-600 text-slate-400 hover:border-slate-400'
    }`;

  return (
    <div className="min-h-screen bg-slate-900 pt-20 px-4 pb-10 flex justify-center">
      <div className="max-w-2xl w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-red-400 mb-1">Evaluation & Reflection</h2>
          <p className="text-slate-500 text-sm">Liberty's Quest — USA</p>
        </div>

        {/* Evaluation Checklist */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-5">
          <h3 className="text-lg font-bold text-white mb-1">Evaluation Checklist</h3>
          <p className="text-slate-400 text-sm mb-5">Tick the box that applies to you.</p>

          {/* Header row */}
          <div className="flex items-center gap-2 mb-3 pr-1">
            <div className="flex-1 text-slate-500 text-xs font-semibold uppercase tracking-wide">Learning Goal</div>
            <div className="w-9 text-center text-green-400 text-lg font-bold">✓</div>
            <div className="w-9 text-center text-yellow-400 text-lg font-bold">~</div>
            <div className="w-9 text-center text-red-400 text-lg font-bold">✗</div>
          </div>

          <div className="space-y-3">
            {LEARNING_GOALS.map((goal, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-700/40 rounded-lg px-3 py-2">
                <p className="flex-1 text-slate-200 text-sm">{goal}</p>
                <button
                  onClick={() => setCheck(idx, 'yes')}
                  className={optionStyle(checks[idx], 'yes', 'bg-green-700 border-green-500')}
                >✓</button>
                <button
                  onClick={() => setCheck(idx, 'maybe')}
                  className={optionStyle(checks[idx], 'maybe', 'bg-yellow-600 border-yellow-400')}
                >~</button>
                <button
                  onClick={() => setCheck(idx, 'no')}
                  className={optionStyle(checks[idx], 'no', 'bg-red-700 border-red-500')}
                >✗</button>
              </div>
            ))}
          </div>
        </div>

        {/* Reflection */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-5">
          <h3 className="text-lg font-bold text-white mb-1">Reflection</h3>
          <p className="text-slate-400 text-sm mb-4">What am I afraid I might forget for the test?</p>
          <textarea
            value={reflectionText}
            onChange={e => setReflectionText(e.target.value)}
            rows={4}
            placeholder="Write your answer here..."
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:border-red-500 focus:outline-none resize-none text-sm leading-relaxed"
          />
        </div>

        {/* Self-Rating */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
          <h3 className="text-lg font-bold text-white mb-1">Self-Rating</h3>
          <p className="text-slate-400 text-sm mb-4">How well did you understand this chapter? (1 = not at all, 10 = very well)</p>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setSelfRating(n)}
                className={`w-11 h-11 rounded-lg border-2 font-bold text-sm transition-all ${
                  selfRating === n
                    ? 'bg-red-700 border-red-400 text-white scale-110 shadow-lg'
                    : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-red-500 hover:text-white'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={onComplete} disabled={!allFilled} className="w-full py-4 text-lg">
          Submit & See Results <ArrowRight className="w-5 h-5" />
        </Button>

        {!allFilled && (
          <p className="text-slate-500 text-xs text-center mt-3">
            Fill in all boxes, write a reflection, and choose your self-rating to continue.
          </p>
        )}
      </div>
    </div>
  );
};

export default Reflection;
