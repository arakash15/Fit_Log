"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";
import { sortWorkouts } from "@/lib/api";
import type { SortKey, Workout } from "@/lib/types";
import { CheckIcon, PlusIcon, XIcon } from "./Icons";
import SortSelect from "./SortSelect";
import Spinner from "./Spinner";
import Stats from "./Stats";
import Thumb from "./Thumb";

type Tab = "plan" | "saved";

export default function PlanClient() {
  const { plan, saved, ready, removeFromPlan, removeSaved, toggleDone, addToPlan, inPlan } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortKey>("duration");

  const totals = useMemo(() => ({
    ex: plan.length,
    min: plan.reduce((a, p) => a + p.workout.duration, 0),
    kcal: plan.reduce((a, p) => a + p.workout.calories, 0),
  }), [plan]);

  const doneMap = useMemo(() => new Map(plan.map((p) => [p.workout.id, p.done])), [plan]);
  const items: Workout[] = useMemo(
    () => sortWorkouts(tab === "plan" ? plan.map((p) => p.workout) : saved, sort),
    [tab, plan, saved, sort]
  );

  const metrics = [["Exercises", totals.ex], ["Minutes", totals.min], ["Calories", totals.kcal]] as const;

  return (
    <>
      <h1 className="font-display text-4xl font-bold uppercase tracking-wide">My Plan</h1>
      <p className="mt-1 text-sm text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {metrics.map(([label, v]) => (
          <div key={label} className="rounded-xl border border-line bg-panel p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-accent sm:text-4xl">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2" role="tablist">
          {([["plan", "Today's Plan", plan.length], ["saved", "Saved", saved.length]] as const).map(([k, label, n]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${tab === k ? "bg-accent text-black" : "border border-line text-muted hover:text-white"}`}
            >
              {label} ({n})
            </button>
          ))}
        </div>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <div className="mt-5">
        {!ready ? (
          <Spinner />
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line py-16 text-center">
            <h2 className="font-display text-2xl uppercase tracking-wide">Nothing here yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="btn-primary mt-6">Go to workouts</Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((w) => {
              const done = doneMap.get(w.id);
              return (
                <li key={w.id} className={`flex flex-col gap-4 rounded-xl border bg-panel p-3 sm:flex-row sm:items-center ${done ? "border-accent/60" : "border-line"}`}>
                  <Thumb src={w.image} alt={w.name} className="h-32 w-full rounded-lg sm:h-20 sm:w-32 sm:shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-display text-lg font-semibold uppercase tracking-wide ${done ? "text-muted line-through" : ""}`}>{w.name}</h3>
                    <p className="mb-2 text-sm text-muted">{w.equipment}</p>
                    <Stats w={w} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/workout/${w.id}`} className="btn-ghost !px-3 !py-2">View Details</Link>
                    {tab === "plan" ? (
                      <button className="btn-primary !px-3 !py-2" onClick={() => toggleDone(w.id)}>
                        <CheckIcon /> {done ? "Done" : "Mark as Done"}
                      </button>
                    ) : (
                      <button className="btn-primary !px-3 !py-2" disabled={inPlan(w.id)} onClick={() => addToPlan(w)}>
                        <PlusIcon /> Add to Plan
                      </button>
                    )}
                    <button
                      aria-label={`Remove ${w.name}`}
                      className="rounded-md border border-line p-2 text-muted transition hover:border-red-500 hover:text-red-500"
                      onClick={() => (tab === "plan" ? removeFromPlan(w.id) : removeSaved(w.id))}
                    >
                      <XIcon />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
