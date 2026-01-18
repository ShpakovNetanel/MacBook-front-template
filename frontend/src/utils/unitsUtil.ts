import type { Unit } from "../types/types";
import { UNIT_STATUSES } from "./MainConstants/UnitStatuses";

export const getUnit = (unitId: number, units: Unit[]) =>
    units.find(unit => unit.id === unitId)

export const getRelatedUnits = (unitId: number, units: Unit[]) =>
    units.filter(unit => unit?.parent?.id === unitId)

export const getLockedRelatedUnits = (unitId: number, units: Unit[]) =>
    getRelatedUnits(unitId, units).filter(unit =>
        unit.status.id === UNIT_STATUSES.WAITING_FOR_ALLOCATION.id
    )