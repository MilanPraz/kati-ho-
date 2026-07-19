"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/CategoryIcon";

export function ProductImage({
  imageUrl,
  alt,
  category,
  className = "h-14 w-14",
  iconSize = 22,
}: {
  imageUrl?: string | null;
  alt: string;
  category: string;
  className?: string;
  iconSize?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (!imageUrl || failed) {
    const Icon = CATEGORY_ICONS[category] ?? Package;
    return (
      <div
        className={`flex flex-shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary ${className}`}
      >
        <Icon size={iconSize} />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white ${className}`}
    >
      {/* Plain <img>, not next/image — listings are scraped from many
          unpredictable store domains, so a Next image loader allowlist
          isn't practical here. onError falls back to the icon above. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        onError={() => setFailed(true)}
        loading="lazy"
        className="h-full w-full object-contain p-1.5"
      />
    </div>
  );
}

// "use client";

// import { ImageOff, Smartphone } from "lucide-react";
// import { useState } from "react";
// import { cn } from "@/lib/utils";

// interface ProductImageProps {
//   imageUrl?: string | null;
//   alt: string;
//   category?: string;
//   badge?: string;
//   className?: string;
// }

// export function ProductImage({
//   imageUrl,
//   alt,
//   category,
//   badge,
//   className,
// }: ProductImageProps) {
//   const [hasError, setHasError] = useState(false);

//   const shouldShowImage = Boolean(imageUrl) && !hasError;

//   return (
//     <div
//       className={cn(
//         "group relative h-[82px] w-[82px] flex-shrink-0 overflow-hidden rounded-2xl",
//         "border border-line/80 bg-gradient-to-br from-white via-surface to-primary-light/40",
//         "shadow-[0_8px_24px_rgba(18,33,29,0.08)]",
//         className,
//       )}
//     >
//       {shouldShowImage ? (
//         // Using img is suitable here because scraped images can come
//         // from many different external domains.
//         // eslint-disable-next-line @next/next/no-img-element
//         <img
//           src={imageUrl!}
//           alt={alt}
//           loading="lazy"
//           referrerPolicy="no-referrer"
//           onError={() => setHasError(true)}
//           className="h-full w-full object-contain p-2.5 transition-transform duration-300 group-hover:scale-110"
//         />
//       ) : (
//         <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-muted-light">
//           {imageUrl ? (
//             <ImageOff className="h-6 w-6" strokeWidth={1.8} />
//           ) : (
//             <Smartphone className="h-7 w-7" strokeWidth={1.8} />
//           )}

//           <span className="max-w-[65px] truncate text-[9px] font-bold uppercase tracking-wide">
//             {category || "Product"}
//           </span>
//         </div>
//       )}

//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-white/25" />

//       {badge && (
//         <span className="absolute bottom-1.5 right-1.5 flex h-6 min-w-6 items-center justify-center rounded-lg border border-white/70 bg-primary px-1.5 text-[10px] font-extrabold text-white shadow-sm">
//           {badge}
//         </span>
//       )}
//     </div>
//   );
// }
