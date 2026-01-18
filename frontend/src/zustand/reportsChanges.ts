import { isEmpty, isNull, isUndefined } from "lodash";
import { create } from "zustand";
import type { Material, ReportChange, ReportChangeKey, ReportItem, ReportStatus, Unit } from "../types/types";
import type { ReportType } from "../utils/MainConstants/ReportTypes";
import { getRelatedUnits, getUnit } from "../utils/unitsUtil";

type State = {
    reportsChanges: ReportChange[];
};

type Action = {
    getReportChange: (reportChangekey: ReportChangeKey) => ReportChange | undefined;
    updateReportChange: (newReportChange: ReportChange) => void;
    addMaterialsChanges: (materials: Material[], units: Unit[], reportTypes: ReportType[]) => void;
    setMaterialsStatus: (materials: Material[], units: Unit[], reportTypes: ReportType[], status: ReportStatus) => void;
    aggregateQuantity: (newReportChange: ReportChange, screenUnit: Unit, units: Unit[], reportItems: ReportItem[]) => void;
};

const findReportChange = (reportsChanges: ReportChange[], reportChangeKey: ReportChangeKey) => {
    return reportsChanges.find(reportChange =>
        reportChange.unitId === reportChangeKey.unitId &&
        reportChange.materialId === reportChangeKey.materialId &&
        reportChange.type === reportChangeKey.type
    );
};

const upsertReportChange = (
    reportsChanges: ReportChange[],
    newReportChange: ReportChange
) => {
    const existingReportChange = reportsChanges.find(reportChange =>
        reportChange.type === newReportChange.type &&
        reportChange.materialId === newReportChange.materialId &&
        reportChange.unitId === newReportChange.unitId
    );

    if (existingReportChange) {
        if (!isUndefined(newReportChange.quantity)) {
            existingReportChange.quantity = newReportChange.quantity;
        }
        if (!isUndefined(newReportChange.comment)) {
            existingReportChange.comment = newReportChange.comment;
        }
        existingReportChange.status = newReportChange.status;
    } else {
        reportsChanges.push({ ...newReportChange });
    }
};

const getUnitQuantity = (relatedUnits: Unit[], reportItems: ReportItem[],
    unitReportChange: ReportChange, reportsChanges: ReportChange[]
) => {
    let unitQuantity = 0;

    relatedUnits.forEach(relatedUnit => {
        const childReportItem = reportItems.find(reportItem =>
            reportItem.unit.id === relatedUnit.id
        )?.types.find(type =>
            type.id === unitReportChange.type && type.status === 'Active'
        )

        unitQuantity += reportsChanges.find(reportChange =>
            reportChange.unitId === relatedUnit.id &&
            reportChange.materialId === unitReportChange.materialId &&
            reportChange.type === unitReportChange.type &&
            reportChange.status === 'Active'
        )?.quantity
            ?? childReportItem?.quantity
            ?? 0
    });

    return unitQuantity;
}

const modifyHierarchyReport = (
    reportsChanges: ReportChange[],
    reportChangeToModify: ReportChange,
    screenUnit: Unit,
    reportItems: ReportItem[],
    units: Unit[]
): ReportChange[] => {
    const reportChangeUnit = getUnit(reportChangeToModify.unitId, units);
    const relatedUnits = getRelatedUnits(reportChangeToModify.unitId, units);

    if (isNull(reportChangeUnit?.id) || reportChangeUnit.id === screenUnit.id)
        return reportsChanges;

    const unitReportChange = reportsChanges.find(reportChange =>
        reportChange.unitId === reportChangeToModify.unitId &&
        reportChange.type === reportChangeToModify.type &&
        reportChange.materialId === reportChangeToModify.materialId)

    if (unitReportChange) {
        if (isEmpty(relatedUnits)) {
            unitReportChange.quantity = reportChangeToModify.quantity!
        } else {
            unitReportChange.quantity = getUnitQuantity(relatedUnits, reportItems,
                reportChangeToModify, reportsChanges);
        }
    } else {
        if (isEmpty(relatedUnits)) {
            reportsChanges.push(reportChangeToModify)
        } else {
            let unitQuantity = getUnitQuantity(relatedUnits, reportItems,
                reportChangeToModify, reportsChanges);

            if (!isNull(unitQuantity))
                reportsChanges.push({
                    ...reportChangeToModify,
                    quantity: unitQuantity
                })
        }
    }

    const upperUnitReportChange = {
        ...reportChangeToModify,
        unitId: reportChangeUnit.parent!.id
    };

    return modifyHierarchyReport(reportsChanges,
        upperUnitReportChange,
        screenUnit,
        reportItems,
        units
    )
};

export const useReportChangeStore = create<State & Action>((set, get) => ({
    reportsChanges: [],
    getReportChange: (reportChangeKey: ReportChangeKey) => {
        return findReportChange(get().reportsChanges, reportChangeKey);
    },
    updateReportChange: (newReportChange: ReportChange) => set((state) => {
        const reportsChanges = state.reportsChanges;
        upsertReportChange(reportsChanges, newReportChange);

        return { reportsChanges: [...reportsChanges] };
    }),
    addMaterialsChanges: (materials: Material[], units: Unit[], reportTypes: ReportType[]) => set((state) => {
        const reportsChanges = state.reportsChanges;

        materials.forEach(material => {
            reportTypes.forEach(reportType => {
                units.forEach(unit => {
                    const existingChange = state.getReportChange({
                        materialId: material.id,
                        unitId: unit.id,
                        type: reportType
                    });

                    if (existingChange) {
                        existingChange.status = "Active";
                    } else {
                        reportsChanges.push({
                            materialId: material.id,
                            unitId: unit.id,
                            type: reportType,
                            quantity: 0,
                            comment: '',
                            status: "Active"
                        });
                    }
                })
            })
        })

        return { reportsChanges: [...reportsChanges] };
    }),
    setMaterialsStatus: (materials, units, reportTypes, status) => set((state) => {
        const reportsChanges = state.reportsChanges;

        materials.forEach(material => {
            reportTypes.forEach(reportType => {
                reportsChanges.forEach(change => {
                    if (change.materialId === material.id && change.type === reportType) {
                        change.status = status;
                    }
                });
                units.forEach(unit => {
                    upsertReportChange(reportsChanges, {
                        materialId: material.id,
                        unitId: unit.id,
                        type: reportType,
                        status
                    });
                });
            });
        });

        return { reportsChanges: [...reportsChanges] };
    }),
    aggregateQuantity: (newReportChange, screenUnit, units, reportItems) => set((state) => {
        const reportsChanges = state.reportsChanges;

        modifyHierarchyReport(
            reportsChanges,
            newReportChange,
            screenUnit,
            reportItems,
            units
        );

        return { reportsChanges: [...reportsChanges] };
    })
})) 
