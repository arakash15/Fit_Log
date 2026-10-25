import DetailClient from "@/components/DetailClient";

export default function WorkoutPage({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <DetailClient id={params.id} />
    </div>
  );
}
