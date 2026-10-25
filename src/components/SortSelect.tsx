import { ChevronDownIcon } from "./Icons";
import type { SortKey } from "@/lib/types";

export default function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
      Sort By
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="appearance-none rounded-md border border-line bg-panel py-2 pl-3 pr-9 text-sm normal-case tracking-normal text-white focus:border-accent focus:outline-none"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
      </span>
    </label>
  );
}
