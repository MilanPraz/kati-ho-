import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-6 py-20 text-center">
      <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
        <Icon size={26} />
      </div>
      <h3 className="text-lg font-extrabold">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted">
        {description}
      </p>
      {action}
    </div>
  );
}
