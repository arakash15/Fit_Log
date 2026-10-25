"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchWorkout } from "@/lib/api";
import type { Workout } from "@/lib/types";
import { PLAN_CAP, usePlan } from "@/context/PlanContext";
import { BookmarkIcon, PlusIcon } from "./Icons";
import Spinner from "./Spinner";
import Thumb from "./Thumb";

export default function DetailClient({ id }: { id: string }) {
  const [w, setW] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const { plan, addToPlan, saveForLater, inPlan, isSaved } = usePlan();

  useEffect(() => {
    let off = false;
    setLoading(true);
    fetchWorkout(id)
      .then((d) => !off && setW(d))
      .catch(() => !off && setFailed(true))
      .finally(() => !off && setLoading(false));
    return () => { off = true; };
  }, [id]);

  if (loading) return <Spinner label="Loading workout…" />;
  if (failed || !w)
    return (
      <div className="py-24 text-center">
        <h1 className="font-display text-3xl uppercase">Workout not found</h1>
        <Link href="/" className="btn-primary mt-6">Back to library</Link>
      </div>
    );

  const specs: [string, string][] = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.calories} kcal`],
    ["Rating", String(w.rating)],
  ];
  const full = plan.length >= PLAN_CAP && !inPlan(w.id);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Thumb src={w.image} alt={w.name} className="aspect-square w-full rounded-xl border border-line md:sticky md:top-24 md:self-start" />

      <div>
        <h1 className="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">{w.name}</h1>
        <p className="mt-2 text-muted">{w.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {w.categories.map((c) => (
            <span key={c} className="rounded bg-accent px-2 py-0.5 text-xs font-bold uppercase text-black">{c}</span>
          ))}
        </div>

        <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-panel">
          {specs.map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-3 text-sm">
              <dt className="font-semibold uppercase tracking-wider text-muted">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 font-display text-xl font-semibold uppercase tracking-wide">Instructions</h2>
        <ol className="mt-3 space-y-3">
          {w.instructions.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">{i + 1}</span>
              <span className="pt-0.5 text-gray-300">{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button className="btn-primary" disabled={full} onClick={() => addToPlan(w)}>
            <PlusIcon /> {inPlan(w.id) ? "In today's plan" : full ? "Plan is full" : "Add to today's plan"}
          </button>
          <button className="btn-ghost" onClick={() => saveForLater(w)}>
            <BookmarkIcon /> {isSaved(w.id) ? "Saved" : "Save for later"}
          </button>
        </div>
      </div>
    </div>
  );
}
