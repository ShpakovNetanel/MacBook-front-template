enum FORCE_LEVEL {
    MATKAL,
    PIKUD,
    UGDA,
    HATIVA,
    GDUD
};

type UNIT_LEVEL = {
    TYPES: {
        [key in keyof typeof FORCE_LEVEL]: {
            id: FORCE_LEVEL;
            text: string;
        }
    },
    textFunctions: {
        getTextById: (id: FORCE_LEVEL) => string;
        getIdByText: (text: string) => FORCE_LEVEL;
    },
    getNextLevel: (currentLevel: FORCE_LEVEL) => FORCE_LEVEL | null;
    isUnitChangeAllowed: (currentLevel: FORCE_LEVEL) => boolean;
};

export const UNIT_LEVELS: UNIT_LEVEL = {
    TYPES: {
        MATKAL: { id: FORCE_LEVEL.MATKAL, text: 'מטכ"ל' },
        PIKUD: { id: FORCE_LEVEL.PIKUD, text: 'פיקוד' },
        UGDA: { id: FORCE_LEVEL.UGDA, text: 'אוגדה' },
        HATIVA: { id: FORCE_LEVEL.HATIVA, text: 'חטיבה' },
        GDUD: { id: FORCE_LEVEL.GDUD, text: 'גדוד' },
    },
    textFunctions: {
        getTextById: (id: FORCE_LEVEL) => {
            return Object.values(UNIT_LEVELS.TYPES).find(type => type.id === id)?.text ?? '';
        },
        getIdByText: (text: string) => {
            return Object.values(UNIT_LEVELS.TYPES).find(type => type.text === text)?.id ?? 0;
        },
    },
    getNextLevel: (currentLevel: FORCE_LEVEL) => {
        const levels: FORCE_LEVEL[] = Object.values(FORCE_LEVEL).filter(v => typeof v === 'number') as FORCE_LEVEL[];
        const currentIndex = levels.indexOf(currentLevel);

        if (currentIndex < levels.length - 1) {
            return levels[currentIndex + 1];
        }

        return null;
    },
    isUnitChangeAllowed: (currentLevel: FORCE_LEVEL) => {
        return [FORCE_LEVEL.MATKAL, FORCE_LEVEL.PIKUD, FORCE_LEVEL.UGDA].includes(currentLevel);
    }
};