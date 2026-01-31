
export type TargetCulture = 'France' | 'Italy' | 'USA' | 'Egypt';
export type AppMode = 'adapt' | 'ask';

export interface TransformationResult {
  originalText: string;
  adaptedText: string;
  explanation: string;
  target: TargetCulture;
  mode: AppMode;
  analysis: {
    scale: string;
    description: string;
  }[];
}

export interface CultureProfile {
  name: TargetCulture;
  communicating: string;
  evaluating: string;
  persuading: string;
  leading: string;
  deciding: string;
  trusting: string;
  disagreeing: string;
  scheduling: string;
  summary: string;
  flag: string;
}
