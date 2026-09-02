interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
      <p className="text-[var(--color-error)] font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm px-4 py-2 rounded-[var(--radius-sm)] border border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
