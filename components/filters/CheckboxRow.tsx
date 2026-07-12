import { CheckCircle2 } from "lucide-react";

export function CheckboxRow({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 text-left text-sm font-semibold text-ink"
    >
      <span
        className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] border transition-colors ${
          checked
            ? "border-primary bg-primary text-white"
            : "border-line bg-surface"
        }`}
      >
        {checked && <CheckCircle2 size={13} strokeWidth={3} />}
      </span>
      {label}
    </button>
  );
}
