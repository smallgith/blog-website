import { Button } from "./button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3 sm:flex-row">
      <Button variant="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)} size="sm">
        Previous
      </Button>
      <span className="text-sm font-medium text-slate-600">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="secondary"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        size="sm"
      >
        Next
      </Button>
    </div>
  );
}
