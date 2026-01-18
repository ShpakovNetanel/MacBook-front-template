import type { Unit } from "../types/types";
import { useUnitOverridesStore } from "../zustand/unitOverrides";

const BASE_UNITS: Unit[] = [
    // ===== ROOT =====
    {
        id: 0,
        description: "מטכ״ל",
        level: 0,
        simul: "0000",
        parent: null,
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== LEVEL 1 (פיקודים) =====
    {
        id: 1,
        description: "פיקוד צפון",
        level: 1,
        simul: "0001",
        parent: {
            id: 0,
            description: "מטכ״ל",
            level: 0,
            simul: "0000",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 2,
        description: "פיקוד מרכז",
        level: 1,
        simul: "0002",
        parent: {
            id: 0,
            description: "מטכ״ל",
            level: 0,
            simul: "0000",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 3,
        description: "פיקוד דרום",
        level: 1,
        simul: "0003",
        parent: {
            id: 0,
            description: "מטכ״ל",
            level: 0,
            simul: "0000",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 4,
        description: "פיקוד העורף",
        level: 1,
        simul: "0004",
        parent: {
            id: 0,
            description: "מטכ״ל",
            level: 0,
            simul: "0000",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== LEVEL 2 (אוגדות) =====
    {
        id: 11,
        description: "אוגדה 11",
        level: 2,
        simul: "0011",
        parent: {
            id: 1,
            description: "פיקוד צפון",
            level: 1,
            simul: "0001",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 12,
        description: "אוגדה 12",
        level: 2,
        simul: "0012",
        parent: {
            id: 1,
            description: "פיקוד צפון",
            level: 1,
            simul: "0001",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 21,
        description: "אוגדה 21",
        level: 2,
        simul: "0021",
        parent: {
            id: 2,
            description: "פיקוד מרכז",
            level: 1,
            simul: "0002",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 22,
        description: "אוגדה 22",
        level: 2,
        simul: "0022",
        parent: {
            id: 2,
            description: "פיקוד מרכז",
            level: 1,
            simul: "0002",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 31,
        description: "אוגדה 31",
        level: 2,
        simul: "0031",
        parent: {
            id: 3,
            description: "פיקוד דרום",
            level: 1,
            simul: "0003",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 32,
        description: "אוגדה 32",
        level: 2,
        simul: "0032",
        parent: {
            id: 3,
            description: "פיקוד דרום",
            level: 1,
            simul: "0003",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== LEVEL 3 (חטיבות) - NORTH =====
    {
        id: 111,
        description: "חטיבה 111",
        level: 3,
        simul: "0111",
        parent: {
            id: 11,
            description: "אוגדה 11",
            level: 2,
            simul: "0011",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 112,
        description: "חטיבה 112",
        level: 3,
        simul: "0112",
        parent: {
            id: 11,
            description: "אוגדה 11",
            level: 2,
            simul: "0011",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 121,
        description: "חטיבה 121",
        level: 3,
        simul: "0121",
        parent: {
            id: 12,
            description: "אוגדה 12",
            level: 2,
            simul: "0012",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 122,
        description: "חטיבה 122",
        level: 3,
        simul: "0122",
        parent: {
            id: 12,
            description: "אוגדה 12",
            level: 2,
            simul: "0012",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== LEVEL 3 (חטיבות) - CENTER =====
    {
        id: 211,
        description: "חטיבה 211",
        level: 3,
        simul: "0211",
        parent: {
            id: 21,
            description: "אוגדה 21",
            level: 2,
            simul: "0021",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 212,
        description: "חטיבה 212",
        level: 3,
        simul: "0212",
        parent: {
            id: 21,
            description: "אוגדה 21",
            level: 2,
            simul: "0021",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 221,
        description: "חטיבה 221",
        level: 3,
        simul: "0221",
        parent: {
            id: 22,
            description: "אוגדה 22",
            level: 2,
            simul: "0022",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 222,
        description: "חטיבה 222",
        level: 3,
        simul: "0222",
        parent: {
            id: 22,
            description: "אוגדה 22",
            level: 2,
            simul: "0022",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== LEVEL 3 (חטיבות) - SOUTH =====
    {
        id: 311,
        description: "חטיבה 311",
        level: 3,
        simul: "0311",
        parent: {
            id: 31,
            description: "אוגדה 31",
            level: 2,
            simul: "0031",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 312,
        description: "חטיבה 312",
        level: 3,
        simul: "0312",
        parent: {
            id: 31,
            description: "אוגדה 31",
            level: 2,
            simul: "0031",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 321,
        description: "חטיבה 321",
        level: 3,
        simul: "0321",
        parent: {
            id: 32,
            description: "אוגדה 32",
            level: 2,
            simul: "0032",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 322,
        description: "חטיבה 322",
        level: 3,
        simul: "0322",
        parent: {
            id: 32,
            description: "אוגדה 32",
            level: 2,
            simul: "0032",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== LEVEL 4 (גדודים) - NORTH =====
    {
        id: 1111,
        description: "גדוד 1111",
        level: 4,
        simul: "1111",
        parent: {
            id: 111,
            description: "חטיבה 111",
            level: 3,
            simul: "0111",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 1112,
        description: "גדוד 1112",
        level: 4,
        simul: "1112",
        parent: {
            id: 111,
            description: "חטיבה 111",
            level: 3,
            simul: "0111",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 1121,
        description: "גדוד 1121",
        level: 4,
        simul: "1121",
        parent: {
            id: 112,
            description: "חטיבה 112",
            level: 3,
            simul: "0112",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 1122,
        description: "גדוד 1122",
        level: 4,
        simul: "1122",
        parent: {
            id: 112,
            description: "חטיבה 112",
            level: 3,
            simul: "0112",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 1211,
        description: "גדוד 1211",
        level: 4,
        simul: "1211",
        parent: {
            id: 121,
            description: "חטיבה 121",
            level: 3,
            simul: "0121",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 1212,
        description: "גדוד 1212",
        level: 4,
        simul: "1212",
        parent: {
            id: 121,
            description: "חטיבה 121",
            level: 3,
            simul: "0121",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 1221,
        description: "גדוד 1221",
        level: 4,
        simul: "1221",
        parent: {
            id: 122,
            description: "חטיבה 122",
            level: 3,
            simul: "0122",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 1222,
        description: "גדוד 1222",
        level: 4,
        simul: "1222",
        parent: {
            id: 122,
            description: "חטיבה 122",
            level: 3,
            simul: "0122",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== LEVEL 4 (גדודים) - CENTER =====
    {
        id: 2111,
        description: "גדוד 2111",
        level: 4,
        simul: "2111",
        parent: {
            id: 211,
            description: "חטיבה 211",
            level: 3,
            simul: "0211",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 2112,
        description: "גדוד 2112",
        level: 4,
        simul: "2112",
        parent: {
            id: 211,
            description: "חטיבה 211",
            level: 3,
            simul: "0211",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 2121,
        description: "גדוד 2121",
        level: 4,
        simul: "2121",
        parent: {
            id: 212,
            description: "חטיבה 212",
            level: 3,
            simul: "0212",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 2122,
        description: "גדוד 2122",
        level: 4,
        simul: "2122",
        parent: {
            id: 212,
            description: "חטיבה 212",
            level: 3,
            simul: "0212",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 2211,
        description: "גדוד 2211",
        level: 4,
        simul: "2211",
        parent: {
            id: 221,
            description: "חטיבה 221",
            level: 3,
            simul: "0221",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 2212,
        description: "גדוד 2212",
        level: 4,
        simul: "2212",
        parent: {
            id: 221,
            description: "חטיבה 221",
            level: 3,
            simul: "0221",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 2221,
        description: "גדוד 2221",
        level: 4,
        simul: "2221",
        parent: {
            id: 222,
            description: "חטיבה 222",
            level: 3,
            simul: "0222",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 2222,
        description: "גדוד 2222",
        level: 4,
        simul: "2222",
        parent: {
            id: 222,
            description: "חטיבה 222",
            level: 3,
            simul: "0222",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== LEVEL 4 (גדודים) - SOUTH =====
    {
        id: 3111,
        description: "גדוד 3111",
        level: 4,
        simul: "3111",
        parent: {
            id: 311,
            description: "חטיבה 311",
            level: 3,
            simul: "0311",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 3112,
        description: "גדוד 3112",
        level: 4,
        simul: "3112",
        parent: {
            id: 311,
            description: "חטיבה 311",
            level: 3,
            simul: "0311",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 3121,
        description: "גדוד 3121",
        level: 4,
        simul: "3121",
        parent: {
            id: 312,
            description: "חטיבה 312",
            level: 3,
            simul: "0312",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 3122,
        description: "גדוד 3122",
        level: 4,
        simul: "3122",
        parent: {
            id: 312,
            description: "חטיבה 312",
            level: 3,
            simul: "0312",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 3211,
        description: "גדוד 3211",
        level: 4,
        simul: "3211",
        parent: {
            id: 321,
            description: "חטיבה 321",
            level: 3,
            simul: "0321",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 3212,
        description: "גדוד 3212",
        level: 4,
        simul: "3212",
        parent: {
            id: 321,
            description: "חטיבה 321",
            level: 3,
            simul: "0321",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 3221,
        description: "גדוד 3221",
        level: 4,
        simul: "3221",
        parent: {
            id: 322,
            description: "חטיבה 322",
            level: 3,
            simul: "0322",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 3222,
        description: "גדוד 3222",
        level: 4,
        simul: "3222",
        parent: {
            id: 322,
            description: "חטיבה 322",
            level: 3,
            simul: "0322",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ============================================================
    // EXTRA GENERATED UNITS (as requested):
    // - some with children, some without
    // - some without parents
    // ============================================================

    // ===== Orphan level 1 (no parent) =====
    {
        id: 50,
        description: "זרוע הים",
        level: 1,
        simul: "0050",
        parent: null,
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 60,
        description: "זרוע האוויר",
        level: 1,
        simul: "0060",
        parent: null,
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== Level 2 under זרוע הים (with children later) =====
    {
        id: 501,
        description: "שייטת 501",
        level: 2,
        simul: "0501",
        parent: {
            id: 50,
            description: "זרוע הים",
            level: 1,
            simul: "0050",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    // ===== Level 2 orphan (no parent) =====
    {
        id: 701,
        description: "יחידה עצמאית 701",
        level: 2,
        simul: "0701",
        parent: null,
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== Level 3 under שייטת 501 (some with children, some without) =====
    {
        id: 5011,
        description: "פלגה 5011",
        level: 3,
        simul: "5011",
        parent: {
            id: 501,
            description: "שייטת 501",
            level: 2,
            simul: "0501",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 5012,
        description: "פלגה 5012",
        level: 3,
        simul: "5012",
        parent: {
            id: 501,
            description: "שייטת 501",
            level: 2,
            simul: "0501",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== Level 4 under פלגה 5011 (children exist) =====
    {
        id: 50111,
        description: "צוות 50111",
        level: 4,
        simul: "5111",
        parent: {
            id: 5011,
            description: "פלגה 5011",
            level: 3,
            simul: "5011",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== Level 3 orphan (no parent) =====
    {
        id: 9001,
        description: "חטיבה עצמאית 9001",
        level: 3,
        simul: "9001",
        parent: null,
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== Level 4 under orphan level 3 (so orphan has children) =====
    {
        id: 90011,
        description: "גדוד 90011",
        level: 4,
        simul: "9011",
        parent: {
            id: 9001,
            description: "חטיבה עצמאית 9001",
            level: 3,
            simul: "9001",
            parent: null,
            status: { id: 0, description: "בדיווח", visibility: "visible" }
        },
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },

    // ===== Leaf nodes: some without children =====
    {
        id: 8888,
        description: "גדוד עצמאי 8888",
        level: 4,
        simul: "8888",
        parent: null,
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    },
    {
        id: 777,
        description: "אוגדה ללא ילדים 777",
        level: 2,
        simul: "0777",
        parent: null,
        status: { id: 0, description: "בדיווח", visibility: "visible" }
    }
];

export const useFetchUnits = (): Unit[] => {
    const { visibilityById, statusById, deletedById } = useUnitOverridesStore();

    return BASE_UNITS
        .filter((unit) => !deletedById[unit.id])
        .map((unit) => {
            const nextVisibility = visibilityById[unit.id] ?? unit.status.visibility;
            const nextStatusId = statusById[unit.id] ?? unit.status.id;
            if (nextVisibility === unit.status.visibility && nextStatusId === unit.status.id) {
                return unit;
            }
            return {
                ...unit,
                status: {
                    ...unit.status,
                    visibility: nextVisibility,
                    id: nextStatusId
                }
            };
        });
};
