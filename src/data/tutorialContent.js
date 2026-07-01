export const tutorialSlides = [
  {
    id: 'intro',
    title: 'What is cron?',
    content: `Cron is a time-based job scheduler built into Unix-like systems. It lets you run commands or scripts automatically on a schedule — every minute, every day at midnight, every Monday morning, and so on.

The schedules are defined using **cron expressions**: a compact string of five to seven fields that describes exactly when a job should run.

Cron is used everywhere — from sending nightly email reports, to clearing caches, to backing up databases.`,
    example: null,
  },
  {
    id: 'anatomy',
    title: 'Anatomy of a cron expression',
    content: `A standard cron expression has **five fields**, separated by spaces:

Each field represents a unit of time. Together they pinpoint exactly when the job fires.`,
    example: '* * * * *',
    fieldLabels: ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week'],
    fieldRanges: ['0-59', '0-23', '1-31', '1-12', '0-6 (Sun=0)'],
  },
  {
    id: 'wildcard',
    title: 'The wildcard: *',
    content: `An asterisk \`*\` means "every possible value" for that field.

So \`* * * * *\` means: every minute, every hour, every day — it runs every single minute.

\`0 * * * *\` means: at minute 0 of every hour — i.e. every hour on the hour.`,
    example: '0 * * * *',
    highlight: [0],
    description: 'Runs at the top of every hour',
  },
  {
    id: 'specific',
    title: 'Specific values',
    content: `Replace \`*\` with a number to pin that field to an exact value.

\`30 14 * * *\` means: at 14:30 (2:30 PM) every day.

\`0 0 1 * *\` means: at midnight on the 1st of every month.`,
    example: '30 14 * * *',
    highlight: [0, 1],
    description: 'Runs every day at 2:30 PM',
  },
  {
    id: 'ranges',
    title: 'Ranges with -',
    content: `Use a hyphen **\`-\`** to specify a range of values.

\`0 9-17 * * *\` means: at minute 0 of every hour from 9am to 5pm — i.e. every hour during the working day.

\`* * 1-7 * *\` means: every minute, but only on days 1 through 7 of the month.`,
    example: '0 9-17 * * *',
    highlight: [1],
    description: 'Runs at the top of every hour from 9am to 5pm',
  },
  {
    id: 'lists',
    title: 'Lists with ,',
    content: `Use a comma **\`,\`** to list specific values.

\`0 8,12,18 * * *\` means: at 8am, 12pm, and 6pm every day.

\`0 0 * * 1,3,5\` means: at midnight on Monday, Wednesday, and Friday.`,
    example: '0 8,12,18 * * *',
    highlight: [1],
    description: 'Runs at 8am, noon, and 6pm every day',
  },
  {
    id: 'steps',
    title: 'Step values with /',
    content: `Use a slash **\`/\`** to run at regular intervals — "every N units".

\`*/15 * * * *\` means: every 15 minutes.

\`0 */2 * * *\` means: every 2 hours, on the hour.

\`0 0 */3 * *\` means: at midnight, every 3 days.

You can also combine with a range: \`0 8-18/2 * * *\` means every 2 hours between 8am and 6pm.`,
    example: '*/15 * * * *',
    highlight: [0],
    description: 'Runs every 15 minutes',
  },
  {
    id: 'dow',
    title: 'Day of week',
    content: `The fifth field is the **day of week**, where **0 = Sunday** and **6 = Saturday**.

\`0 9 * * 1\` means: at 9am every Monday.

\`0 17 * * 1-5\` means: at 5pm Monday through Friday — i.e. end of every workday.

\`0 10 * * 0,6\` means: at 10am on Saturday and Sunday — weekends only.`,
    example: '0 9 * * 1',
    highlight: [4],
    description: 'Runs at 9am every Monday',
  },
  {
    id: 'dow-names',
    title: 'Named days and months',
    content: `Instead of numbers, you can use **three-letter abbreviations** for days and months — cron accepts both.

Days: \`SUN MON TUE WED THU FRI SAT\`

Months: \`JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC\`

So \`0 9 * * MON\` is exactly the same as \`0 9 * * 1\`.

And \`0 0 1 JAN,JUL *\` fires at midnight on January 1st and July 1st.`,
    example: '0 9 * JAN-MAR MON-FRI',
    highlight: [3, 4],
    description: 'Runs at 9am on weekdays in January through March',
  },
  {
    id: 'dom-vs-dow',
    title: 'Day of month vs. day of week',
    content: `When **both** the day-of-month and day-of-week fields are set (neither is \`*\`), cron runs the job when **either** condition is true — not both.

For example, \`0 0 13 * 5\` fires:
- At midnight on every 13th of the month, **AND**
- At midnight on every Friday

This OR behaviour can be surprising! If you only want "the 13th that falls on a Friday", you'd need to handle that in your script, not the cron expression.`,
    example: '0 0 13 * 5',
    highlight: [2, 4],
    description: 'Runs at midnight on the 13th of any month, and also every Friday',
  },
  {
    id: 'combining',
    title: 'Putting it all together',
    content: `You can mix wildcards, specific values, ranges, lists, and steps across all five fields.

\`*/5 9-17 * * 1-5\` — every 5 minutes, during 9am-5pm, Monday to Friday.

\`0 0 1,15 * *\` — at midnight on the 1st and 15th of every month.

\`30 6 * * 1-5\` — at 6:30am every weekday.

The five fields give you a surprisingly expressive language for describing almost any recurring schedule.`,
    example: '*/5 9-17 * * 1-5',
    highlight: [0, 1, 4],
    description: 'Runs every 5 minutes during business hours on weekdays',
  },
  {
    id: 'special',
    title: 'Special strings',
    content: `Many cron implementations also support shorthand **special strings** as an alternative to the five fields:

| String | Equivalent | Meaning |
|--------|-----------|---------|
| \`@yearly\` | \`0 0 1 1 *\` | Once a year, Jan 1st midnight |
| \`@monthly\` | \`0 0 1 * *\` | Once a month, 1st midnight |
| \`@weekly\` | \`0 0 * * 0\` | Once a week, Sunday midnight |
| \`@daily\` | \`0 0 * * *\` | Once a day, midnight |
| \`@hourly\` | \`0 * * * *\` | Once an hour, top of the hour |
| \`@reboot\` | — | Once, at startup |

These aren't part of the core cron syntax, but you'll see them often in the wild.`,
    example: null,
    isTable: true,
  },
  {
    id: 'extended',
    title: '6 and 7-field cron',
    content: `The standard cron expression has 5 fields, but some platforms extend it with a **Seconds** field at the start, a **Year** field at the end, or both.

| Format | Expression shape | Extra fields | Common platforms |
|--------|-----------------|--------------|-----------------|
| 5-field | \`MIN HR DOM MON DOW\` | — | Unix cron, GitHub Actions |
| 6-field | \`SEC MIN HR DOM MON DOW\` | Seconds (0-59) | Spring, AWS EventBridge |
| 7-field | \`SEC MIN HR DOM MON DOW YEAR\` | Seconds + Year (1970-2099) | Quartz Scheduler |

For example, the 6-field expression \`0 30 14 * * *\` means "at exactly 14:30:00 every day" — the leading \`0\` pins the seconds to zero.

Always check your platform's docs: a 5-field expression fed to a 6-field parser will be misread, and the job will fire at the wrong time.`,
    example: null,
  },
  {
    id: 'done',
    title: "You're ready to chirp!",
    content: `You now know everything about the fields of a cron expression.

Head back to the home page to try the **Play Levels** challenge, or jump into **Free Practice** to test yourself!`,
    example: null,
    isFinal: true,
  },
]
