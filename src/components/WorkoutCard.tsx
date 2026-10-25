import Link from "next/link";
import type { Workout } from "@/lib/types";
import Stats from "./Stats";
import Thumb from "./Thumb";

export default function WorkoutCard({ w }: { w: Workout }) {
  return (
    <Link
      href={`/workout/${w.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition hover:-translate-y-1 hover:border-accent"
    >
      <Thumb src={w.image} alt={w.name} className="aspect-[16/9] w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-2">
          {w.categories.map((c) => (
            <span key={c} className="rounded bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">{c}</span>
          ))}
        </div>
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{w.name}</h3>
        <p className="text-sm text-muted">{w.equipment}</p>
        <div className="mt-auto pt-2"><Stats w={w} /></div>
      </div>
    </Link>
  );
}
