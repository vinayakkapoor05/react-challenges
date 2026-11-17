
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

  // Selected courses for the current term
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

  // Calendar runs from at least 8 AM to 6 PM
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

  // Convert meeting times to exact pixel positions
  const getTop = (minutes: number): number =>
    (minutes - startHour * 60) *
    (pixelsPerHour / 60);

  const getHeight = (
    start: number,
    end: number
  ): number =>
    (end - start) * (pixelsPerHour / 60);

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">
        {selectedTerm} Weekly Schedule
      </h2>

      {meetings.length === 0 && (
        <p className="text-gray-500 mb-4">
          No courses selected for this term.
        </p>
      )}

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <div className="min-w-[750px]">

          {/* Weekday headers */}
          <div
            className="grid border-b border-gray-200 bg-gray-50"
            style={{
              gridTemplateColumns:
                '70px repeat(5, minmax(0, 1fr))'
            }}
          >
            <div className="p-3 border-r border-gray-200" />

            {weekdays.map(day => (
              <div
                key={day.key}
                className="text-center text-sm font-semibold p-3 border-r border-gray-200 last:border-r-0"
              >
                {day.label}
              </div>
            ))}
          </div>

          {/* Calendar body */}
          <div
            className="grid"
            style={{
              gridTemplateColumns:
                '70px repeat(5, minmax(0, 1fr))'
            }}
          >
            {/* Time labels */}
            <div
              className="relative border-r border-gray-200 bg-gray-50"
              style={{ height: calendarHeight }}
            >
              {hours.map(hour => (
                <div
                  key={hour}
                  className="absolute right-2 text-xs text-gray-500"
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

            {/* Day columns */}
            {weekdays.map(day => (
              <div
                key={day.key}
                className="relative border-r border-gray-200 last:border-r-0"
                style={{ height: calendarHeight }}
              >

                {/* Horizontal hour lines */}
                {hours.map(hour => (
                  <div
                    key={hour}
                    className="absolute left-0 right-0 border-t border-gray-100 pointer-events-none"
                    style={{
                      top:
                        (hour - startHour) *
                        pixelsPerHour
                    }}
                  />
                ))}

                {/* Selected course blocks */}
                {meetings
                  .filter(meeting =>
                    meeting.day === day.key
                  )
                  .map(meeting => (
                    <div
                      key={`${meeting.id}-${day.key}`}
                      className="absolute left-1 right-1 bg-blue-100 border border-blue-400 rounded-md p-2 overflow-hidden"
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
                      <div className="font-bold text-sm text-blue-900">
                        CS {meeting.course.number}
                      </div>

                      <div className="text-xs text-blue-800">
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
