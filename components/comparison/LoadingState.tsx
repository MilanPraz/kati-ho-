import { Loader2 } from "lucide-react";

export function LoadingState({
  label = "Fetching the latest prices…",
}: {
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface py-24 text-center">
      <Loader2 className="animate-spin text-primary" size={28} />
      <p className="text-sm font-semibold text-muted">{label}</p>
    </div>
  );
}
