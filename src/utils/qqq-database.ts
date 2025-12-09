// src/utils/qqq-database.ts

export interface Analyte {
  name: string;
  mass: number;
  kedLoss: number;
  rxnLoss: number;
  productShift: number;
}

export interface Interferent {
  name: string;
  mass: number;
  default: number;
  kedFactor: number;
  reactionFactor: number;
  productShift: number;
}

export interface Scenario {
  analyte: Analyte;
  interferents: Interferent[];
}

export const database: Record<string, Scenario> = {
  "56": {
    analyte: {
      name: "56Fe+",
      mass: 56.0,
      kedLoss: 0.05,
      rxnLoss: 0.95,
      productShift: 16.0,
    },
    interferents: [
      {
        name: "40Ar16O+",
        mass: 55.95,
        default: 500000,
        kedFactor: 0.8,
        reactionFactor: 0.1,
        productShift: 0.0,
      },
    ],
  },
  "75": {
    analyte: {
      name: "75As+",
      mass: 75.0,
      kedLoss: 0.05,
      rxnLoss: 0.9,
      productShift: 16.0,
    },
    interferents: [
      {
        name: "40Ar35Cl+",
        mass: 74.95,
        default: 200000,
        kedFactor: 0.85,
        reactionFactor: 0.05,
        productShift: 0.0,
      },
    ],
  },
  "78": {
    analyte: {
      name: "78Se+",
      mass: 78.0,
      kedLoss: 0.05,
      rxnLoss: 0.05,
      productShift: 16.0,
    },
    interferents: [
      {
        name: "40Ar38Ar+ (Argon Dimer)",
        mass: 78.05,
        default: 400000,
        kedFactor: 0.95,
        reactionFactor: 0.0,
        productShift: 0.0,
      },
      {
        name: "156Gd++ (Doubly Charged)",
        mass: 77.95,
        default: 150000,
        kedFactor: 0.1,
        reactionFactor: 0.95,
        productShift: 16.0,
      },
    ],
  },
};
