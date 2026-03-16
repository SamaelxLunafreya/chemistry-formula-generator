export interface SynthesisInstruction {
  compoundName: string;
  introduction: string;
  safetyWarnings: string[];
  requiredReagents: {
    name: string;
    quantity: string;
  }[];
  requiredEquipment: string[];
  procedure: {
    step: number;
    description: string;
    explanation?: string; // Wyjaśnienie terminów technicznych
  }[];
}