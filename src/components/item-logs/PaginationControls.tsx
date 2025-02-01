import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 py-2 gap-2 text-sm font-medium rounded-lg border
              ${currentPage === 1 
                ? 'text-gray-300 border-gray-200 cursor-not-allowed' 
                : 'text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
        </PaginationItem>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg
                ${currentPage === page
                  ? 'bg-[#F5F8FF] text-[#1570EF] border-[#1570EF] border'
                  : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
            >
              {page}
            </button>
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 py-2 gap-2 text-sm font-medium rounded-lg border
              ${currentPage === totalPages 
                ? 'text-gray-300 border-gray-200 cursor-not-allowed' 
                : 'text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}