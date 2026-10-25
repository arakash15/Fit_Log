import PlanClient from "@/components/PlanClient";

export const metadata = { title: "My Plan — FitLog" };

export default function MyPlanPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <PlanClient />
    </div>
  );
}
