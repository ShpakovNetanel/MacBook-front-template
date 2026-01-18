import type { ReportType } from "../utils/MainConstants/ReportTypes";

export type ReportStatus = 'Active' | 'Disabled'
export type Direction = 'left' | 'right' | 'top' | 'bottom';

export type Material = {
    id: string;
    description: string;
    multiply: number;
    nickname: string;
    category: string;
    unitOfMeasure: string;
}

export type ReportChangeKey = {
    unitId: Unit["id"];
    materialId: Material["id"];
    type: ReportType;
}

export type ReportChange = ReportChangeKey & ({
    status: ReportStatus;
    quantity?: number;
    comment?: string;
});

export type UnitStatus = {
    id: number;
    description: string;
    visibility: 'hidden' | 'visible'
}

export type Unit = {
    id: number;
    description: string;
    level: number;
    simul: string;
    parent?: Unit | null;
    status: UnitStatus;
};

export type ReportItemType = {
    id: ReportType;
    quantity: number;
    comment: string;
    status: ReportStatus;
}

export type ReportItem = {
    unit: Unit;
    types: ReportItemType[];
}

export type Report = {
    material: Material;
    comment: string;
    allocatedQuantity: null | number;
    items: ReportItem[];
}
