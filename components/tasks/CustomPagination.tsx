"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function CustomPagination({
  page,
  totalPages,
  onPageChange,
  className,
}: CustomPaginationProps) {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            data-testid="pagination-previous"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className={isFirstPage ? "cursor-not-allowed" : "cursor-pointer"}
          />
        </PaginationItem>

        <PaginationItem>
          <span className="text-sm text-muted-foreground px-4">
            Page {page} of {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            data-testid="pagination-next"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            className={isLastPage ? "cursor-not-allowed" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
