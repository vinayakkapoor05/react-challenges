const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}
const parseMeetingTime = (meetingTime: string): { days: string[], start: number, end: number } => {
    const [days, times] = meetingTime.split(' ');
    const [start, end] = times.split('-');
    return {
        days: days.match(/(Tu|Th|M|W|F)/g) || [],
        start: convertTimeToMinutes(start),
        end: convertTimeToMinutes(end)
    };
}

export const checkTimeConflict = (c1: {term: string, meets: string}, c2: {term: string, meets: string}): boolean => {
    const m1 = parseMeetingTime(c1.meets);
    const m2 = parseMeetingTime(c2.meets);
    if (c1.term !== c2.term) {
        return false;
    }
    const doDaysOverlap = m1.days.some(day => m2.days.includes(day));
    const doTimesOverlap = m1.start < m2.end && m2.start < m1.end;
    return doDaysOverlap && doTimesOverlap;
}
