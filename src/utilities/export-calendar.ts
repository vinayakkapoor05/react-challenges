
import { parseMeetingTime } from "./time-conflicts";

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface QuarterDates {
  start: string;
  end: string;
}

const quarterDates: Record<string, QuarterDates> = {
  Fall: { start: "2018-09-27", end: "2018-12-08" },
  Winter: { start: "2019-01-07", end: "2019-03-16" },
  Spring: { start: "2019-04-01", end: "2019-06-08" }
};

const dayNumbers: Record<string, number> = {
  M: 1,
  Tu: 2,
  W: 3,
  Th: 4,
  F: 5
};

const formatDate = (date: Date): string => {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
};

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}${String(mins).padStart(2, "0")}00`;
};

const escapeICS = (text: string): string => {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
};

const getMeetingDates = (
  start: string,
  end: string,
  day: number
) => {
  const first = new Date(start + "T00:00:00Z");
  const last = new Date(end + "T00:00:00Z");

  while (first.getUTCDay() !== day) {
    first.setUTCDate(first.getUTCDate() + 1);
  }

  if (first > last) return null;

  let count = 0;
  const current = new Date(first);

  while (current <= last) {
    count++;
    current.setUTCDate(current.getUTCDate() + 7);
  }

  return { first, count };
};

export const generateICS = (
  courses: Course[],
  term: string
): string => {
  const quarter = quarterDates[term];

  if (!quarter) {
    throw new Error("Invalid academic term");
  }

  const events: string[] = [];

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  for (const course of courses) {
    if (course.term !== term || !course.meets) continue;

    let meeting;

    try {
      meeting = parseMeetingTime(course.meets);
    } catch {
      continue;
    }

    if (
      !meeting ||
      !Number.isFinite(meeting.start) ||
      !Number.isFinite(meeting.end) ||
      meeting.end <= meeting.start
    ) {
      continue;
    }

    for (const day of meeting.days) {
      const dayNumber = dayNumbers[day];

      if (dayNumber === undefined) continue;

      const dates = getMeetingDates(
        quarter.start,
        quarter.end,
        dayNumber
      );

      if (!dates) continue;

      const date = formatDate(dates.first);
      const startTime = formatTime(meeting.start);
      const endTime = formatTime(meeting.end);

      const event = [
        "BEGIN:VEVENT",
        `UID:${crypto.randomUUID()}@course-planner`,
        `DTSTAMP:${timestamp}`,
        `SUMMARY:${escapeICS(`CS ${course.number}: ${course.title}`)}`,
        `DTSTART:${date}T${startTime}`,
        `DTEND:${date}T${endTime}`,
        `RRULE:FREQ=WEEKLY;COUNT=${dates.count}`,
        "END:VEVENT"
      ];

      events.push(event.join("\r\n"));
    }
  }

  if (events.length === 0) {
    throw new Error("No valid course meetings to export.");
  }

  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Course Planner//EN",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
    ""
  ];

  return calendar.join("\r\n");
};

export const downloadICS = (
  courses: Course[],
  term: string
) => {
  const calendar = generateICS(courses, term);

  const blob = new Blob([calendar], {
    type: "text/calendar;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${term.toLowerCase()}-course-plan.ics`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
