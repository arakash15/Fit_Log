"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const links = [
    { href: "/", label: "Workout", active: pathname === "/" || pathname.startsWith("/workout") },
    { href: "/my-plan", label: "My Plan", active: pathname.startsWith("/my-plan") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="hidden font-display text-xl font-bold tracking-wider sm:inline">FITLOG</span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider transition sm:text-sm ${
                  l.active ? "bg-accent/10 text-accent" : "text-muted hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/my-plan" aria-label={`Plan: ${plan.length}`} className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-black">
            <span className="hidden sm:inline">Plan</span> {plan.length}
          </Link>
          <Link href="/my-plan" aria-label={`Saved: ${saved.length}`} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-bold hover:border-accent">
            <span className="hidden sm:inline">Saved</span> {saved.length}
          </Link>
        </div>
      </nav>
    </header>
  );
}
