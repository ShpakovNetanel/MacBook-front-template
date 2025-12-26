import type { Material } from "../types/types"

export const useFetchMaterials = (): Material[] => {
    return [
        {
            description: 'כדור 5.56 מ״מ',
            id: '10000001',
            multiply: 1,
            nickname: 'תחמושת רובה',
            unitOfMeasure: 'יח',
            category: 'תחמושת קלה'
        },
        {
            description: 'כדור 7.62 מ״מ',
            id: '10000002',
            multiply: 1,
            nickname: 'תחמושת מקלע',
            unitOfMeasure: 'יח',
            category: 'תחמושת קלה'
        },
        {
            description: 'כדור 9 מ״מ',
            id: '10000003',
            multiply: 1,
            nickname: 'תחמושת אקדח',
            unitOfMeasure: 'יח',
            category: 'תחמושת קלה'
        },
        {
            description: 'מחסנית 5.56',
            id: '10000004',
            multiply: 3,
            nickname: 'מחסנית רובה',
            unitOfMeasure: 'יח',
            category: 'ציוד לחימה'
        },
        {
            description: 'מחסנית 9 מ״מ',
            id: '10000005',
            multiply: 3,
            nickname: 'מחסנית אקדח',
            unitOfMeasure: 'יח',
            category: 'ציוד לחימה'
        },
        {
            description: 'רימון הלם',
            id: '10000006',
            multiply: 2,
            nickname: 'הלם',
            unitOfMeasure: 'יח',
            category: 'אמצעי לחימה'
        },
        {
            description: 'רימון עשן לבן',
            id: '10000007',
            multiply: 2,
            nickname: 'עשן',
            unitOfMeasure: 'יח',
            category: 'אמצעי סימון'
        },
        {
            description: 'רימון עשן צבעוני',
            id: '10000008',
            multiply: 2,
            nickname: 'עשן צבע',
            unitOfMeasure: 'יח',
            category: 'אמצעי סימון'
        },
        {
            description: 'פצצת תאורה',
            id: '10000009',
            multiply: 1,
            nickname: 'תאורה',
            unitOfMeasure: 'יח',
            category: 'אמצעי סימון'
        },
        {
            description: 'מוקש אימונים',
            id: '10000010',
            multiply: 1,
            nickname: 'אימון',
            unitOfMeasure: 'יח',
            category: 'אימונים'
        },

        ...Array.from({ length: 30 }, (_, i) => ({
            description: `כדור אימונים ${i + 1}`,
            id: `200000${i + 1}`,
            multiply: 10,
            nickname: 'תחמושת אימון',
            unitOfMeasure: 'יח',
            category: 'אימונים'
        })),

        ...Array.from({ length: 20 }, (_, i) => ({
            description: `רימון עשן טקטי ${i + 1}`,
            id: `300000${i + 1}`,
            multiply: 2,
            nickname: 'עשן טקטי',
            unitOfMeasure: 'יח',
            category: 'אמצעי סימון'
        })),

        ...Array.from({ length: 20 }, (_, i) => ({
            description: `פגז אימונים ${i + 1}`,
            id: `400000${i + 1}`,
            multiply: 1,
            nickname: 'פגז אימון',
            unitOfMeasure: 'יח',
            category: 'תחמושת כבדה'
        })),

        ...Array.from({ length: 920 }, (_, i) => ({
            description: `אביזר נשק ${i + 1}`,
            id: `500000${i + 1}`,
            multiply: 1,
            nickname: 'אביזר',
            unitOfMeasure: 'יח',
            category: 'ציוד לחימה'
        }))
    ];
}