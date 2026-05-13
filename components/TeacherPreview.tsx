import React from 'react';
import { LocationData, SymbolType } from '../types';
import Button from './Button';
import { Flame, Star, Anchor, Shield } from 'lucide-react';
import { Check, X, BookOpen, HelpCircle, LayoutGrid, TextCursorInput, Eye, Puzzle, PenLine, ClipboardList } from 'lucide-react';

interface Props { locations: LocationData[]; onClose: () => void; }

const getIcon = (type: SymbolType, cls = 'w-6 h-6') => {
  switch (type) {
    case 'Flame':  return <Flame  className={`${cls} text-red-400`} />;
    case 'Star':   return <Star   className={`${cls} text-yellow-400`} />;
    case 'Anchor': return <Anchor className={`${cls} text-blue-300`} />;
    case 'Shield': return <Shield className={`${cls} text-slate-300`} />;
  }
};

const SLOTS: { meaning: string; correct: SymbolType; hint: string }[] = [
  { meaning: 'Liberty & Light',    correct: 'Flame',  hint: '"France gave me as a gift in 1886. I hold a torch and stand in New York Harbor."' },
  { meaning: 'History & Pride',    correct: 'Star',   hint: '"Four presidents look from the Black Hills. The Lakota call this sacred ground Six Grandfathers."' },
  { meaning: 'Mystery & Gateway',  correct: 'Anchor', hint: '"Orange-red and tall, I connect two shores in California. Next to me lies an island of secrets."' },
  { meaning: 'Power & Democracy',  correct: 'Shield', hint: '"132 rooms and an Oval Office. Every president since 1800 has called me home."' },
];

const REFLECTION_GOALS = [
  "I can name the main landmarks of the USA.",
  "I can explain what the Statue of Liberty stands for.",
  "I can describe what Mount Rushmore is.",
  "I can explain what happened during the Civil Rights Movement.",
  "I can understand the main words from this chapter.",
];

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; count?: string }> = ({ icon, title, count }) => (
  <h3 className="flex items-center gap-2 text-base font-bold text-yellow-400 mb-4 border-b border-slate-700/60 pb-2">
    {icon} {title} {count && <span className="text-slate-500 font-normal text-sm">({count})</span>}
  </h3>
);

