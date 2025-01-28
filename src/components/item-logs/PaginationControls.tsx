import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationControlsProps) {
  if (totalPages <= 0) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} text-portal-neutral hover:text-portal-primary hover:bg-portal-light`}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => setCurrentPage(page)}
              isActive={currentPage === page}
              className={currentPage === page ? 'bg-portal-primary text-white' : 'text-portal-neutral hover:text-portal-primary hover:bg-portal-light'}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} text-portal-neutral hover:text-portal-primary hover:bg-portal-light`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}