import { Button } from "@/components/ui/button"
import ReactPaginate from "react-paginate"

export const PaginationForDataTable = ({ table }) => {
    const handlePageClick = (event) => {
        table.setPageIndex(event.selected)
    }

    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            twertwer
            {/* 
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={table.getPageCount()}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                containerClassName="flex items-center gap-2"
                pageClassName="flex items-center justify-center"
                pageLinkClassName="px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                activeClassName="bg-primary text-primary-foreground"
                previousClassName="flex items-center justify-center"
                previousLinkClassName="px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                nextClassName="flex items-center justify-center"
                nextLinkClassName="px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                disabledClassName="opacity-50 cursor-not-allowed"
                breakClassName="px-3 py-2 text-sm"
            /> */}
        </div>
    )
    /* return (
        <div className="flex items-center justify-end space-x-2 py-4 lg:py-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <div className="flex items-center gap-1">
                {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={table.getState().pagination.pageIndex + 1 === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => table.setPageIndex(page - 1)}
                    >
                        {page}
                    </Button>
                ))}
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    ) */
}