const TeacherPreview: React.FC<Props> = ({ locations, onClose }) => (
  <div className="min-h-screen bg-slate-950 text-slate-100">
    <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur border-b border-yellow-900/50 px-4 py-3 flex justify-between items-center shadow-lg">
      <div>
        <h1 className="text-xl font-serif text-yellow-400">Teacher Preview</h1>
        <p className="text-slate-400 text-xs">Liberty's Quest — all content & answer keys</p>
      </div>
      <Button variant="secondary" onClick={onClose} className="text-sm py-2 px-4">
        <X className="w-4 h-4" /> Exit Preview
      </Button>
    </div>

    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12">

      {/* ── LOCATION CARDS ── */}
      {locations.map((loc, locIdx) => (
        <div key={loc.id} className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
          <div className="relative h-36 overflow-hidden">
            <img src={loc.introImage} alt={loc.name} className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent flex items-center px-6">
              <div>
                <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Location {locIdx + 1} · {loc.symbol}</span>
                <h2 className="text-3xl font-serif text-white">{loc.name}</h2>
                <p className="text-slate-300 text-sm italic">{loc.symbolMeaning}</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-8">

            <section>
              <SectionHeader icon={<BookOpen className="w-4 h-4" />} title="Reading Text" />
              <div className="space-y-2 text-sm">
                {loc.readingText.map((s, i) => {
                  const isMystery = s === loc.mysterySentence;
                  return (
                    <div key={i} className={`flex gap-3 p-2 rounded ${isMystery ? 'bg-yellow-900/25 border border-yellow-700/40' : ''}`}>
                      <span className="text-slate-600 w-5 shrink-0 text-right">{i + 1}.</span>
                      <span className={isMystery ? 'text-yellow-200' : 'text-slate-300'}>{s}</span>
                      {isMystery && <span className="ml-auto shrink-0 text-yellow-500 text-xs font-bold bg-yellow-900/40 px-2 py-0.5 rounded border border-yellow-700/50 self-center">MYSTERY</span>}
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <SectionHeader icon={<HelpCircle className="w-4 h-4" />} title="Questions" count={`${loc.questions.length}`} />
              <div className="space-y-3">
                {loc.questions.map((q, qi) => (
                  <div key={q.id} className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50">
                    <p className="font-bold text-white text-sm mb-3">{qi + 1}. {q.text}</p>
                    <div className="space-y-1.5 ml-2">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className={`flex items-center gap-2 text-sm px-2 py-1 rounded ${oi === q.correctIndex ? 'bg-green-900/30 text-green-300 font-semibold border border-green-800/50' : 'text-slate-400'}`}>
                          {oi === q.correctIndex ? <Check className="w-3.5 h-3.5 shrink-0" /> : <span className="w-3.5 h-3.5 shrink-0" />}
                          {opt}
                        </div>
                      ))}
                    </div>
                    <p className="text-slate-500 text-xs mt-3 italic pl-2">Hint: {q.hint}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeader icon={<LayoutGrid className="w-4 h-4" />} title="Sentence Builder" />
              <div className="space-y-3">
                {loc.sentenceBuilderTasks.map((t, ti) => (
                  <div key={t.id} className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-slate-500 text-xs mb-2">Task {ti + 1} — correct order:</p>
                    <p className="text-white font-semibold mb-3">{t.blocks.join(' ')}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.blocks.map((b, bi) => (
                        <span key={bi} className="flex items-center gap-1 bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-xs border border-slate-600">
                          <span className="text-slate-500 font-bold">{bi + 1}</span> {b}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeader icon={<TextCursorInput className="w-4 h-4" />} title="Missing Words" />
              <div className="space-y-3">
                {loc.missingWordsTasks.map((t, ti) => (
                  <div key={t.id} className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-slate-500 text-xs mb-2">Task {ti + 1}</p>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      {t.sentenceParts[0]}
                      <span className="inline-block mx-1 px-2.5 py-0.5 bg-green-900/40 text-green-300 font-bold rounded border border-green-700/60">{t.correctOption}</span>
                      {t.sentenceParts[1]}
                    </p>
                    <p className="text-slate-500 text-xs mt-2">Options: {t.options.map((o, oi) => (
                      <span key={oi} className={`mr-2 ${o === t.correctOption ? 'text-green-400 font-bold' : ''}`}>{o}{o === t.correctOption ? ' ✓' : ''}</span>
                    ))}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ))}

      {/* ── END ACTIVITIES DIVIDER ── */}
      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-yellow-900/50" />
        <span className="text-yellow-600 font-serif text-lg">End Activities</span>
        <div className="flex-1 h-px bg-yellow-900/50" />
      </div>

      {/* ── GATE OF SECRETS ── */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center gap-3">
          <Eye className="w-5 h-5 text-yellow-400" />
          <div>
            <h2 className="text-xl font-serif text-yellow-400">The Gate of Secrets</h2>
            <p className="text-slate-400 text-xs">Students read all 4 texts and click the mystery sentence in each.</p>
          </div>
        </div>
        <div className="p-6 space-y-3">
          {locations.map((loc, i) => (
            <div key={loc.id} className="bg-slate-800/70 rounded-xl p-4 border border-yellow-900/40">
              <p className="text-yellow-500 text-xs font-bold uppercase tracking-wide mb-2">{i + 1}. {loc.name}</p>
              <p className="text-yellow-200 italic text-sm">"{loc.mysterySentence}"</p>
              <p className="text-slate-500 text-xs mt-2">
                Type: {loc.mysterySentence.startsWith('Some') || loc.mysterySentence.startsWith('Nobody') ? 'belief / unknown' : 'legend / mystery'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FINAL CHALLENGE ── */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center gap-3">
          <Puzzle className="w-5 h-5 text-yellow-400" />
          <div>
            <h2 className="text-xl font-serif text-yellow-400">Liberty's Final Challenge — Symbol Matching</h2>
            <p className="text-slate-400 text-xs">Students match each symbol to the correct landmark hint.</p>
          </div>
        </div>
        <div className="p-6 space-y-3">
          {SLOTS.map((slot) => (
            <div key={slot.meaning} className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50 flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-950 border border-blue-800 flex items-center justify-center">
                {getIcon(slot.correct)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-yellow-400 font-bold text-sm">{slot.meaning}</p>
                  <span className="text-slate-500 text-xs">→</span>
                  <span className="text-green-400 text-xs font-semibold bg-green-900/30 px-2 py-0.5 rounded border border-green-800/50">{slot.correct}</span>
                </div>
                <p className="text-slate-300 text-sm italic">{slot.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WRITING TASK ── */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center gap-3">
          <PenLine className="w-5 h-5 text-yellow-400" />
          <div>
            <h2 className="text-xl font-serif text-yellow-400">American Dream — Writing Task</h2>
            <p className="text-slate-400 text-xs">Students write 2–3 sentences about their American Dream.</p>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-slate-800/70 rounded-xl p-5 border border-slate-700/50">
            <p className="text-slate-400 text-xs uppercase tracking-wide mb-3 font-semibold">Prompt shown to students:</p>
            <p className="text-amber-300 italic text-lg font-serif">"My dream is... Because..."</p>
            <div className="mt-4 pt-4 border-t border-slate-700 space-y-1">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">Requirements:</p>
              <p className="text-slate-300 text-sm">• Minimum 10 characters (button disabled until met)</p>
              <p className="text-slate-300 text-sm">• 2–3 sentences recommended</p>
              <p className="text-slate-300 text-sm">• Free writing — no word limit</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── EVALUATION & REFLECTION ── */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-yellow-400" />
          <div>
            <h2 className="text-xl font-serif text-yellow-400">Evaluation & Reflection</h2>
            <p className="text-slate-400 text-xs">Self-assessment shown to students at the end.</p>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-3">Evaluation Checklist — students tick ✓ / ~ / ✗</p>
            <div className="space-y-2">
              {REFLECTION_GOALS.map((g, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-800/70 rounded-lg px-4 py-2.5 border border-slate-700/50">
                  <span className="text-slate-500 text-xs w-5 text-right shrink-0">{i + 1}.</span>
                  <p className="text-slate-200 text-sm flex-1">{g}</p>
                  <div className="flex gap-1.5 shrink-0">
                    <span className="w-7 h-7 rounded border border-green-700/50 bg-green-900/20 flex items-center justify-center text-green-400 text-xs font-bold">✓</span>
                    <span className="w-7 h-7 rounded border border-yellow-700/50 bg-yellow-900/20 flex items-center justify-center text-yellow-400 text-xs font-bold">~</span>
                    <span className="w-7 h-7 rounded border border-red-700/50 bg-red-900/20 flex items-center justify-center text-red-400 text-xs font-bold">✗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50">
            <p className="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-2">Reflection Question</p>
            <p className="text-amber-300 italic">"What am I afraid I might forget for the test?"</p>
            <p className="text-slate-500 text-xs mt-2">Open text field — minimum 5 characters required</p>
          </div>
          <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50">
            <p className="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-3">Self-Rating Scale</p>
            <p className="text-slate-400 text-xs mb-3">How well did you understand this chapter? (1 = not at all, 10 = very well)</p>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <div key={n} className="w-10 h-10 rounded-lg border border-slate-600 bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm">{n}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default TeacherPreview;
