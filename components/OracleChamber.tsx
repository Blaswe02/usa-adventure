import React, { useState } from 'react';
import { SymbolType } from '../types';
import Button from './Button';
import { Flame, Star, Anchor, Shield, Wind } from 'lucide-react';

interface OracleChamberProps {
  onComplete: (dream: string) => void;
}

const OracleChamber: React.FC<OracleChamberProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'puzzle' | 'ending' | 'dream'>('puzzle');
  const [slots, setSlots] = useState<{ [key: string]: SymbolType | null }>({
    'Liberty & Light': null,
    'History & Pride': null,
    'Mystery & Gateway': null,
    'Power & Democracy': null,
  });
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolType | null>(null);
  const [dreamText, setDreamText] = useState('');
  const [error, setError] = useState('');

  const inventory: SymbolType[] = ['Flame', 'Star', 'Anchor', 'Shield'];

  const hints: { [key: string]: string } = {
    'Liberty & Light': '"France gave me as a gift in 1886. I hold a torch and stand in New York Harbor."',
    'History & Pride': '"Four presidents look from the Black Hills. The Lakota call this sacred ground Six Grandfathers."',
    'Mystery & Gateway': '"Orange-red and tall, I connect two shores in California. Next to me lies an island of secrets."',
    'Power & Democracy': '"132 rooms and an Oval Office. Every president since 1800 has called me home."',
  };

  const handleSlotClick = (meaning: string) => {
    if (selectedSymbol) {
      setSlots(prev => ({ ...prev, [meaning]: selectedSymbol }));
      setSelectedSymbol(null);
      setError('');
    }
  };

  const checkSolution = () => {
    const correctMap: { [key: string]: SymbolType } = {
      'Liberty & Light': 'Flame',
      'History & Pride': 'Star',
      'Mystery & Gateway': 'Anchor',
      'Power & Democracy': 'Shield',
    };

    let allCorrect = true;
    for (const [meaning, symbol] of Object.entries(slots)) {
      if (symbol !== correctMap[meaning]) {
        allCorrect = false;
      }
    }

    if (allCorrect) {
      setStep('ending');
    } else {
      setError('The symbols are not in the right place. Read the hints carefully!');
    }
  };

  const getIcon = (type: SymbolType | null) => {
    if (!type) return null;
    switch (type) {
      case 'Flame': return <Flame className="w-8 h-8 text-red-400" />;
      case 'Star': return <Star className="w-8 h-8 text-yellow-400" />;
      case 'Anchor': return <Anchor className="w-8 h-8 text-blue-300" />;
      case 'Shield': return <Shield className="w-8 h-8 text-slate-300" />;
    }
  };

  if (step === 'puzzle') {
    return (
      <div className="min-h-screen bg-blue-950 pt-20 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-serif text-red-400 mb-2">Liberty's Final Challenge</h2>
        <p className="text-blue-200 mb-8 text-center">Return the right symbol to each landmark memory.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl w-full">
          {Object.keys(slots).map((meaning) => (
            <div
              key={meaning}
              onClick={() => handleSlotClick(meaning)}
              className={`p-4 bg-blue-900 border-2 rounded-xl flex flex-col items-center justify-between cursor-pointer transition-all min-h-[14rem] ${
                slots[meaning] ? 'border-red-500' : 'border-blue-700 hover:border-blue-500'
              }`}
            >
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="text-blue-300 text-sm uppercase tracking-widest text-center border-b border-blue-800 w-full pb-2">{meaning}</div>
                <div className="text-xs text-red-300/90 italic text-center px-2 whitespace-pre-line leading-relaxed">
                  {hints[meaning]}
                </div>
              </div>

              <div className="w-16 h-16 mt-4 rounded-full bg-black/50 flex items-center justify-center shadow-inner shrink-0">
                {getIcon(slots[meaning])}
              </div>
            </div>
          ))}
        </div>

        {error && <div className="text-red-300 mb-4 animate-pulse bg-red-900/40 px-4 py-2 rounded border border-red-800">{error}</div>}

        <div className="bg-blue-900 p-6 rounded-xl border border-blue-700 mb-8 shadow-lg">
          <p className="text-blue-200 text-center mb-4">Select a symbol to place:</p>
          <div className="flex gap-4 justify-center">
            {inventory.map(sym => (
              <button
                key={sym}
                onClick={() => setSelectedSymbol(sym)}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${
                  selectedSymbol === sym
                    ? 'bg-red-900 border-red-400 ring-2 ring-red-400 ring-offset-2 ring-offset-blue-900'
                    : 'bg-slate-800 border-slate-600'
                }`}
              >
                {getIcon(sym)}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={checkSolution}
          disabled={Object.values(slots).some(v => v === null)}
          className="w-full max-w-xs"
        >
          Present to Liberty
        </Button>
      </div>
    );
  }

  if (step === 'ending') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-red-900 pt-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="animate-in zoom-in duration-1000 mb-8">
          <div className="w-32 h-32 mx-auto bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,0.8)] animate-pulse border-4 border-red-300">
            <Star className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-red-200 mb-6 drop-shadow-xl">The American Dream is Yours!</h1>
        <div className="max-w-md bg-black/40 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm mb-8">
          <p className="text-xl text-blue-100 italic mb-4">"You have journeyed across this great nation and learned its stories. Well done, traveler!"</p>
          <p className="text-lg text-red-400">Liberty grants you the power to dream big.</p>
        </div>
        <Button onClick={() => setStep('dream')}>Write Your Dream</Button>
      </div>
    );
  }

  if (step === 'dream') {
    return (
      <div className="min-h-screen bg-blue-950 pt-20 px-4 flex flex-col items-center">
        <h2 className="text-3xl font-serif text-red-400 mb-6">Write Your American Dream</h2>
        <div className="max-w-md w-full bg-blue-900 p-6 rounded-xl border border-blue-700 shadow-xl">
          <label className="block text-blue-200 mb-2">My Dream (2-3 sentences):</label>
          <textarea
            className="w-full h-32 bg-blue-950 border border-blue-800 rounded-lg p-4 text-slate-200 focus:border-red-500 outline-none resize-none mb-4 font-sans"
            placeholder="My dream is... Because..."
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
          />
          <Button onClick={() => onComplete(dreamText)} disabled={dreamText.length < 10} className="w-full">
            Submit My Dream <Wind className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default OracleChamber;
