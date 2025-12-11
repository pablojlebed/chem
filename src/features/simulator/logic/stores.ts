// src/features/simulator/logic/stores.ts

import { map, computed } from 'nanostores';
import { database, type Scenario, type Analyte, type Interferent } from '../data/qqq-database';
import { calculateFinalSignal, getStatusColor } from './calculations/calculations';

// 1. Core State Types
interface ModeSettings {
    mode: 'KED' | 'Reaction' | 'MS';
    gas: 'O2' | 'NH3' | 'He' | 'None';
    collisionEnergy: number;
}

// 2. Main Application State
interface SimulatorState {
    currentScenarioKey: string;
    selectedAnalyte: Analyte;
    interferentList: Interferent[];
    modeSettings: ModeSettings;
    userInterferentCounts: Record<string, number>;
    q3Mass: number;
    // Add explicit flow rates for the two channels that control attenuation (extracted from the old UI)
    heFlow: number;
    reactionFlow: number;
}

// 3. Calculated Results Interface
interface CalculationResults {
    analyte: Analyte & { finalCounts: number, finalMass: number };
    interferents: (Interferent & { finalCounts: number, finalMass: number })[];
    totalSignal: number;
    totalInterfCounts: number;
    status: ReturnType<typeof getStatusColor>;
}

// 4. Static Store (Holds the full database map)
export const scenarios$ = map<Record<string, Scenario>>(database);


// 5. Function to initialize mode settings and flows based on the analyte
function getDefaultSettings(analyte: Analyte): Pick<SimulatorState, 'modeSettings' | 'q3Mass' | 'heFlow' | 'reactionFlow'> {
    const gas: ModeSettings['gas'] = analyte.productShift === 17.0 ? 'NH3' : 'O2';
    const mode: ModeSettings['mode'] = 'Reaction'; // Default V, Fe, etc. to Reaction mode

    return {
        modeSettings: {
            mode: mode,
            gas: gas,
            collisionEnergy: 0,
        },
        q3Mass: analyte.mass + analyte.productShift,
        heFlow: 0,
        reactionFlow: 0, // Start with 0 flow
    }
}

// 6. Dynamic Store (Holds the current state)
const initialKey = '51';
const initialScenario = database[initialKey];
const initialAnalyte = initialScenario.analyte;
const initialSettings = getDefaultSettings(initialAnalyte);

export const simulatorState$ = map<SimulatorState>({
    currentScenarioKey: initialKey,
    selectedAnalyte: initialAnalyte,
    interferentList: initialScenario.interferents,
    userInterferentCounts: initialScenario.interferents.reduce((acc: Record<string, number>, i: Interferent) => {
        acc[i.name] = i.default;
        return acc;
    }, {} as Record<string, number>),
    ...initialSettings,
});


// 7. Derived Store: Triggers calculation on every state change
export const calculatedResults$ = computed(
    simulatorState$,
    ($state: SimulatorState) => {
        const { selectedAnalyte, interferentList, userInterferentCounts, q3Mass, heFlow, reactionFlow, modeSettings } = $state;

        // Q1 is implicitly the precursor mass
        const q1Mass = selectedAnalyte.mass;

        // MS Mode is when both KED (He flow) and Reaction flow are 0
        const isMSMSMode = modeSettings.mode === 'KED' || modeSettings.mode === 'Reaction';

        // --- Run the Core Calculation ---
        const result = calculateFinalSignal(
            selectedAnalyte,
            interferentList,
            userInterferentCounts,
            q1Mass,
            q3Mass,
            heFlow,
            reactionFlow,
            isMSMSMode
        );

        // --- Calculate Status ---
        const status = getStatusColor(result.analyte.finalCounts, result.totalInterfCounts);

        return {
            ...result,
            status,
        } as CalculationResults;
    }
);

// --- STATE MUTATION FUNCTIONS (Public API for Svelte components) ---

export function selectScenario(key: string) {
    const scenario = scenarios$.get()[key];

    if (scenario) {
        const analyte = scenario.analyte;
        const settings = getDefaultSettings(analyte);

        // We update all properties in one go to ensure consistency
        simulatorState$.set({
            currentScenarioKey: key,
            selectedAnalyte: analyte,
            interferentList: scenario.interferents,
            userInterferentCounts: scenario.interferents.reduce((acc: Record<string, number>, i: Interferent) => {
                acc[i.name] = i.default;
                return acc;
            }, {} as Record<string, number>),
            ...settings,
        });
    }
}

export function updateMode(mode: 'KED' | 'Reaction' | 'MS') {
    const currentAnalyte = simulatorState$.get().selectedAnalyte;

    const gas: ModeSettings['gas'] =
        mode === 'KED' ? 'He' :
            mode === 'Reaction' ? (currentAnalyte.productShift === 17.0 ? 'NH3' : 'O2') :
                'None';

    // The flows themselves are updated by the sliders, but we set the mode context
    simulatorState$.setKey('modeSettings', {
        mode: mode,
        gas: gas,
        collisionEnergy: 0,
    });
}

// These functions handle the UI inputs (sliders/fields)
export function updateQ3Mass(mass: number) {
    simulatorState$.setKey('q3Mass', mass);
}

export function updateInterferentCount(name: string, count: number) {
    const counts = simulatorState$.get().userInterferentCounts;
    simulatorState$.setKey('userInterferentCounts', { ...counts, [name]: count });
}

export function updateHeFlow(flow: number) {
    simulatorState$.setKey('heFlow', flow);
}

export function updateReactionFlow(flow: number) {
    simulatorState$.setKey('reactionFlow', flow);
}