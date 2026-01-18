// constants/unitStatuses.ts

export const UNIT_STATUSES = {
  REQUESTING: {
    id: 0,
    description: "דורש",
  },
  WAITING_FOR_ALLOCATION: {
    id: 1,
    description: "ממתין להקצאה",
  },
  ALLOCATING: {
    id: 2,
    description: "הקצאה",
  },
  DONE: {
    id: 3,
    description: "סיים תהליך",
  },
} as const;

export type UnitStatusKey = keyof typeof UNIT_STATUSES;
export type UnitStatus = (typeof UNIT_STATUSES)[UnitStatusKey];
export type UnitStatusId = UnitStatus["id"];

// Typed “generated” groups (derive ids from the object)
export const WORKING_STATUS_IDS = [
  UNIT_STATUSES.ALLOCATING.id,
  UNIT_STATUSES.REQUESTING.id,
] as const satisfies readonly UnitStatusId[];

export const LOCKED_STATUS_IDS = [
  UNIT_STATUSES.DONE.id,
  UNIT_STATUSES.WAITING_FOR_ALLOCATION.id,
] as const satisfies readonly UnitStatusId[];

export const getWorkingStatuses = (): UnitStatusId[] => [...WORKING_STATUS_IDS];
export const getLockedStatuses = (): UnitStatusId[] => [...LOCKED_STATUS_IDS];

// Keep the same logic you had, but typed
// export const isUnitAllocating = (status: UnitStatusId): boolean => {
//   return [UNIT_STATUSES.ALLOCATING.id, UNIT_STATUSES.DONE.id].includes(status);
// };

export const UNIT_STATUS_BY_ID: Record<UnitStatusId, UnitStatus> = {
  [UNIT_STATUSES.REQUESTING.id]: UNIT_STATUSES.REQUESTING,
  [UNIT_STATUSES.WAITING_FOR_ALLOCATION.id]: UNIT_STATUSES.WAITING_FOR_ALLOCATION,
  [UNIT_STATUSES.ALLOCATING.id]: UNIT_STATUSES.ALLOCATING,
  [UNIT_STATUSES.DONE.id]: UNIT_STATUSES.DONE,
} as const;

export const getUnitStatus = (id: UnitStatusId) => UNIT_STATUS_BY_ID[id];