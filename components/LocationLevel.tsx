import React, { useState } from 'react';
import { LocationData } from '../types';
import Button from './Button';
import SentenceBuilder from './SentenceBuilder';
import MissingWords from './MissingWords';
import { BookOpen, Check, ArrowLeft, ArrowRight, Flame, Star, Anchor, Shield } from 'lucide-react';

interface LocationLevelProps {
  location: LocationData;
  onBack: () => void;
  onComplete: () => void;
}

type Step = 'intro' | 'reading' | 'quiz' | 'sentence-builder' | 'missing-words' | 'success';

const LocationLevel: React.FC<LocationLevelProps> = ({ location, onBack, onComplete }) => {
  const [step, setStep] = useState<Step>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 px-4 flex flex-col items-center">
        <div className="max-w-3xl w-full">
          <Button variant="secondary" onClick={onBack} className="mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Map
          </Button>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 border border-slate-600">
            <img src={location.introImage} alt={location.name} className="w-full h-64 sm:h-80 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 pt-24">
              <h1 className="text-4xl font-serif text-white mb-2">{location.name}</h1>
            </div>
          </div>
          <p className="text-xl text-slate-300 italic mb-8 border-l-4 border-red-600 pl-4 bg-slate-800/50 p-4 rounded-r">
            {location.shortDescription}
          </p>
          <Button onClick={() => setStep('reading')} className="w-full sm:w-auto">
            <BookOpen className="w-5 h-5" /> Read the Story
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'reading') {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 px-4 flex justify-center">
        <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-10 rounded-xl shadow-xl border border-slate-600">
          <h2 className="text-2xl font-serif text-red-400 mb-6 border-b border-slate-600 pb-2">
            History & Culture: {location.name}
          </h2>
          <div className="space-y-4 text-lg text-slate-200 leading-relaxed font-sans mb-8">
            {location.readingText.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <Button onClick={() => setStep('quiz')} className="w-full">
            Start Challenge <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'quiz') {
    const currentQuestion = location.questions[currentQuestionIndex];

    const handleCheckAnswer = () => {
      if (selectedOption === currentQuestion.correctIndex) {
        setQuizFeedback('correct');
      } else {
        setQuizFeedback('incorrect');
      }
    };

    const handleNext = () => {
      if (currentQuestionIndex < location.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setQuizFeedback('none');
        setSelectedOption(null);
      } else {
        setStep('sentence-builder');
      }
    };

    return (
      <div className="min-h-screen bg-slate-900 pt-20 px-4 flex justify-center items-center">
        <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-10 rounded-xl shadow-xl border border-slate-600">
          <div className="flex justify-between items-center mb-6 text-slate-400">
            <span>Question {currentQuestionIndex + 1} of {location.questions.length}</span>
            <span className="text-red-400 text-sm cursor-pointer hover:underline" onClick={() => setStep('reading')}>Read Text Again</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-6">{currentQuestion.text}</h3>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => quizFeedback !== 'correct' && setSelectedOption(idx)}
                disabled={quizFeedback === 'correct'}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedOption === idx
                    ? 'border-red-500 bg-red-900/30 text-white'
                    : 'border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600'
                } ${
                  quizFeedback === 'correct' && idx === currentQuestion.correctIndex ? 'border-green-500 bg-green-900/30' : ''
                } ${
                  quizFeedback === 'incorrect' && idx === selectedOption ? 'border-red-500 bg-red-900/30' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {quizFeedback === 'incorrect' && (
            <div className="p-4 bg-red-900/20 border border-red-800 rounded mb-4 text-red-200">
              <span className="font-bold">Try again.</span> Hint: {currentQuestion.hint}
            </div>
          )}

          {quizFeedback === 'correct' && (
            <div className="p-4 bg-green-900/20 border border-green-800 rounded mb-4 text-green-200 flex items-center gap-2">
              <Check className="w-5 h-5" /> Correct!
            </div>
          )}

          <div className="flex justify-end">
            {quizFeedback !== 'correct' ? (
              <Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
                Check Answer
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {currentQuestionIndex < location.questions.length - 1 ? 'Next Question' : 'Next Challenge'}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'sentence-builder') {
    return (
      <SentenceBuilder
        tasks={location.sentenceBuilderTasks}
        onComplete={() => setStep('missing-words')}
      />
    );
  }

  if (step === 'missing-words') {
    return (
      <MissingWords
        tasks={location.missingWordsTasks}
        onComplete={() => setStep('success')}
      />
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 px-4 flex justify-center items-center text-center">
        <div className="max-w-md w-full animate-in zoom-in duration-500 bg-slate-800 p-8 rounded-2xl border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <h2 className="text-3xl font-serif text-red-400 mb-4">Symbol Found!</h2>
          <p className="text-slate-300 mb-8">
            "You have learned the story. Liberty's symbol appears before you."
          </p>

          <div className="bg-black/40 p-6 rounded-full w-40 h-40 mx-auto mb-6 flex items-center justify-center border-4 border-red-600 shadow-inner">
            <div className="animate-bounce">
              {location.symbol === 'Flame' && <Flame className="w-20 h-20 text-red-400" />}
              {location.symbol === 'Star' && <Star className="w-20 h-20 text-yellow-400" />}
              {location.symbol === 'Anchor' && <Anchor className="w-20 h-20 text-blue-300" />}
              {location.symbol === 'Shield' && <Shield className="w-20 h-20 text-slate-300" />}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">{location.symbol}</h3>
          <p className="text-red-300 italic mb-8">{location.symbolMeaning}</p>

          <Button onClick={onComplete} className="w-full">
            Add to Collection & Return
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default LocationLevel;
