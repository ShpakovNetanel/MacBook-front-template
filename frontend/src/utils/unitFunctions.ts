export const unitLevelToString = (level: number) => {
    switch (level) {
        case 1:
            return 'פיקוד'
        case 2:
            return 'אוגדה'
        case 3:
            return 'חטיבה'
        case 4:
            return 'גדוד'
        case 0:
            return 'מטכ״ל'
        default:
            return 'גדוד'
    }
}