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
  // 51V+ (Vanadium) - Scenario: ClO+ interference in high-Cl matrices
  "51": {
    analyte: {
      name: "51V+",
      mass: 51.0,
      kedLoss: 0.05,    // Low loss in KED mode.
      rxnLoss: 0.9,     // High conversion to product (e.g., VO+) in Reaction mode.
      productShift: 16.0, // V+ -> VO+ (Oxidation with O2)
    },
    interferents: [
      {
        name: "35Cl16O+ (Chlorine Oxide)",
        mass: 50.96,
        default: 100000,
        kedFactor: 0.75, // Moderate KED efficiency for ClO+ due to bond strength.
        reactionFactor: 0.0, // ClO+ generally passes through O2 reaction cell unchanged.
        productShift: 0.0,
      },
    ],
  },
  // 52Cr+ (Chromium) - Scenario: Argon Carbide and Argon Oxide Polyatomics
  "52": {
    analyte: {
      name: "52Cr+",
      mass: 52.0,
      kedLoss: 0.05,    // Low loss in KED mode.
      rxnLoss: 0.95,    // Very high conversion to product (e.g., CrO+).
      productShift: 16.0, // Cr+ -> CrO+ (Oxidation with O2)
    },
    interferents: [
      {
        name: "40Ar12C+ (Argon Carbide)",
        mass: 51.96,
        default: 500000,
        kedFactor: 0.8, // Good KED efficiency; ArC bond is relatively weak.
        reactionFactor: 0.05, // Minimal reaction in O2 cell.
        productShift: 0.0,
      },
      {
        name: "36Ar16O+ (Argon Oxide)",
        mass: 52.00,
        default: 200000,
        kedFactor: 0.9,     // High KED efficiency; ArO bond is unstable.
        reactionFactor: 0.05, // Minimal reaction in O2 cell.
        productShift: 0.0,
      },
    ],
  },
  // 56Fe+ (Iron) - Scenario: Standard Argon Oxide Polyatomic
  "56": {
    analyte: {
      name: "56Fe+",
      mass: 56.0,
      kedLoss: 0.05,    // Low loss in KED mode.
      rxnLoss: 0.95,    // Very high conversion to product (FeO+).
      productShift: 16.0, // Fe+ -> FeO+ (Oxidation with O2)
    },
    interferents: [
      {
        name: "40Ar16O+",
        mass: 55.95,
        default: 500000,
        kedFactor: 0.8,     // Good KED efficiency for ArO+.
        reactionFactor: 0.1, // Small conversion/side reaction with O2 gas.
        productShift: 0.0,
      },
    ],
  },
  // 75As+ (Arsenic) - Scenario: Argon Chloride Polyatomic
  "75": {
    analyte: {
      name: "75As+",
      mass: 75.0,
      kedLoss: 0.05,
      rxnLoss: 0.9,     // High conversion efficiency.
      productShift: 16.0, // As+ -> AsO+ (Oxidation with O2)
    },
    interferents: [
      {
        name: "40Ar35Cl+",
        mass: 74.95,
        default: 200000,
        kedFactor: 0.85, // Good KED efficiency.
        reactionFactor: 0.05, // Minimal reaction in O2 cell.
        productShift: 0.0,
      },
    ],
  },
  // 78Se+ (Selenium) - Scenario: Argon Dimer and Doubly Charged Isobaric
  "78": {
    analyte: {
      name: "78Se+",
      mass: 78.0,
      kedLoss: 0.05,
      rxnLoss: 0.05,    // Low analyte conversion, indicating a challenging reaction gas choice.
      productShift: 16.0, // Se+ -> SeO+ (Oxidation with O2)
    },
    interferents: [
      {
        name: "40Ar38Ar+ (Argon Dimer)",
        mass: 78.05,
        default: 400000,
        kedFactor: 0.95,    // Very high KED efficiency for dimers.
        reactionFactor: 0.0, // No reaction.
        productShift: 0.0,
      },
      {
        name: "156Gd++ (Doubly Charged)",
        mass: 77.95,
        default: 150000,
        kedFactor: 0.1,    // KED is ineffective against doubly charged ions.
        reactionFactor: 0.95, // Must be removed by Reaction Mode (e.g., charge transfer).
        productShift: 16.0, // If Gd++ reacts, it might still yield a mass-shifted product.
      },
    ],
  },
  // 80Se+ (Selenium) - Scenario: Pure Argon Dimer Isobaric
  "80": {
    analyte: {
      name: "80Se+",
      mass: 80.0,
      kedLoss: 0.05,
      rxnLoss: 0.9,     // High conversion to product.
      productShift: 16.0, // Se+ -> SeO+ (Oxidation with O2)
    },
    interferents: [
      {
        name: "40Ar40Ar+ (Argon Dimer)",
        mass: 80.0,
        default: 800000,
        kedFactor: 0.98,    // Near perfect KED efficiency for dimers.
        reactionFactor: 0.05, // Minimal reaction in O2 cell.
        productShift: 0.0,
      },
    ],
  },
  // 114Cd+ (Cadmium) - Scenario: Heavy Oxide (MoO+) and Isobaric (Sn+)
  "114": {
    analyte: {
      name: "114Cd+",
      mass: 113.9,
      kedLoss: 0.05,
      rxnLoss: 0.95,    // High conversion to product.
      productShift: 17.0, // Cd+ -> CdNH3+ (Ammoniation with NH3 gas)
    },
    interferents: [
      {
        name: "98Mo16O+ (Molybdenum Oxide)",
        mass: 113.96,
        default: 150000,
        kedFactor: 0.7,    // Lower KED efficiency for heavy, tightly-bound oxides.
        reactionFactor: 0.1, // Does not react well with NH3.
        productShift: 0.0,
      },
      {
        name: "114Sn+ (Tin Isobaric)",
        mass: 113.9,
        default: 50000,
        kedFactor: 0.0,    // KED is ineffective against true isobars.
        reactionFactor: 0.95, // Must be removed efficiently by Reaction Mode (e.g., charge transfer).
        productShift: 0.0,
      },
    ],
  },
};