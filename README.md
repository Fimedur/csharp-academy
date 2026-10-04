# C# Academy

An interactive website for learning C# — from beginner to advanced.

## Features
- **13 lessons** across Beginner, Intermediate and Advanced paths
- **Animated topic views** — step-by-step visualisations synced with highlighted code
  (memory boxes, flowcharts, loop counters, call stacks, heap objects, LINQ pipelines, async timelines…)
- **Quizzes** after each lesson with instant feedback (≥70% marks the lesson complete)
- **Progress tracking** saved in the browser (localStorage)
- **Searchable cheat sheet** with copy buttons
- Light / dark theme, mobile friendly

## Run it
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
```

## Project structure
```
src/
  data/lessons.js        ← lesson text, code samples and quiz questions
  data/cheatsheet.js     ← cheat sheet snippets
  animations/            ← one animation per topic (code + steps + View)
  components/            ← CodeBlock, AnimationPlayer, Quiz
  hooks/useProgress.jsx  ← progress state + localStorage
  pages/                 ← Home, Lessons, Lesson, CheatSheet, Progress
```

## Adding a lesson
1. Add an entry to `LESSONS` in `src/data/lessons.js`.
2. Create an animation object `{ code, steps, View }` in `src/animations/` and register it in `src/animations/index.js`.
   Each step is `{ line, caption, state }` — `line` highlights the code, `state` is passed to your `View`.
