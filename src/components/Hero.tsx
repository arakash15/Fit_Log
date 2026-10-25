/* eslint-disable @next/next/no-img-element */
import { ArrowDownIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
      <div className="grid items-center gap-8 rounded-2xl border border-line bg-panel p-6 sm:p-10 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-accent">Workout Library</p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-4 max-w-lg text-sm text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a href="#library" className="btn-primary mt-6">
            Browse Workouts <ArrowDownIcon />
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <img src="/banner.png" alt="Muscle anatomy figure on a gym machine" className="h-auto w-56 sm:w-72 lg:w-80" />
        </div>
      </div>
    </section>
  );
}
