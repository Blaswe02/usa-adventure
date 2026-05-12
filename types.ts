
export type ViewState = 'intro' | 'map' | 'location' | 'mystery_gate' | 'oracle' | 'ending';

export type SymbolType = 'Flame' | 'Star' | 'Anchor' | 'Shield';

export interface LocationData {
  id: string;
  name: string;
  shortDescription: string;
  introImage: string;
  readingText: string[];
  mysterySentence: string;
  symbol: SymbolType;
  symbolMeaning: string;
  questions: Question[];
  sentenceBuilderTasks: SentenceBuilderTask[];
  missingWordsTasks: MissingWordsTask[];
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

export interface SentenceBuilderTask {
  id: number;
  blocks: string[];
}

export interface MissingWordsTask {
  id: number;
  sentenceParts: [string, string];
  options: string[];
  correctOption: string;
}

export interface PlayerState {
  inventory: SymbolType[];
  completedLocations: string[];
  dream: string;
}
