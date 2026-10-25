import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl uppercase tracking-wide">Page not found</h1>
      <p className="mt-2 text-muted">That rep doesn&apos;t exist. Let&apos;s get you back to the gym floor.</p>
      <Link href="/" className="btn-primary mt-6">Go to workouts</Link>
    </div>
  );
}
