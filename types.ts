export enum Sender {
  USER = 'user',
  AI = 'ai',
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}

export interface CareInstructions {
  light: string;
  water: string;
  soil: string;
  temperature: string;
  fertilizer: string;
}

export interface PlantData {
  name: string;
  scientificName: string;
  description: string;
  care: CareInstructions;
  difficulty: number; // 1-10
  sunlightNeeds: number; // 1-10
  waterNeeds: number; // 1-10
  toxicity: string;
  funFact: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR',
}
