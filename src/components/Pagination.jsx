"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    return (
        <div className="flex justify-center items-center mt-8 gap-2">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                aria-label="Previous page"
            >
                <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage === page ? "bg-blue-600 text-white" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                aria-label="Next page"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    )
}

export default Pagination

