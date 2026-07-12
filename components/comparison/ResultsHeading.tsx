import { ArrowLeft } from "lucide-react";

export function ResultsHeading({
  query,
  loading,
  error,
  listingCount,
  groupCount,
  storeCount,
}: {
  query: string;
  loading: boolean;
  error: string | null;
  listingCount: number;
  groupCount: number;
  storeCount: number;
}) {
  return (
    <div className="mb-7 flex flex-col gap-1">
      <a
        href="/"
        className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted hover:text-primary"
      >
        <ArrowLeft size={15} /> Back to home
      </a>
      <h1 className="mt-2 text-2xl font-extrabold sm:text-[28px]">
        {query ? (
          <>
            Results for{" "}
            <span className="text-primary-dark">&ldquo;{query}&rdquo;</span>
          </>
        ) : (
          "Search for a product"
        )}
      </h1>
      {!loading && !error && query && (
        <p className="text-sm text-muted">
          {listingCount} listing{listingCount === 1 ? "" : "s"} across{" "}
          {groupCount} product
          {groupCount === 1 ? "" : "s"}
          {storeCount > 0 && ` from ${storeCount} stores`}
        </p>
      )}
    </div>
  );
}
