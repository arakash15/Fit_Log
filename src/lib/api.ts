import type { SortKey, Workout } from "./types";

const BASES = [
  "https://api.abcz.workers.dev",
  "https://api.api-store.workers.dev",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const num = (v: any): number => {
  const n = parseFloat(String(v ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const toList = (v: any): string[] => {
  if (Array.isArray(v))
    return v
      .map((x) => (typeof x === "string" ? x : x?.text ?? x?.step ?? x?.name ?? ""))
      .filter(Boolean);
  if (typeof v === "string" && v.trim())
    return v.split(/\r?\n|\|\||;|(?<=\.)\s+(?=\d+\.)/).map((s) => s.replace(/^\d+[.)]\s*/, "").trim()).filter(Boolean);
  return [];
};

export function normalize(r: any): Workout {
  const cats = r.categories ?? r.category ?? r.tags ?? r.muscleGroups ?? r.muscles ?? [];
  const equipment = r.equipment ?? r.equipments ?? "";
  return {
    id: String(r.id ?? r._id ?? r.slug ?? ""),
    name: String(r.name ?? r.title ?? "Workout"),
    image: r.image ?? r.imageUrl ?? r.thumbnail ?? r.img ?? r.photo ?? "",
    categories: toList(cats),
    equipment: Array.isArray(equipment) ? equipment.join(", ") : String(equipment),
    difficulty: String(r.difficulty ?? r.level ?? "—"),
    sets: String(r.sets ?? "—"),
    reps: String(r.reps ?? "—"),
    duration: num(r.duration ?? r.durationMin ?? r.minutes),
    calories: num(r.calories ?? r.kcal),
    rating: num(r.rating),
    description: String(r.description ?? r.subtitle ?? r.summary ?? ""),
    instructions: toList(r.instructions ?? r.steps),
  };
}

async function getJson(path: string): Promise<any> {
  let lastErr: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { cache: "no-store" });
      if (res.ok) return await res.json();
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error("Request failed");
}

const unwrapList = (j: any): any[] =>
  Array.isArray(j) ? j : j?.data ?? j?.workouts ?? j?.fitlog ?? j?.items ?? j?.results ?? [];

export async function fetchWorkouts(): Promise<Workout[]> {
  return unwrapList(await getJson("/api/fitlog")).map(normalize);
}

export async function fetchWorkout(id: string): Promise<Workout> {
  try {
    const j = await getJson(`/api/fitlog/${id}`);
    const raw = j?.data && !Array.isArray(j.data) ? j.data : j;
    if (raw && !Array.isArray(raw) && (raw.name || raw.title)) return normalize(raw);
  } catch {
    /* fall through to list lookup */
  }
  const found = (await fetchWorkouts()).find((w) => w.id === String(id));
  if (!found) throw new Error("Workout not found");
  return found;
}

export function sortWorkouts(list: Workout[], key: SortKey): Workout[] {
  const copy = [...list];
  copy.sort((a, b) => (key === "duration" ? a.duration - b.duration : b[key] - a[key]));
  return copy;
}
