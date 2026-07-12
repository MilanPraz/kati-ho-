export function PillToggle({
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
      className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
        checked
          ? "border-primary bg-primary-light text-primary-dark"
          : "border-line bg-surface text-muted"
      }`}
    >
      {label}
    </button>
  );
}
