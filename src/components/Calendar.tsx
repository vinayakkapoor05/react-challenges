
import { parseMeetingTime } from '../utilities/time-conflicts';

interface CourseData {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CalendarProps {
  courses: {
    [key: string]: CourseData;
  };
  selectedCourses: string[];
  selectedTerm: string;
}

const weekdays = [
  { key: 'M', label: 'Monday' },
  { key: 'Tu', label: 'Tuesday' },
  { key: 'W', label: 'Wednesday' },
  { key: 'Th', label: 'Thursday' },
  { key: 'F', label: 'Friday' }
];

const pixelsPerHour = 60;

const formatTime = (hour: number): string => {
  const displayHour = hour % 12 || 12;
  return `${displayHour} ${hour < 12 ? 'AM' : 'PM'}`;
};

const Calendar = ({
  courses,
  selectedCourses,
  selectedTerm
}: CalendarProps) => {

  const meetings = selectedCourses
    .filter(id =>
      courses[id] &&
      courses[id].term === selectedTerm &&
      courses[id].meets
    )
    .flatMap(id => {
      const course = courses[id];
      const { days, start, end } =
        parseMeetingTime(course.meets);

      return days.map(day => ({
        id,
        day,
        start,
        end,
        course
      }));
    })
    .filter(meeting =>
      Number.isFinite(meeting.start) &&
      Number.isFinite(meeting.end) &&
      meeting.end > meeting.start
    );

  const startHour = Math.min(
    8,
    ...meetings.map(meeting =>
      Math.floor(meeting.start / 60)
    )
  );

  const endHour = Math.max(
    18,
    ...meetings.map(meeting =>
      Math.ceil(meeting.end / 60)
    )
  );

  const hours = Array.from(
    { length: endHour - startHour },
    (_, i) => startHour + i
  );

  const calendarHeight =
    (endHour - startHour) * pixelsPerHour;

  const getTop = (minutes: number): number =>
    (minutes - startHour * 60) *
    (pixelsPerHour / 60);

  const getHeight = (
    start: number,
    end: number
  ): number =>
    (end - start) * (pixelsPerHour / 60);

  return (
    <div className="w-full min-w-0">
      <h2 className="mb-4 text-base font-semibold text-ink">
        {selectedTerm} Weekly Schedule
      </h2>

      {meetings.length === 0 && (
        <p className="mb-4 text-sm text-muted">
          No courses selected for this term.
        </p>
      )}

      <div className="w-full overflow-x-auto rounded-xl border border-divider bg-panel">
        <div className="min-w-[750px]">

          <div
            className="grid border-b border-divider bg-raised"
            style={{
              gridTemplateColumns:
                '70px repeat(5, minmax(0, 1fr))'
            }}
          >
            <div className="border-r border-divider p-3" />

            {weekdays.map(day => (
              <div
                key={day.key}
                className="border-r border-divider px-3 py-4 text-center text-sm font-semibold text-ink last:border-r-0"
              >
                {day.label}
              </div>
            ))}
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns:
                '70px repeat(5, minmax(0, 1fr))'
            }}
          >
            <div
              className="relative border-r border-divider bg-raised"
              style={{ height: calendarHeight }}
            >
              {hours.map(hour => (
                <div
                  key={hour}
                  className="absolute right-3 text-xs font-medium tabular-nums text-muted"
                  style={{
                    top:
                      (hour - startHour) *
                      pixelsPerHour + 8
                  }}
                >
                  {formatTime(hour)}
                </div>
              ))}
            </div>

            {weekdays.map(day => (
              <div
                key={day.key}
                className="relative border-r border-divider last:border-r-0"
                style={{ height: calendarHeight }}
              >

                {hours.map(hour => (
                  <div
                    key={hour}
                    className="pointer-events-none absolute left-0 right-0 border-t border-divider"
                    style={{
                      top:
                        (hour - startHour) *
                        pixelsPerHour
                    }}
                  />
                ))}

                {meetings
                  .filter(meeting =>
                    meeting.day === day.key
                  )
                  .map(meeting => (
                    <div
                      key={`${meeting.id}-${day.key}`}
                      className="absolute left-1 right-1 overflow-hidden rounded-lg border border-control border-l-[3px] border-l-accent bg-selection p-2 shadow-sm"
                      style={{
                        top: getTop(meeting.start),
                        height: getHeight(
                          meeting.start,
                          meeting.end
                        )
                      }}
                      title={
                        `CS ${meeting.course.number}: ` +
                        meeting.course.title +
                        ` (${meeting.course.meets})`
                      }
                    >
                      <div className="text-sm font-semibold leading-5 text-ink">
                        CS {meeting.course.number}
                      </div>

                      <div className="text-xs leading-4 text-ink">
                        {meeting.course.title}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
