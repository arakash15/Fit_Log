# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

## Technologies
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- React Context + `localStorage` for state persistence

## Features
1. **Workout library** — responsive 3-column grid of workouts fetched from the FitLog API (with automatic fallback to the alternate API), with a loading animation.
2. **Sort & search** — sort by Duration, Calories or Rating; search by name or tag.
3. **Workout details** — two-column layout with key specs and step-by-step instructions.
4. **Today's Plan & Saved** — add/save lifts with toast notifications, live navbar badges, and a 5-lift cap.
5. **My Plan dashboard** — live Exercises / Minutes / Calories metrics, Mark as Done, remove, and empty states.
6. **Persistent & responsive** — plan survives reloads; works on mobile, tablet and desktop; custom 404 page.

## Getting started
```bash
npm install
npm run dev
```
Build for production with `npm run build && npm start`. Deploy on Vercel (zero config).

## Links
- Live: _add link_
- Repo: _add link_
