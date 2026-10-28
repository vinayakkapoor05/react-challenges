import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


const MeetingTime = (meets: string): boolean => {
    if (meets === "") return true;
    const match = meets.match(/^(\S+) (\S+)$/);
    if (!match) return false;
    const [, days, times] = match;
    const dayList = days.match(/Tu|Th|M|W|F/g) || [];
    if (dayList.join("") !== days) return false;
    const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/;
    const time = times.match(timeRegex);
    if (!time) return false;
    const [, startHour, startMinute, endHour, endMinute] = time;

    return Number(startHour) * 60 + Number(startMinute) < Number(endHour) * 60 + Number(endMinute);
};

export const CourseSchema = z.object({
  title: z.string().min(2, { message: "Title should be at least 2 characters long" }),
  term: z.string().refine((term) => ["Spring", "Summer", "Fall", "Winter"].includes(term), { message: "Term should be one of Spring, Summer, Fall, or Winter" }),
  number: z.string().regex(/^\d+(-\d+)?$/, { message: "Course number should be a number with an optional section, e.g., 213-2"}),
    meets: z.string().refine(MeetingTime, { message: "Meeting times should be in the format, e.g., 'MWF 10:00-11:00'" }),
});

export type Course = z.infer<typeof CourseSchema>;
export const courseResolver = zodResolver(CourseSchema);
