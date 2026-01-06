import { create } from "zustand";
import type { Material, ReportChange, ReportChangeKey, Unit } from "../types/types";
import type { ReportType } from "../utils/MainConstants/ReportTypes";

type State = {
    reportsChanges: ReportChange[];
};

type Action = {
    getReportChange: (reportChangekey: ReportChangeKey) => ReportChange | undefined;
    updateReportChange: (newReportChange: ReportChange) => void;
    addMaterialsChanges: (materials: Material[], units: Unit[], reportTypes: ReportType[]) => void;
}

export const useReportChangeStore = create<State & Action>((set, get) => ({
    reportsChanges: [],
    getReportChange: (reportChangeKey: ReportChangeKey) => {
        return get().reportsChanges.find(reportChange =>
            reportChange.unitId === reportChangeKey.unitId &&
            reportChange.materialId === reportChangeKey.materialId &&
            reportChange.type === reportChangeKey.type
        )
    },
    updateReportChange: (newReportChange: ReportChange) => set((state) => {
        const reportsChanges = state.reportsChanges;

        const existingReportChange = reportsChanges.find(reportChange =>
            reportChange.unitId === newReportChange.unitId &&
            reportChange.materialId === newReportChange.materialId &&
            reportChange.type === newReportChange.type
        );

        if (existingReportChange) {
            existingReportChange.quantity = newReportChange.quantity;
        } else {
            reportsChanges.push({
                ...newReportChange,
                quantity: newReportChange.quantity
            })
        }

        return { reportsChanges };
    }),
    addMaterialsChanges: (materials: Material[], units: Unit[], reportTypes: ReportType[]) => set((state) => {
        const reportsChanges = state.reportsChanges;

        materials.forEach(material => {
            reportTypes.forEach(reportType => {
                units.forEach(unit => {

                    if (!state.getReportChange({
                        materialId: material.id,
                        unitId: unit.id,
                        type: reportType
                    })) {
                        reportsChanges.push({
                            materialId: material.id,
                            unitId: unit.id,
                            type: reportType,
                            quantity: 0,
                            comment: ''
                        })
                    }
                })
            })
        })

        return { reportsChanges };
    })
}))