export enum ReportType {
    REQUISITION,
    INVENTORY,
    USAGE,
    ALLOCATION
}

type ReportTypeKeys = {
    id: ReportType;
    text: string;
    seqNumber: number;
    colors: {
        primary: string;
        secondary: string;
    }
}

export type ReportTypes = {
    TYPES: {
        [key in keyof typeof ReportType]: ReportTypeKeys
    },
    textFunctions: {
        getTextById: (id: ReportType) => string;
        getIdByText: (text: string) => ReportType;
    },
    colorsFunctions: {
        getPrimary: (id: ReportType) => string;
        getSecondary: (id: ReportType) => string;
    },
    getFunctions: {
        getSeqNumber: (reportType: ReportType) => number;
        getTypes: () => ReportTypeKeys[];
        getTypesWithMaterials: () => ReportType[];
    }
}

export const REPORT_TYPES: ReportTypes = {
    TYPES: {
        REQUISITION: {
            id: 0,
            text: 'דרישות',
            seqNumber: 2,
            colors: {
                primary: '#7BAFFF',
                secondary: '#CCE0FF'
            }
        },
        INVENTORY: {
            id: 1,
            text: 'מלאי',
            seqNumber: 1,
            colors: {
                primary: '#60D6FF',
                secondary: '#A3E7FF'
            }
        },
        USAGE: {
            id: 2,
            text: 'שצ״ל',
            seqNumber: 0,
            colors: {
                primary: '#03C9B5',
                secondary: '#ACFDF4'
            }
        },
        ALLOCATION: {
            id: 3,
            text: 'הקצאות',
            seqNumber: 3,
            colors: {
                primary: '#d580ff',
                secondary: '#e6b3ff'
            }
        }
    },
    colorsFunctions: {
        getPrimary: (id: ReportType) => Object.values(REPORT_TYPES.TYPES).find(reportType => reportType.id === id)?.colors?.primary ?? '',
        getSecondary: (id: ReportType) => Object.values(REPORT_TYPES.TYPES).find(reportType => reportType.id === id)?.colors?.secondary ?? ''
    },
    textFunctions: {
        getIdByText: (text: string) => Object.values(REPORT_TYPES.TYPES).find(reportType => reportType.text === text)?.id ?? 0,
        getTextById: (id: ReportType) => Object.values(REPORT_TYPES.TYPES).find(reportType => reportType.id === id)?.text ?? ''
    },
    getFunctions: {
        getSeqNumber: (reportTypeId: ReportType) => Object.values(REPORT_TYPES.TYPES).find(reportType => reportType.id === reportTypeId)?.seqNumber ?? 0,
        getTypes: () => Object.values(REPORT_TYPES.TYPES).sort((a, b) => a.seqNumber - b.seqNumber),
        getTypesWithMaterials: () => [REPORT_TYPES.TYPES.USAGE.id, REPORT_TYPES.TYPES.INVENTORY.id, REPORT_TYPES.TYPES.REQUISITION.id]
    }
}