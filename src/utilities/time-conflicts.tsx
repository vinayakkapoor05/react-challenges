const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}
export const parseMeetingTime = (meetingTime: string): { days: string[], start: number, end: number } => {
    const [days, times] = meetingTime.split(' ');
    const [start, end] = times.split('-');
    return {
        days: days.match(/(Tu|Th|M|W|F)/g) || [],
        start: convertTimeToMinutes(start),
        end: convertTimeToMinutes(end)
    };
}

type CourseMeeting = { term: string; meets: string };

export const checkTimeConflict = (c1: CourseMeeting | undefined, c2: CourseMeeting | undefined): boolean => {
    if (!c1?.meets || !c2?.meets || c1.term !== c2.term) {
        return false;
    }
    const m1 = parseMeetingTime(c1.meets);
    const m2 = parseMeetingTime(c2.meets);
    const doDaysOverlap = m1.days.some(day => m2.days.includes(day));
    const doTimesOverlap = m1.start < m2.end && m2.start < m1.end;
    return doDaysOverlap && doTimesOverlap;
}
