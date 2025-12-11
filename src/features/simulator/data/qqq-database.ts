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
  "51": {
    analyte: {
      name: "51V+",
      mass: 51.0,
      kedLoss: 0.05,
      rxnLoss: 0.9,
      productShift: 16.0, // V -> VO (Reaction with O2)
    },
    interferents: [
      {
        name: "35Cl16O+ (Chlorine Oxide)",
        mass: 50.96,
        default: 100000,
        kedFactor: 0.75, // Moderate KED efficiency for ClO+
        reactionFactor: 0.0, // Does not react (passes straight through)
        productShift: 0.0,
      },
    ],
  },
  "52": {
    analyte: {
      name: "52Cr+",
      mass: 52.0,
      kedLoss: 0.05,
      rxnLoss: 0.95,
      productShift: 16.0, // Cr -> CrO (Reaction with O2)
    },
    interferents: [
      {
        name: "40Ar12C+ (Argon Carbide)",
        mass: 51.96,
        default: 500000,
        kedFactor: 0.8, // Good KED efficiency for ArC+
        reactionFactor: 0.05, // Small amount reacts, but primary removal is KED
        productShift: 0.0,
      },
      {
        name: "36Ar16O+ (Argon Oxide)",
        mass: 52.00,
        default: 200000,
        kedFactor: 0.9,
        reactionFactor: 0.05,
        productShift: 0.0,
      },
    ],
  },
  "80": {
    analyte: {
      name: "80Se+",
      mass: 80.0,
      kedLoss: 0.05,
      rxnLoss: 0.9,
      productShift: 16.0, // Se -> SeO (Reaction with O2)
    },
    interferents: [
      {
        name: "40Ar40Ar+ (Argon Dimer)",
        mass: 80.0,
        default: 800000,
        kedFactor: 0.98, // Very effective KED removal, low reaction rate
        reactionFactor: 0.05,
        productShift: 0.0,
      },
    ],
  },
  "114": {
    analyte: {
      name: "114Cd+",
      mass: 113.9,
      kedLoss: 0.05,
      rxnLoss: 0.95,
      productShift: 17.0, // Cd -> CdNH3 (Reaction with NH3)
    },
    interferents: [
      {
        name: "98Mo16O+ (Molybdenum Oxide)",
        mass: 113.96,
        default: 150000,
        kedFactor: 0.7, // Only moderately effective KED removal
        reactionFactor: 0.1, // Does not react well with NH3
        productShift: 0.0,
      },
      {
        name: "114Sn+ (Tin Isobaric)",
        mass: 113.9,
        default: 50000,
        kedFactor: 0.0, // KED is ineffective against true isobars
        reactionFactor: 0.95, // Must be removed by reaction (e.g., charge transfer)
        productShift: 0.0,
      },
    ],
  },
};
