import { Button } from "@/components/ui/button"

export const Pagination = ({ table }) => {
    return (
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
    )
}