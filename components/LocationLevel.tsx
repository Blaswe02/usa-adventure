import React, { useState } from 'react';
import { LocationData } from '../types';
import Button from './Button';
import SentenceBuilder from './SentenceBuilder';
import MissingWords from './MissingWords';
import { BookOpen, Check, X, ArrowLeft, ArrowRight, Flame, Star, Anchor, Shield, AlertTriangle } from 'lucide-react';

interface LocationLevelProps {
  location: LocationData;
  onBack: () => void;
  onComplete: () => void;
}

type Step = 'intro' | 'reading' | 'quiz' | 'quiz-results' | 'reading-retry' | 'sentence-builder' | 'missing-words' | 'success';

const PASS_SCORE = 4;

const LocationLevel: React.FC<LocationLevelProps> = ({ location, onBack, onComplete }) => {
  const [step, setStep] = useState<Step>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(location.questions.length).fill(null)
  );

  const totalQuestions = location.questions.length;

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswers(new Array(totalQuestions).fill(null));
  };

  const score = answers.filter((a, i) => a === location.questions[i].correctIndex).length;

  // --- INTRO ---
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

  // --- READING ---
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
          <Button onClick={() => { resetQuiz(); setStep('quiz'); }} className="w-full">
            Start Quiz <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  // --- READING RETRY ---
  if (step === 'reading-retry') {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 px-4 flex justify-center">
        <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-10 rounded-xl shadow-xl border border-slate-600">
          <div className="flex items-start gap-3 bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-bold">Not enough correct answers</p>
              <p className="text-red-200 text-sm mt-1">
                You got <strong>{score} out of {totalQuestions}</strong> correct. You need at least <strong>{PASS_SCORE}</strong>.
                Read the text carefully again before your next attempt.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-serif text-red-400 mb-6 border-b border-slate-600 pb-2">
            History & Culture: {location.name}
          </h2>
          <div className="space-y-4 text-lg text-slate-200 leading-relaxed font-sans mb-8">
            {location.readingText.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <Button onClick={() => { resetQuiz(); setStep('quiz'); }} className="w-full">
            I read the text <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  // --- QUIZ (no per-question feedback) ---
  if (step === 'quiz') {
    const currentQuestion = location.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    const handleNext = () => {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = selectedOption;
      setAnswers(updatedAnswers);

      if (isLastQuestion) {
        setStep('quiz-results');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
      }
    };

    return (
      <div className="min-h-screen bg-slate-900 pt-20 px-4 flex justify-center items-center">
        <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-10 rounded-xl shadow-xl border border-slate-600">

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-slate-400 text-sm mb-2">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span className="text-red-400 text-sm cursor-pointer hover:underline" onClick={() => setStep('reading')}>
                Read Text Again
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div
                className="bg-red-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-6">{currentQuestion.text}</h3>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedOption === idx
                    ? 'border-red-500 bg-red-900/30 text-white'
                    : 'border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:border-slate-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleNext} disabled={selectedOption === null}>
              {isLastQuestion ? 'See Results' : 'Next Question'} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- QUIZ RESULTS ---
  if (step === 'quiz-results') {
    const passed = score >= PASS_SCORE;

    return (
      <div className="min-h-screen bg-slate-900 pt-20 px-4 flex justify-center items-start">
        <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-10 rounded-xl shadow-xl border border-slate-600 my-4">

          {/* Score banner */}
          <div className={`rounded-xl p-5 mb-8 text-center border-2 ${
            passed
              ? 'bg-green-900/30 border-green-600'
              : 'bg-red-900/30 border-red-700'
          }`}>
            <p className={`text-4xl font-bold mb-1 ${passed ? 'text-green-300' : 'text-red-300'}`}>
              {score} / {totalQuestions}
            </p>
            <p className={`text-sm font-semibold ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {passed ? 'Well done! You can continue.' : `You need at least ${PASS_SCORE} correct.`}
            </p>
          </div>

          {/* Per-question breakdown */}
          <div className="space-y-3 mb-8">
            {location.questions.map((q, idx) => {
              const isCorrect = answers[idx] === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    isCorrect ? 'bg-green-900/20 border-green-800/60' : 'bg-red-900/20 border-red-800/60'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isCorrect ? 'bg-green-700' : 'bg-red-700'
                  }`}>
                    {isCorrect
                      ? <Check className="w-3.5 h-3.5 text-white" />
                      : <X className="w-3.5 h-3.5 text-white" />
                    }
                  </div>
                  <div className="text-sm">
                    <p className={`font-semibold ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>
                      {idx + 1}. {q.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action button */}
          {passed ? (
            <Button onClick={() => setStep('sentence-builder')} className="w-full">
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={() => setStep('reading-retry')} className="w-full bg-slate-700 hover:bg-slate-600 border-slate-500">
              Read the text again <BookOpen className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // --- SENTENCE BUILDER ---
  if (step === 'sentence-builder') {
    return (
      <SentenceBuilder
        tasks={location.sentenceBuilderTasks}
        onComplete={() => setStep('missing-words')}
      />
    );
  }

  // --- MISSING WORDS ---
  if (step === 'missing-words') {
    return (
      <MissingWords
        tasks={location.missingWordsTasks}
        onComplete={() => setStep('success')}
      />
    );
  }

  // --- SUCCESS ---
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
