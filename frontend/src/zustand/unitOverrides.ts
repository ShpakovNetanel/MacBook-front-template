import { create } from 'zustand';

export type UnitVisibility = 'visible' | 'hidden';

type UnitOverridesState = {
    visibilityById: Record<number, UnitVisibility>;
    statusById: Record<number, number>;
    deletedById: Record<number, boolean>;
};

type UnitOverridesActions = {
    setVisibility: (unitId: number, visibility: UnitVisibility) => void;
    setStatus: (unitId: number, statusId: number) => void;
    deleteUnit: (unitId: number) => void;
};

export const useUnitOverridesStore = create<UnitOverridesState & UnitOverridesActions>((set) => ({
    visibilityById: {},
    statusById: {},
    deletedById: {},
    setVisibility: (unitId, visibility) => set((state) => ({
        visibilityById: {
            ...state.visibilityById,
            [unitId]: visibility
        }
    })),
    setStatus: (unitId, statusId) => set((state) => ({
        statusById: {
            ...state.statusById,
            [unitId]: statusId
        }
    })),
    deleteUnit: (unitId) => set((state) => ({
        deletedById: {
            ...state.deletedById,
            [unitId]: true
        }
    }))
}));
