export interface ZeldaGame {
  title: string;
  year: number;
  naSales: number; // In millions
  platform: string;
  boxArtUrl?: string;
}

export interface InfographicData {
  games: ZeldaGame[];
  totalSales: number;
  topSelling: ZeldaGame | null;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR',
}