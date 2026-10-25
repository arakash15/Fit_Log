export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-panel">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={24} height={24} />
          <span className="font-display text-lg font-bold tracking-wider">FITLOG</span>
        </div>
        <p className="text-xs text-muted sm:text-sm">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
