import { useLanguage } from '../../translation/languageContext';
import calendarData from '../../data/contributions.json';
import './GitHubCalendar.scss';

// One 365-day contribution calendar, drawn as SVG. The data is the snapshot
// baked at build time (see .github/scripts/fetch-contributions.mjs): the page
// never calls the GitHub API itself.

// Layout of the grid, matching the GitHub profile graph proportions:
// 11 px cells, 3 px gap, month labels on top, weekday labels on the left.
const CELL = 11;
const PITCH = CELL + 3;
const LABEL_X = 26;
const LABEL_Y = 14;
const GRID_WIDTH = calendarData.weeks.length * PITCH;
const SVG_WIDTH = LABEL_X + GRID_WIDTH + 6;
const SVG_HEIGHT = LABEL_Y + 7 * PITCH + 24;

// The weekday of a date, 0 = Sunday to 6 = Saturday. Weeks start on Sunday,
// like GitHub's graph, so the row of a day is its weekday index.
function utcDate(dateText: string): Date {
  return new Date(`${dateText}T00:00:00Z`);
}

function weekdayRow(dateText: string): number {
  return utcDate(dateText).getUTCDay();
}

type CalendarDay = {
  date: string;
  count: number;
  level: number;
};

type MonthLabel = {
  key: string;
  x: number;
  text: string;
};

// A label under each month that starts within the first seven days of a week,
// like the profile graph. Returns at most 13 of them.
function monthLabels(locale: string): MonthLabel[] {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
  const labels: MonthLabel[] = [];
  const labeled = new Set<string>();

  calendarData.weeks.forEach((week, weekIndex) => {
    for (const day of week.days) {
      const date = utcDate(day.date);
      const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
      if (date.getUTCDate() <= 7 && !labeled.has(key)) {
        labeled.add(key);
        labels.push({ key, x: LABEL_X + weekIndex * PITCH, text: formatter.format(date) });
        break;
      }
    }
  });
  return labels;
}

// Short labels for the Monday, Wednesday and Friday rows.
function weekdayLabels(locale: string): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
  const samples = new Map<number, string>();
  for (const week of calendarData.weeks) {
    for (const day of week.days) {
      const row = weekdayRow(day.date);
      if (!samples.has(row)) samples.set(row, day.date);
    }
  }
  return [1, 3, 5].map((row) => (samples.has(row) ? formatter.format(utcDate(samples.get(row)!)) : ''));
}

function GitHubCalendar() {
  const { translate, language } = useLanguage();
  const locale = language === 'fr' ? 'fr-FR' : 'en-GB';
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' });
  const monthLabelsForRow = monthLabels(locale);
  const weekdayLabelsForRow = weekdayLabels(locale);

  function dayTitle(day: CalendarDay): string {
    const dateText = dateFormatter.format(utcDate(day.date));
    if (day.count === 0) {
      return `${translate('GITHUB_CALENDAR_NO_CONTRIBUTIONS')} — ${dateText}`;
    }
    const unit =
      day.count === 1
        ? translate('GITHUB_CALENDAR_CONTRIBUTION_ON')
        : translate('GITHUB_CALENDAR_CONTRIBUTIONS_ON');
    return `${day.count} ${unit} ${dateText}`;
  }

  return (
    <div className="github-calendar">
      <h3 className="github-calendar-title">{translate('GITHUB_CALENDAR_TITLE')}</h3>
      <svg
        className="github-calendar-graph"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        role="img"
        aria-label={`${translate('GITHUB_CALENDAR_TITLE')} — ${calendarData.totalContributions} ${translate('GITHUB_CALENDAR_CONTRIBUTIONS_ON')}`}
      >
        {monthLabelsForRow.map((label) => (
          <text key={label.key} className="github-calendar-label" x={label.x} y={10}>
            {label.text}
          </text>
        ))}
        {weekdayLabelsForRow.map((text, index) =>
          text ? (
            <text
              key={text}
              className="github-calendar-label"
              x={LABEL_X - 5}
              y={LABEL_Y + [1, 3, 5][index] * PITCH + 9}
              textAnchor="end"
            >
              {text}
            </text>
          ) : null,
        )}
        {calendarData.weeks.map((week, weekIndex) => (
          <g key={week.firstDay}>
            {week.days.map((day) => {
              const x = LABEL_X + weekIndex * PITCH;
              const y = LABEL_Y + weekdayRow(day.date) * PITCH;
              return (
                <rect
                  key={day.date}
                  className={`github-calendar-cell github-calendar-cell--${day.level}`}
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  rx={2.5}
                >
                  <title>{dayTitle(day)}</title>
                </rect>
              );
            })}
          </g>
        ))}
        <g className="github-calendar-legend">
          <text className="github-calendar-label" x={LABEL_X} y={SVG_HEIGHT - 8}>
            {translate('GITHUB_CALENDAR_LESS')}
          </text>
          {[0, 1, 2, 3, 4].map((level) => (
            <rect
              key={level}
              className={`github-calendar-cell github-calendar-cell--${level}`}
              x={LABEL_X + 30 + level * PITCH}
              y={SVG_HEIGHT - 17}
              width={10}
              height={10}
              rx={2.5}
            />
          ))}
          <text className="github-calendar-label" x={LABEL_X + 30 + 5 * PITCH + 3} y={SVG_HEIGHT - 8}>
            {translate('GITHUB_CALENDAR_MORE')}
          </text>
        </g>
      </svg>
      <p className="github-calendar-caption">
        {translate('GITHUB_CALENDAR_AS_OF')} {dateFormatter.format(utcDate(calendarData.generatedAt))}
      </p>
    </div>
  );
}

export default GitHubCalendar;
