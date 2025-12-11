// src/features/simulator/logic/calculations/calculations.ts

import type { Analyte, Interferent } from '../../data/qqq-database';

// Helper function for the Gaussian peak generator (needed for the chart later)
export const getGaussian = (mass: number, height: number, mzCenter: number, resolution_sigma: number = 0.05) => {
    const points: { mz: number, intensity: number }[] = [];
    const range = 1.0;

    // Check if the mass is even close to the chart range (for optimization)
    if (mass < mzCenter - range || mass > mzCenter + range) {
        return points;
    }

    // Generate points around the mass
    for (let m = mass - range; m <= mass + range; m += 0.05) {
        // Gaussian Formula: height * exp(-0.5 * ((m - mass) / sigma)^2)
        const yVal = height * Math.exp(-0.5 * Math.pow((m - mass) / resolution_sigma, 2));
        points.push({ mz: m, intensity: yVal });
    }
    return points;
};

// --- CORE SIMULATION CALCULATION FUNCTION ---
export function calculateFinalSignal(
    analyte: Analyte,
    interferents: Interferent[],
    userInterferentCounts: Record<string, number>, // User-set initial counts for dynamic interferents
    q1Mz: number,
    q3Mz: number,
    heFlow: number,
    reactionFlow: number,
    isMSMSMode: boolean
) {
    // 1. Calculate Tuning Factors (0.0 to 1.0 attenuation)
    const heStrength = (heFlow / 10) * 0.95;
    const reactionStrength = (reactionFlow / 100) * 0.99;
    const analyteInit = 1000; // Fixed initial analyte signal

    // 2. Process Analyte
    let analyteFinal = 0;
    let finalAnalyteMass = analyte.mass;
    const analyteMass = analyte.mass;
    const productShift = analyte.productShift;

    if (Math.abs(analyteMass - q1Mz) < 0.2) {
        // Analyte passes Q1
        const attenuatedSignal =
            analyteInit *
            (1 - heStrength * analyte.kedLoss) *
            (1 - reactionStrength * analyte.rxnLoss);

        if (isMSMSMode && reactionFlow > 0) {
            // MS/MS Mode: Reaction shifts mass
            finalAnalyteMass = analyteMass + productShift;

            if (Math.abs(finalAnalyteMass - q3Mz) < 0.2) {
                analyteFinal = attenuatedSignal;
            }
        } else {
            // CRC/Q1 or MS/MS with no reaction gas
            finalAnalyteMass = analyteMass;
            analyteFinal = attenuatedSignal;
        }
    }

    // 3. Process Interferents
    const processedInterferents = interferents.map((interf) => {
        const initCounts = userInterferentCounts[interf.name] || interf.default;
        const interfMass = interf.mass;
        let finalCounts = 0;
        let finalInterfMass = interfMass;

        if (Math.abs(interfMass - q1Mz) < 0.2) {
            // Interferent passes Q1
            const attenuatedSignal =
                initCounts *
                (1 - heStrength * interf.kedFactor) *
                (1 - reactionStrength * interf.reactionFactor);

            if (isMSMSMode && reactionFlow > 0) {
                // MS/MS Mode: Interferent shift (usually 0.0)
                finalInterfMass = interfMass + interf.productShift;

                if (Math.abs(finalInterfMass - q3Mz) < 0.2) {
                    finalCounts = attenuatedSignal;
                }
            } else {
                // CRC/Q1 Mode
                finalInterfMass = interfMass;
                finalCounts = attenuatedSignal;
            }
        }

        return {
            ...interf,
            finalCounts: finalCounts,
            finalMass: finalInterfMass,
        };
    });

    const totalInterfCounts = processedInterferents.reduce((sum, i) => sum + i.finalCounts, 0);

    return {
        analyte: { ...analyte, finalCounts: analyteFinal, finalMass: finalAnalyteMass },
        interferents: processedInterferents,
        totalSignal: analyteFinal + totalInterfCounts,
        totalInterfCounts: totalInterfCounts,
    };
}

// 4. Status/Color Determination (pure function)
export function getStatusColor(analyteCounts: number, totalInterfCounts: number) {
    const snr = analyteCounts / (totalInterfCounts + 1);

    if (snr > 20) {
        return { color: "#10b981", status: 'Excellent Separation', snr: snr.toFixed(1), opacity: 0.05 };
    } else if (snr > 2) {
        return { color: "#f59e0b", status: 'Marginal Interference', snr: snr.toFixed(1), opacity: 0.1 };
    } else {
        return { color: "#ef4444", status: 'Severe Overlap', snr: snr.toFixed(1), opacity: 0.15 };
    }
}