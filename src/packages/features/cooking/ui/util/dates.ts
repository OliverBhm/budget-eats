export function generateDatesOfOneWeek(weekOffset: number = 0): Date[] {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);

    const offset = 7 * weekOffset
    return Array.from({length: 7}, ((v, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i + offset)
        return date;
    }))

}