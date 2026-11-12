// Build-time script: fetch the GitHub contribution calendar and overwrite
// src/data/contributions.json, which the GitHubCalendar component imports.
//
// Called by deploy.yml before `npm run build`. On any failure it exits
// non-zero; the workflow then keeps the committed snapshot.
//
// Run with a token: GH_TOKEN=<token> node .github/scripts/fetch-contributions.mjs
import { writeFileSync } from 'node:fs';

const LOGIN = 'MarronFrui';
const TOKEN = process.env.GH_TOKEN;

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!TOKEN) fail('GH_TOKEN is missing');

// contributionCalendar is the exact data the GitHub profile graph shows:
// 53 Sunday-first weeks, one entry per day with a count and a 0-4 level.
// (The schema's startedDate / endedDate fields no longer exist; the dates on
// the days are enough.)
const query = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          firstDay
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

const response = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'User-Agent': 'portfolio-deploy',
  },
  body: JSON.stringify({ query, variables: { login: LOGIN } }),
});

if (!response.ok) fail(`GitHub API answered ${response.status}`);

const body = await response.json();
if (body.errors) fail(JSON.stringify(body.errors));

const calendar = body.data?.user?.contributionsCollection?.contributionCalendar;
if (!calendar) fail('Unexpected GraphQL answer');

const level = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const data = {
  generatedAt: new Date().toISOString().slice(0, 10),
  totalContributions: calendar.totalContributions,
  weeks: calendar.weeks.map((week) => ({
    firstDay: week.firstDay,
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: level[day.contributionLevel] ?? 0,
    })),
  })),
};

writeFileSync('src/data/contributions.json', `${JSON.stringify(data, null, 2)}\n`);
console.log(`Wrote src/data/contributions.json: ${calendar.totalContributions} contributions over ${calendar.weeks.length} weeks`);
