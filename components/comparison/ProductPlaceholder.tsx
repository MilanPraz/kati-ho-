import { Package } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/CategoryIcon";

export function ProductPlaceholder({
  category,
  className = "h-14 w-14",
}: {
  category: string;
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[category] ?? Package;
  return (
    <div
      className={`flex flex-shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary ${className}`}
    >
      <Icon size={22} />
    </div>
  );
}
