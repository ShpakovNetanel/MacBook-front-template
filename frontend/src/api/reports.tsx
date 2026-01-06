import type { Report } from "../types/types";
import { useFetchMaterials } from "./materials";
import { useFetchUnits } from "./units";

export const useFetchReports = (): Report[] => {
    const materials = useFetchMaterials().slice(0, 8);

    const units = useFetchUnits();

    const reports = materials.map((material, index) => ({
        material,
        items: units.map(unit => ({
            unit,
            types: [0, 1, 2, 3].map(reportType => ({
                id: reportType,
                comment: unit.description,
                quantity: unit.id === 1 ? 0 : Number((Math.random() * 10000 + 1).toFixed(2))
            }))
        })),
        comment: `${material.nickname} - ${index}`
    }))

    return reports
}