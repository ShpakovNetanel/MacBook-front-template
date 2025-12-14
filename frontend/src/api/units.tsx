import type { Unit } from "../types/types";

export const useFetchUnits = (): Unit[] => {
    return [{
        description: 'פיקוד דרום',
        id: 3898,
        level: 1,
        simul: '23'
    }, {
        description: 'פיקוד צפון',
        id: 1596,
        level: 1,
        simul: '21'
    },
    {
        description: 'פיקוד מרכז',
        id: 883,
        level: 1,
        simul: '22'
    }]
}