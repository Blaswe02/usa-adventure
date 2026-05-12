import React, { useState } from 'react';
import Button from './Button';
import { Star, ArrowRight, Wind } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-950 text-slate-100 p-6 text-center relative overflow-hidden">
      {step === 1 && (
        <div className="flex items-center justify-center w-full gap-4 md:gap-12 lg:gap-20">
          <div className="max-w-md animate-in fade-in slide-in-from-bottom duration-1000 flex flex-col items-center z-10">
            <h1 className="text-4xl md:text-6xl font-serif text-red-400 mb-6 drop-shadow-lg">
              Liberty's Quest
            </h1>

            <div className="w-full mb-8 rounded-xl overflow-hidden border-4 border-red-600 shadow-2xl relative group bg-black">
              <img
                src="https://picsum.photos/seed/bald-eagle-usa/800/500"
                alt="Bald Eagle"
                className="w-full h-64 object-cover transform transition duration-700 group-hover:scale-105"
              />
            </div>

            <div className="bg-blue-900/80 p-6 rounded-lg border border-blue-700 shadow-xl mb-8 w-full backdrop-blur-sm">
              <p className="text-lg mb-4 text-blue-100">
                You are on a road trip across America. The highway stretches out ahead under a wide blue sky.
              </p>
              <p className="text-lg text-blue-100">
                Suddenly, a huge Bald Eagle swoops down and lands right in front of you!
              </p>
            </div>
            <Button onClick={() => setStep(2)}>
              <Wind className="w-5 h-5" />
              Listen to the Eagle
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-md animate-in zoom-in duration-700">
          <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)]">
            <img
              src="https://picsum.photos/seed/bald-eagle-usa/400/400"
              alt="The Eagle"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-serif text-red-400 mb-4">The Eagle Speaks</h2>
          <p className="text-xl italic text-blue-200 mb-6 font-serif">
            "I am Liberty, guardian of America's symbols! Four national treasures have gone missing across this great land!"
          </p>
          <Button variant="secondary" onClick={() => setStep(3)}>
            How can I help?
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-md animate-in fade-in duration-1000">
          <h2 className="text-2xl font-serif text-red-400 mb-4">A Deal for the Dream</h2>
          <div className="bg-blue-900 p-6 rounded-lg border border-red-700 shadow-xl mb-8 space-y-4">
            <p className="text-lg">
              "Travel to America's most famous landmarks. Find the <strong>Flame</strong>, the <strong>Star</strong>, the <strong>Anchor</strong>, and the <strong>Shield</strong>."
            </p>
            <div className="flex items-center gap-3 text-left bg-black/40 p-4 rounded border border-blue-700">
              <Star className="w-8 h-8 text-red-400 shrink-0" />
              <span className="text-sm">Return them all and I will help you discover the true American Dream!</span>
            </div>
          </div>
          <Button onClick={onComplete}>
            Start the Journey <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Intro;
