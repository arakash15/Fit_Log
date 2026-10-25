"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchWorkouts, sortWorkouts } from "@/lib/api";
import type { SortKey, Workout } from "@/lib/types";
import SortSelect from "./SortSelect";
import Spinner from "./Spinner";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [data, setData] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState<SortKey>("duration");
  const [q, setQ] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let off = false;
    setLoading(true);
    setError("");
    fetchWorkouts()
      .then((d) => !off && setData(d))
      .catch(() => !off && setError("Couldn't load workouts. Please try again."))
      .finally(() => !off && setLoading(false));
    return () => { off = true; };
  }, [attempt]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    const f = t ? data.filter((w) => w.name.toLowerCase().includes(t) || w.categories.some((c) => c.toLowerCase().includes(t))) : data;
    return sortWorkouts(f, sort);
  }, [data, sort, q]);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-14 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">The Library</h2>
          <p className="mt-1 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or tag"
            aria-label="Search workouts"
            className="w-full rounded-md border border-line bg-panel px-3 py-2 text-sm placeholder:text-muted focus:border-accent focus:outline-none sm:w-52"
          />
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="py-20 text-center">
          <p className="mb-4 text-muted">{error}</p>
          <button className="btn-primary" onClick={() => setAttempt((a) => a + 1)}>Retry</button>
        </div>
      ) : list.length === 0 ? (
        <p className="py-20 text-center text-muted">No workouts match your search.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((w) => <WorkoutCard key={w.id} w={w} />)}
        </div>
      )}
    </section>
  );
}
