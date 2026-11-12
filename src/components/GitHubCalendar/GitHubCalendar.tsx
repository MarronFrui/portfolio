import { useMemo } from 'react';
import { useLanguage } from '../../translation/languageContext';
import calendarData from '../../data/contributions.json';
import './GitHubCalendar.scss';

// One 365-day contribution calendar, drawn as SVG from the snapshot baked at
// build time (see .github/scripts/fetch-contributions.mjs): the page never
// calls the GitHub API itself.

// Grid proportions of the GitHub profile graph: 11 px cells, 3 px gap, month
// labels on top, weekday labels on the left.
const CELL = 11;
const PITCH = CELL + 3;
const LABEL_X = 26;
const LABEL_Y = 14;
const SVG_WIDTH = LABEL_X + calendarData.weeks.length * PITCH + 6;
const SVG_HEIGHT = LABEL_Y + 7 * PITCH + 24;
// Rows are weekdays, Sunday = 0. Only Monday, Wednesday and Friday get a label.
const LABELED_ROWS = [1, 3, 5];

type CalendarDay = (typeof calendarData.weeks)[number]['days'][number];

function utcDate(dateText: string): Date {
  return new Date(`${dateText}T00:00:00Z`);
}

// A label over each month that starts within the first seven days of a week.
function monthLabels(locale: string) {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
  const labeled = new Set<string>();
  const labels: { key: string; x: number; text: string }[] = [];

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

function weekdayLabels(locale: string) {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
  // 2024-01-07 is a Sunday, so day 7 + row is the weekday of that row.
  return LABELED_ROWS.map((row) => ({
    row,
    text: formatter.format(new Date(Date.UTC(2024, 0, 7 + row))),
  }));
}

function GitHubCalendar() {
  const { translate, language } = useLanguage();
  const locale = language === 'fr' ? 'fr-FR' : 'en-GB';
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' });
  const months = useMemo(() => monthLabels(locale), [locale]);
  const weekdays = useMemo(() => weekdayLabels(locale), [locale]);

  function dayTitle(day: CalendarDay): string {
    const date = dateFormatter.format(utcDate(day.date));
    if (day.count === 0) return translate('GITHUB_CALENDAR_NO_CONTRIBUTIONS_ON', { date });
    const key = day.count === 1 ? 'GITHUB_CALENDAR_CONTRIBUTION_ON' : 'GITHUB_CALENDAR_CONTRIBUTIONS_ON';
    return translate(key, { count: day.count, date });
  }

  return (
    <div className="github-calendar">
      <h3 className="github-calendar-title">{translate('GITHUB_CALENDAR_TITLE')}</h3>
      <svg
        className="github-calendar-graph"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        role="img"
        aria-label={`${translate('GITHUB_CALENDAR_TITLE')} — ${translate('GITHUB_CALENDAR_SUMMARY', { count: calendarData.totalContributions })}`}
      >
        {months.map((label) => (
          <text key={label.key} className="github-calendar-label" x={label.x} y={10}>
            {label.text}
          </text>
        ))}
        {weekdays.map(({ row, text }) => (
          <text
            key={row}
            className="github-calendar-label"
            x={LABEL_X - 5}
            y={LABEL_Y + row * PITCH + 9}
            textAnchor="end"
          >
            {text}
          </text>
        ))}
        {calendarData.weeks.map((week, weekIndex) => (
          <g key={week.firstDay}>
            {week.days.map((day) => (
              <rect
                key={day.date}
                className={`github-calendar-cell github-calendar-cell--${day.level}`}
                x={LABEL_X + weekIndex * PITCH}
                y={LABEL_Y + utcDate(day.date).getUTCDay() * PITCH}
                width={CELL}
                height={CELL}
                rx={2.5}
              >
                <title>{dayTitle(day)}</title>
              </rect>
            ))}
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
        {translate('GITHUB_CALENDAR_AS_OF', { date: dateFormatter.format(utcDate(calendarData.generatedAt)) })}
      </p>
    </div>
  );
}

export default GitHubCalendar;
