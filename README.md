# Cron Cricket 🦗

Learn to write cron expressions, one chirp at a time.

Cron Cricket is an interactive web app for learning cron expression syntax — inspired by [Flexbox Froggy](https://flexboxfroggy.com/). A friendly cricket character guides you through exercises that get progressively harder.

## Features

- **What is cron?** — A 13-slide read-and-learn tutorial covering the full 5-field cron syntax: wildcards, specific values, ranges, lists, step values, named days/months, and special strings.
- **Play Levels** — 30 guided levels across 5 chapters. Early levels use individual field inputs; later levels require the full expression. Chapters 4–5 introduce 6-field (seconds) and 7-field (year) expressions. Progress is saved in `localStorage`.
- **Free Practice** — Infinite random questions mixing typed expressions and multiple-choice. 5-field only.
- **Live next-run preview** — As you type, the app shows the next 6 scheduled run times for your expression.
- **Chirping cricket** — The SVG cricket character animates and chirps when you get an answer right.

## Tech stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [cron-parser](https://github.com/harrisiirak/cron-parser) for expression validation and next-run-time calculation
- No backend — fully static, deployable to Vercel or any static host

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Deploying to Vercel

```bash
npm run build
```

Or connect the repo to Vercel — it will auto-detect Vite and deploy on push.

## Project structure

```
src/
  components/
    Cricket.jsx       # SVG cricket character with chirp animation
    NextRunTimes.jsx  # Shows next scheduled runs for an expression
  pages/
    Home.jsx          # Landing page with 3 mode buttons
    Tutorial.jsx      # Read-and-learn slideshow
    Levels.jsx        # Level selection grouped by chapter
    LevelPlay.jsx     # Individual level gameplay
    Practice.jsx      # Free practice mode
  data/
    tutorialContent.js   # Tutorial slide content
    levelData.js         # Level definitions and answers
    practiceQuestions.js # Free practice question pool
  utils/
    cronValidator.js  # Expression validation and equivalence checking
    storage.js        # localStorage progress helpers
```
