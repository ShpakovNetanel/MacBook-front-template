import { FORCE_TYPES } from "./ForceLevels";

export enum ReportType {
    REQUISITION,
    INVENTORY,
    USAGE,
    ALLOCATION
}

export type ReportTypes = {
    TYPES: {
        [key in keyof typeof ReportType]: {
            id: ReportType;
            text: string;
            seqNumber: number | null;
            colors: {
                primary: string;
                secondary: string;
            }
        }
    },
    textFunctions: {
        getTextById: (id: ReportType) => string;
        getIdByText: (text: string) => ReportType;
    },
    colorsFunctions: {
        getPrimary: (id: ReportType) => string;
        getSecondary: (id: ReportType) => string;
    }
}

export const REPORT_TYPES: ReportTypes = {
    TYPES: {
        REQUISITION: {
            id: 0,
            text: 'דרישות',
            seqNumber: 3,
            colors: {
                primary: '#7BAFFF',
                secondary: '#CCE0FF'
            }
        },
        INVENTORY: {
            id: 1,
            text: 'מלאי',
            seqNumber: 2,
            colors: {
                primary: '#60D6FF',
                secondary: '#A3E7FF'
            }
        },
        USAGE: {
            id: 2,
            text: 'שצ״ל',
            seqNumber: 1,
            colors: {
                primary: '#03C9B5',
                secondary: '#ACFDF4'
            }
        },
        ALLOCATION: {
            id: 3,
            text: 'הקצאות',
            seqNumber: 4,
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
    }
}