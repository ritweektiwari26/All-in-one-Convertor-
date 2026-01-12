
export type UnitCategory = 'Length' | 'Weight' | 'Temperature' | 'Volume' | 'Area' | 'Time' | 'Smart';

export interface UnitDefinition {
  id: string;
  name: string;
  factor: number; // Ratio to base unit (e.g., meters for Length)
  symbol: string;
}

export interface ConversionState {
  category: UnitCategory;
  fromValue: string;
  fromUnit: string;
  toUnit: string;
  result: number | string | null;
}

export interface AIConversionResponse {
  result: string;
  explanation: string;
  funFact: string;
}
