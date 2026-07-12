import type { ReactNode } from "react";

export function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-line pt-5 first:border-t-0 first:pt-0">
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-light">
        {title}
      </h4>
      {children}
    </div>
  );
}
