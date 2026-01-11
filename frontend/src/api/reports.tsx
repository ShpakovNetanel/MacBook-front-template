import type { Report } from "../types/types";
import { useFetchMaterials } from "./materials";
import { useFetchUnits } from "./units";

const randomWithStep = (
  min: number,
  max: number,
  step: number
): number => {
  const steps = Math.floor((max - min) / step);
  const randomStep = Math.floor(Math.random() * (steps + 1));
  return min + randomStep * step;
};

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
        quantity: unit.id === 1 ? 0 : randomWithStep(0, 9999999, material.multiply)
      }))
    })),
    allocatedQuantity: null,
    comment: `${material.nickname} - ${index}`
  }))

  return reports
}