interface LoadingSkeletonProps {
  rows?: number;
}

export default function LoadingSkeleton({ rows = 3 }: LoadingSkeletonProps) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-14 rounded-[var(--radius-md)] bg-[var(--color-surface)] animate-pulse"
        />
      ))}
    </div>
  );
}
