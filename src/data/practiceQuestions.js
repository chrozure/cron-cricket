// Each question has:
//   type: 'write' (user types expression) | 'mc' (single-answer) | 'multi' (select all correct)
//   prompt: the question text
//   answer: (write/mc) correct cron expression or meaning string
//   answers: (multi) array of all correct options
//   options: (mc/multi) array of 4 choices
//   isMeaning: (mc only) true if question asks about meaning rather than equivalence

export const practicePool = [
  {
    type: 'write',
    prompt: 'This cricket chirps every minute. Write a cron expression for this schedule.',
    answer: '* * * * *',
  },
  {
    type: 'mc',
    prompt: 'Which of these expressions runs a job every day at midnight?',
    answer: '0 0 * * *',
    options: ['0 0 * * *', '* * 0 0 *', '0 * * * 0', '* 0 0 * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps at 6:30am every morning. Write a cron expression for this schedule.',
    answer: '30 6 * * *',
  },
  {
    type: 'multi',
    prompt: 'Which of these expressions run every 15 minutes?',
    answers: ['*/15 * * * *', '0,15,30,45 * * * *'],
    options: ['*/15 * * * *', '15 * * * *', '* */15 * * *', '0,15,30,45 * * * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps at the top of every hour. Write a cron expression for this schedule.',
    answer: '0 * * * *',
  },
  {
    type: 'mc',
    prompt: 'Which of these expressions runs every Monday at 9am?',
    answer: '0 9 * * 1',
    options: ['0 9 * * 1', '9 0 * * 1', '0 9 * * 0', '0 9 1 * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every weekday at 8am. Write a cron expression for this schedule.',
    answer: '0 8 * * 1-5',
  },
  {
    type: 'mc',
    prompt: 'What does the expression "*/5 * * * *" do?',
    answer: 'Runs every 5 minutes',
    options: [
      'Runs every 5 minutes',
      'Runs at minute 5 every hour',
      'Runs every 5 hours',
      'Runs on the 5th of every month',
    ],
    isMeaning: true,
  },
  {
    type: 'write',
    prompt: 'This cricket celebrates the new Year by chirping once at midnight on January 1st. Write a cron expression for this schedule.',
    answer: '0 0 1 1 *',
  },
  {
    type: 'mc',
    prompt: 'Which of these expressions runs at noon on the 1st and 15th of every month?',
    answer: '0 12 1,15 * *',
    options: ['0 12 1,15 * *', '12 0 1,15 * *', '0 12 * * 1,15', '0 12 1-15 * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every 2 hours, on the hour. Write a cron expression for this schedule.',
    answer: '0 */2 * * *',
  },
  {
    type: 'mc',
    prompt: 'A chirp is scheduled with "0 17 * * 1-5". When will it happen?',
    answer: 'Runs at 5pm every weekday',
    options: [
      'Runs at 5pm every weekday',
      'Runs at 5am every weekend',
      'Runs at 5pm on Monday only',
      'Runs every 17 minutes on weekdays',
    ],
    isMeaning: true,
  },
  {
    type: 'write',
    prompt: 'This cricket chirps at 10am and 4pm every day. Write a cron expression for this schedule.',
    answer: '0 10,16 * * *',
  },
  {
    type: 'multi',
    prompt: 'Which of these expressions run every minute during the hour of 9am only (i.e. from 9:00 to 9:59)?',
    answers: ['* 9 * * *', '0-59 9 * * *'],
    options: ['* 9 * * *', '0-59 9 * * *', '* * 9 * *', '9 * * * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every Saturday and Sunday at noon. Write a cron expression for this schedule.',
    answer: '0 12 * * 0,6',
  },
  {
    type: 'mc',
    prompt: 'Which of these expressions runs at midnight on the first day of every month?',
    answer: '0 0 1 * *',
    options: ['0 0 1 * *', '0 0 * 1 *', '* * 1 * 0', '0 0 1 * 1'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every 30 minutes during business hours (9am-5pm), every day. Write a cron expression for this schedule.',
    answer: '*/30 9-17 * * *',
  },
  {
    type: 'mc',
    prompt: 'Which best describes the schedule "0 0 * * 0"?',
    answer: 'Runs at midnight every Sunday',
    options: [
      'Runs at midnight every Sunday',
      'Runs at midnight every Saturday',
      'Runs every hour on Sundays',
      'Runs at midnight on the 1st of every month',
    ],
    isMeaning: true,
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every 10 minutes on weekdays only. Write a cron expression for this schedule.',
    answer: '*/10 * * * 1-5',
  },
  {
    type: 'mc',
    prompt: 'Which expression runs at 3:45pm on weekdays?',
    answer: '45 15 * * 1-5',
    options: ['45 15 * * 1-5', '15 45 * * 1-5', '45 3 * * 1-5', '45 15 1-5 * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every minute of the day on May 3rd. Write a cron expression for this schedule.',
    answer: '* * 3 5 *',
  },
  {
    type: 'multi',
    prompt: 'Which expressions correctly represent "every 5 minutes, but only between 8am and 6pm"?',
    answers: ['*/5 8-18 * * *', '0-55/5 8-18 * * *'],
    options: ['*/5 8-18 * * *', '5 8-18 * * *', '*/5 8,18 * * *', '0-55/5 8-18 * * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps at 9am on Monday, Wednesday, and Friday. Write a cron expression for this schedule.',
    answer: '0 9 * * 1,3,5',
  },
  {
    type: 'mc',
    prompt: 'This cricket is scheduled to chirp at "0 12 */3 * *". What schedule does it represent?',
    answer: 'Runs at noon every 3 days',
    options: [
      'Runs at noon every 3 days',
      'Runs at noon on the 3rd of every month',
      'Runs every 3 hours at noon',
      'Runs at noon on the 1st, 3rd, and 5th',
    ],
    isMeaning: true,
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every minute between 9am and 5pm, Monday through Friday. Write a cron expression for this schedule.',
    answer: '* 9-17 * * 1-5',
  },
  {
    type: 'multi',
    prompt: 'Which of the following expressions run at midnight (00:00)?',
    answers: ['0 0 * * *', '0 0 1 * *'],
    options: ['0 0 * * *', '0 0 1 * *', '0 1 * * *', '1 0 * * *'],
  },
  {
    type: 'multi',
    prompt: 'Which of the following expressions use a step value (/) ?',
    answers: ['*/5 * * * *', '0 */2 * * *'],
    options: ['*/5 * * * *', '0 9-17 * * *', '0 */2 * * *', '0 12 1,15 * *'],
  },
  {
    type: 'multi',
    prompt: 'Which of the following expressions only run on weekdays?',
    answers: ['0 9 * * 1-5', '45 15 * * 1-5'],
    options: ['0 9 * * 1-5', '45 15 * * 1-5', '0 9 * * *', '0 9 * * 0,6'],
  },
  {
    type: 'multi',
    prompt: 'Which of the following expressions include a comma-separated list?',
    answers: ['0 10,16 * * *', '0 12 1,15 * *'],
    options: ['0 10,16 * * *', '0 12 1,15 * *', '*/5 * * * *', '0 9-17 * * *'],
  },
  {
    type: 'multi',
    prompt: 'Which of the following expressions run more than once per day?',
    answers: ['*/30 * * * *', '0 10,16 * * *'],
    options: ['0 9 * * *', '*/30 * * * *', '0 10,16 * * *', '0 0 1 * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every Sunday at 3am. Write a cron expression for this schedule.',
    answer: '0 3 * * 0',
  },
  {
    type: 'write',
    prompt: 'This cricket chirps at 11:30pm every night. Write a cron expression for this schedule.',
    answer: '30 23 * * *',
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every Tuesday and Thursday at noon. Write a cron expression for this schedule.',
    answer: '0 12 * * 2,4',
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every 6 hours, starting at midnight. Write a cron expression for this schedule.',
    answer: '0 */6 * * *',
  },
  {
    type: 'mc',
    prompt: 'What does "0 6 * * *" do?',
    answer: 'Runs at 6am every day',
    options: [
      'Runs at 6am every day',
      'Runs every 6 hours',
      'Runs at 6pm every day',
      'Runs at minute 6 every hour',
    ],
    isMeaning: true,
  },
  {
    type: 'mc',
    prompt: 'A cron job uses the expression "0 0 1 12 *". What is its schedule?',
    answer: 'Runs at midnight on December 1st each year',
    options: [
      'Runs at midnight on December 1st each year',
      'Runs at midnight on the 1st of every month',
      'Runs at midnight every day in December',
      'Runs once an hour in December',
    ],
    isMeaning: true,
  },
  {
    type: 'mc',
    prompt: 'Which expression runs at noon every day in December?',
    answer: '0 12 * 12 *',
    options: ['0 12 * 12 *', '12 0 * 12 *', '0 12 12 * *', '0 0 * 12 *'],
  },
  {
    type: 'multi',
    prompt: 'Which expressions run exactly once per week?',
    answers: ['0 9 * * 1', '0 0 * * 0'],
    options: ['0 9 * * 1', '0 0 * * 0', '0 9 * * 1-5', '0 0 * * *'],
  },
  {
    type: 'multi',
    prompt: 'Which expressions use a range (-)?',
    answers: ['0 9-17 * * *', '0 8 * * 1-5'],
    options: ['0 9-17 * * *', '0 8 * * 1-5', '0 12 1,15 * *', '*/5 * * * *'],
  },
  {
    type: 'multi',
    prompt: 'Which expressions run every hour on the hour?',
    answers: ['0 * * * *', '0 */1 * * *'],
    options: ['0 * * * *', '0 */1 * * *', '* * * * *', '0 1 * * *'],
  },
  {
    type: 'multi',
    prompt: 'Which expressions run every day, regardless of the day of the week?',
    answers: ['0 9 * * *', '30 17 * * *', '0 0 * * *'],
    options: ['0 9 * * *', '30 17 * * *', '0 0 * * *', '0 9 * * 1-5'],
  },
  {
    type: 'multi',
    prompt: 'Which expressions use only plain numbers and wildcards (no /, -, or ,)?',
    answers: ['0 0 * * *', '0 9 1 * *', '0 12 * * 0'],
    options: ['0 0 * * *', '0 9 1 * *', '0 12 * * 0', '*/5 * * * *'],
  },
  {
    type: 'multi',
    prompt: 'Which of these expressions run on a Saturday?',
    answers: ['0 0 * * 6', '0 12 * * 0,6', '0 9 * * *'],
    options: ['0 0 * * 6', '0 12 * * 0,6', '0 9 * * *', '0 9 * * 1-5'],
  },
  {
    type: 'multi',
    prompt: 'Which expressions run more than 10 times per hour?',
    answers: ['* * * * *', '*/5 * * * *', '*/4 * * * *'],
    options: ['* * * * *', '*/5 * * * *', '*/4 * * * *', '*/10 * * * *'],
  },
  {
    type: 'multi',
    prompt: 'Which expressions run on the 1st day of a month?',
    answers: ['0 0 1 * *', '0 12 1 * *', '0 9 1 1 *'],
    options: ['0 0 1 * *', '0 12 1 * *', '0 9 1 1 *', '0 0 * * 1'],
  },
  {
    type: 'write',
    prompt: 'This cricket begins its evening song at dusk, chirping every evening at 8pm. Write a cron expression for its first chirp of each night.',
    answer: '0 20 * * *',
  },
  {
    type: 'write',
    prompt: 'This cricket is a summer singer — it chirps during December, January, and February, at 6am each day. Write a cron expression for its morning chirp.',
    answer: '0 6 * 12,1,2 *',
  },
  {
    type: 'mc',
    prompt: 'Cricket mating season starts in spring. This cricket chirps every 10 minutes on October evenings between 8pm and 10pm, trying to attract a mate. Which expression matches?',
    answer: '*/10 20-22 * 10 *',
    options: ['*/10 20-22 * 10 *', '10 20-22 * 10 *', '*/10 20,22 * 10 *', '*/10 20-22 * * 10'],
  },
  {
    type: 'write',
    prompt: 'This cricket marks the arrival of autumn with a single chirp at noon on the 1st of March, April, and May. Write a cron expression for its seasonal chirp.',
    answer: '0 12 1 3-5 *',
  },
  {
    type: 'multi',
    prompt: 'This cricket only chirps after dark. Which of these expressions run exclusively in the evening hours (after 6pm)?',
    answers: ['0 21 * * *', '0 19,22 * * *', '*/30 20-23 * * *'],
    options: ['0 21 * * *', '0 19,22 * * *', '*/30 20-23 * * *', '*/15 12 * * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps at minute 30 of every hour, then chirps again every 5 minutes. Write a cron expression using the start/step syntax.',
    answer: '30/5 * * * *',
  },
  {
    type: 'mc',
    prompt: 'How often does "15/10 * * * *" fire, and from which minute?',
    answer: 'Runs every 10 minutes starting from minute 15 (at :15, :25, :35, :45, :55)',
    options: [
      'Runs every 10 minutes starting from minute 15 (at :15, :25, :35, :45, :55)',
      'Runs every 10 minutes starting from minute 0 (at :00, :10, :20, :30, :40, :50)',
      'Runs 10 times from minute 0 to minute 15 every hour',
      'Runs 10 times at minute 15 every hour',
    ],
    isMeaning: true,
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every 2 hours starting at 8am. Write a cron expression using the start/step syntax.',
    answer: '0 8/2 * * *',
  },
  {
    type: 'mc',
    prompt: 'Which expression runs every 3 minutes starting from minute 20?',
    answer: '20/3 * * * *',
    options: ['20/3 * * * *', '*/3 * * * *', '3/20 * * * *', '20 */3 * * *'],
  },
  {
    type: 'multi',
    prompt: 'Which of these expressions use the start/step syntax (N/M) with a non-zero starting point?',
    answers: ['30/5 * * * *', '0 6/2 * * *'],
    options: ['30/5 * * * *', '*/5 * * * *', '0 6/2 * * *', '0 */4 * * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every minute from :00 to :05, and also at :30 past each hour. Write a cron expression.',
    answer: '0-5,30 * * * *',
  },
  {
    type: 'mc',
    prompt: 'A chirp is scheduled with "0 9-11,17 * * *". Which option correctly describes its schedule?',
    answer: 'Runs at 9am, 10am, 11am, and 5pm every day',
    options: [
      'Runs at 9am, 10am, 11am, and 5pm every day',
      'Runs every hour between 9am and 5pm',
      'Runs at 9am and 11am, then again at 5pm',
      'Runs at 9am and from 11am through 5pm',
    ],
    isMeaning: true,
  },
  {
    type: 'write',
    prompt: 'This cricket chirps at noon on the 1st through the 7th of every month, and also on the 15th. Write a cron expression.',
    answer: '0 12 1-7,15 * *',
  },
  {
    type: 'write',
    prompt: 'This cricket chirps at midnight every day during January through March, and also every day in December. Write a cron expression.',
    answer: '0 0 * 1-3,12 *',
  },
  {
    type: 'multi',
    prompt: 'Which of these expressions combine a range (-) and a list (,) within the same field?',
    answers: ['0-5,30 * * * *', '0 9-11,17 * * *'],
    options: ['0-5,30 * * * *', '0 9-11,17 * * *', '0 9-17 * * *', '0,15,30,45 * * * *'],
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every 5 minutes, but only between :10 and :40 past each hour. Write a cron expression.',
    answer: '10-40/5 * * * *',
  },
  {
    type: 'mc',
    prompt: 'What does "0 8-20/4 * * *" do?',
    answer: 'Runs every 4 hours between 8am and 8pm (at 8am, noon, 4pm, and 8pm)',
    options: [
      'Runs every 4 hours between 8am and 8pm (at 8am, noon, 4pm, and 8pm)',
      'Runs every 4 minutes between 8am and 8pm',
      'Runs every hour from 8am to 8pm, 4 times total',
      'Runs at 8am and 4pm only',
    ],
    isMeaning: true,
  },
  {
    type: 'write',
    prompt: 'This cricket chirps every 3 hours between 6am and 6pm (at 6am, 9am, noon, 3pm, and 6pm). Write a cron expression.',
    answer: '0 6-18/3 * * *',
  },
  {
    type: 'mc',
    prompt: 'Which expression runs every 2 hours from 10am to 6pm?',
    answer: '0 10-18/2 * * *',
    options: ['0 10-18/2 * * *', '0 */2 * * *', '0 2-10,18 * * *', '0 2/10 * * *'],
  },
  {
    type: 'mc',
    prompt: 'What does "*/15 9-17 * * 1-5" do?',
    answer: 'Runs every 15 minutes between 9am and 5pm on weekdays',
    options: [
      'Runs every 15 minutes between 9am and 5pm on weekdays',
      'Runs at 9am, 11am, 1pm, 3pm, and 5pm on weekdays',
      'Runs every 15 minutes all day, Monday through Friday',
      'Runs every 15 minutes between 9am and 5pm every day',
    ],
    isMeaning: true,
  },
  {
    type: 'mc',
    prompt: 'Which description matches the cron expression "0 0 1,15 * *"?',
    answer: 'Runs at midnight on the 1st and 15th of every month',
    options: [
      'Runs at midnight on the 1st and 15th of every month',
      'Runs at midnight every day from the 1st to the 15th',
      'Runs at 1am and 3pm on the first day of every month',
      'Runs at midnight on the 15th of January',
    ],
    isMeaning: true,
  },
  {
    type: 'mc',
    prompt: 'A cron job is set to "30 8,12,17 * * *". When does it run?',
    answer: 'Runs at 8:30am, 12:30pm, and 5:30pm every day',
    options: [
      'Runs at 8:30am, 12:30pm, and 5:30pm every day',
      'Runs every 30 minutes between 8am and 5pm',
      'Runs at 8am, noon, and 5pm every day',
      'Runs for 30 minutes starting at 8am, noon, and 5pm',
    ],
    isMeaning: true,
  },
  {
    type: 'mc',
    prompt: 'What does "0 9 1 * *" do?',
    answer: 'Runs at 9am on the 1st of every month',
    options: [
      'Runs at 9am on the 1st of every month',
      'Runs every 9 hours on the 1st of every month',
      'Runs at 9am every day in January',
      'Runs at 9am on the 1st of January only',
    ],
    isMeaning: true,
  },
  {
    type: 'mc',
    prompt: 'A cricket chirp schedule uses "0 */4 * * 1-5". Which option best describes when it fires?',
    answer: 'Runs every 4 hours on weekdays',
    options: [
      'Runs every 4 hours on weekdays',
      'Runs every 4 hours every day',
      'Runs at 4am every weekday',
      'Runs 4 times a day on weekdays, at fixed times',
    ],
    isMeaning: true,
  },
  {
    type: 'mc',
    prompt: 'A cron job uses "0 8-16/4,20 * * *". Which option correctly describes its schedule?',
    answer: 'Runs at 8am, noon, 4pm, and 8pm every day',
    options: [
      'Runs at 8am, noon, 4pm, and 8pm every day',
      'Runs every 4 hours from 8am to 8pm every day',
      'Runs every 4 hours from 8am to 4pm, then every hour until 8pm',
      'Runs at 8am and 4pm, and also every hour from 8pm',
    ],
    isMeaning: true,
  },
  {
    type: 'write',
    prompt: 'This cricket chirps once a year at midnight to signal the start of Christmas. Write a cron expression for this schedule.',
    answer: '0 0 25 12 *',
  },
  {
    type: 'mc',
    prompt: 'This cricket counts down to New Year by chirping every minute during the last hour of December 31st. Which expression matches this schedule?',
    answer: '* 23 31 12 *',
    options: ['* 23 31 12 *', '* 0 1 1 *', '0 23 31 12 *', '* 23 31 * *'],
  },
  {
    type: 'mc',
    prompt: 'This cricket marks Halloween with a single midnight chirp on October 31st. Which expression describes this schedule?',
    answer: '0 0 31 10 *',
    options: ['0 0 31 10 *', '0 0 10 31 *', '0 31 * 10 *', '0 0 31 * 10'],
  },
  {
    type: 'write',
    prompt: "This cricket celebrates April Fools' Day by chirping at the start of every hour throughout the entire day of April 1st. Write a cron expression for this schedule.",
    answer: '0 * 1 4 *',
  },
  {
    type: 'mc',
    prompt: 'This cricket chirps once a year at 6:07am on the 6th of July. Which cron expression describes this schedule?',
    answer: '7 6 6 7 *',
    options: ['7 6 6 7 *', '6 7 6 7 *', '7 6 7 6 *', '0 6 6 7 *'],
  },
]

export function getRandomQuestion(excludeIdx = -1) {
  let idx
  do {
    idx = Math.floor(Math.random() * practicePool.length)
  } while (idx === excludeIdx && practicePool.length > 1)
  return { question: practicePool[idx], idx }
}
