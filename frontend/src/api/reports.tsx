import type { Report, ReportItemType } from "../types/types"
import { useFetchMaterials } from "./materials";
import { useFetchUnits } from "./units";

const defaultItems: ReportItemType[] = [
    { id: 0, quantity: 1, comment: 'דרישות' },
    { id: 1, quantity: 1, comment: 'מלאי' },
    { id: 2, quantity: 1, comment: 'שצל' },
    { id: 3, quantity: 1, comment: 'הקצאות' },
];

export const useFetchReports = (): Report[] => {
    const materials = useFetchMaterials();
    const units = useFetchUnits();

    return materials.flatMap((material, index) => ({
        material,
        items: units.map(unit => ({
            unit,
            types: [0, 1, 2, 3].map(reportType => ({
                id: reportType,
                comment: unit.description,
                quantity: Number((Math.random() * 10000 + 1).toFixed(2))
            }))
        })),
        comment: `${material.nickname} - ${index}`
    }))
}