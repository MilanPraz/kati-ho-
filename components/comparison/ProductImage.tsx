"use client";

import { ImageOff, Smartphone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  imageUrl?: string | null;
  alt: string;
  category?: string;
  badge?: string;
  className?: string;
}

export function ProductImage({
  imageUrl,
  alt,
  category,
  badge,
  className,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  const shouldShowImage = Boolean(imageUrl) && !hasError;

  return (
    <div
      className={cn(
        "group relative h-[82px] w-[82px] flex-shrink-0 overflow-hidden rounded-2xl",
        "border border-line/80 bg-gradient-to-br from-white via-surface to-primary-light/40",
        "shadow-[0_8px_24px_rgba(18,33,29,0.08)]",
        className,
      )}
    >
      {shouldShowImage ? (
        // Using img is suitable here because scraped images can come
        // from many different external domains.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl!}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="h-full w-full object-contain p-2.5 transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-muted-light">
          {imageUrl ? (
            <ImageOff className="h-6 w-6" strokeWidth={1.8} />
          ) : (
            <Smartphone className="h-7 w-7" strokeWidth={1.8} />
          )}

          <span className="max-w-[65px] truncate text-[9px] font-bold uppercase tracking-wide">
            {category || "Product"}
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-white/25" />

      {badge && (
        <span className="absolute bottom-1.5 right-1.5 flex h-6 min-w-6 items-center justify-center rounded-lg border border-white/70 bg-primary px-1.5 text-[10px] font-extrabold text-white shadow-sm">
          {badge}
        </span>
      )}
    </div>
  );
}
