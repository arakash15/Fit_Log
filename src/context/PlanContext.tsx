"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Workout } from "@/lib/types";

export const PLAN_CAP = 5;
export interface PlanItem { workout: Workout; done: boolean }
interface Toast { id: number; msg: string; kind: "success" | "info" | "error" }

interface Ctx {
  plan: PlanItem[];
  saved: Workout[];
  ready: boolean;
  addToPlan: (w: Workout) => void;
  saveForLater: (w: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeSaved: (id: string) => void;
  toggleDone: (id: string) => void;
  inPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  notify: (msg: string, kind?: Toast["kind"]) => void;
}

const PlanCtx = createContext<Ctx | null>(null);
const KEY = "fitlog:v1";

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setPlan(d.plan ?? []);
        setSaved(d.saved ?? []);
      }
    } catch {}
    const t = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify({ plan, saved })); } catch {}
  }, [plan, saved, ready]);

  const notify = useCallback((msg: string, kind: Toast["kind"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const inPlan = (id: string) => plan.some((p) => p.workout.id === id);
  const isSaved = (id: string) => saved.some((w) => w.id === id);

  const addToPlan = (w: Workout) => {
    if (inPlan(w.id)) return notify(`${w.name} is already in today's plan`, "info");
    if (plan.length >= PLAN_CAP) return notify(`Plan is full — max ${PLAN_CAP} lifts for today`, "error");
    setPlan((p) => [...p, { workout: w, done: false }]);
    notify("Added to today's plan");
  };
  const saveForLater = (w: Workout) => {
    if (isSaved(w.id)) return notify(`${w.name} is already saved`, "info");
    setSaved((s) => [...s, w]);
    notify("Saved for later");
  };
  const removeFromPlan = (id: string) => {
    setPlan((p) => p.filter((x) => x.workout.id !== id));
    notify("Removed from today's plan", "info");
  };
  const removeSaved = (id: string) => {
    setSaved((s) => s.filter((x) => x.id !== id));
    notify("Removed from saved", "info");
  };
  const toggleDone = (id: string) => {
    const item = plan.find((p) => p.workout.id === id);
    if (!item) return;
    setPlan((p) => p.map((x) => (x.workout.id === id ? { ...x, done: !x.done } : x)));
    notify(item.done ? "Marked as not done" : "Nice work — marked as done!");
  };

  const color = { success: "border-accent", info: "border-sky-400", error: "border-red-500" };

  return (
    <PlanCtx.Provider value={{ plan, saved, ready, addToPlan, saveForLater, removeFromPlan, removeSaved, toggleDone, inPlan, isSaved, notify }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`pointer-events-auto animate-toastIn rounded-md border-l-4 ${color[t.kind]} bg-panel px-4 py-3 text-sm font-medium shadow-xl ring-1 ring-line`}>
            {t.msg}
          </div>
        ))}
      </div>
    </PlanCtx.Provider>
  );
}

export function usePlan() {
  const c = useContext(PlanCtx);
  if (!c) throw new Error("usePlan must be used inside PlanProvider");
  return c;
}
