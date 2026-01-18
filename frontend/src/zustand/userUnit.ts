import { create } from "zustand";
import type { Unit } from "../types/types";

type State = {
    screenUnit: Unit;
    rootUnit: Unit;
};

type Action = {
    updateScreenUnit: (unit: Unit) => void;
    updateRootUnit: (unit: Unit) => void;
}

export const useUnitStore = create<State & Action>((set) => ({
    rootUnit: { id: 0, description: "מטכ״ל", level: 0, simul: "0000", parent: null, status: { id: 0, description: "בדיווח", visibility: "visible" } },
    screenUnit: { id: 0, description: "מטכ״ל", level: 0, simul: "0000", parent: null, status: { id: 0, description: "בדיווח", visibility: "visible" } },
    updateScreenUnit: (unit: Unit) => set(() => ({ screenUnit: unit })),
    updateRootUnit: (unit: Unit) => set(() => ({ rootUnit: unit })),
}))
