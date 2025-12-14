export type Direction = 'left' | 'right' | 'top' | 'bottom';

export type Material = {
    id: string;
    description: string;
    multiply: number;
    nickname: string;
    category: string;
    unitOfMeasure: string;
}

export type Unit = {
    id: number;
    description: string;
    level: number;
    simul: string;
};