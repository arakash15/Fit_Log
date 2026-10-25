import { ClockIcon, FlameIcon, StarIcon } from "./Icons";
import type { Workout } from "@/lib/types";

export default function Stats({ w }: { w: Workout }) {
  return (
    <div className="flex items-center gap-4 text-xs text-muted">
      <span className="flex items-center gap-1"><ClockIcon className="text-accent" width={14} height={14} />{w.duration} min</span>
      <span className="flex items-center gap-1"><FlameIcon className="text-accent" width={14} height={14} />{w.calories} kcal</span>
      <span className="flex items-center gap-1"><StarIcon className="text-accent" width={14} height={14} />{w.rating}</span>
    </div>
  );
}
