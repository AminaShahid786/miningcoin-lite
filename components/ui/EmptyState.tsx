interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-1 py-10 px-4">
      <p className="text-[var(--color-text)] font-medium">{title}</p>
      {description && (
        <p className="text-[var(--color-text-muted)] text-sm">{description}</p>
      )}
    </div>
  );
}
