import * as React from "react"
import { cn } from "@/lib/utils"

const TableLoader = React.forwardRef(({ className, rows = 5, columns = 4, ...props }, ref) => {
    return (
        <div className="relative w-full overflow-auto">
            <table
                ref={ref}
                className={cn("w-full caption-bottom text-sm", className)}
                {...props}
            >
                <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors">
                        {Array.from({ length: columns }).map((_, index) => (
                            <th
                                key={index}
                                className="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                            >
                                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b transition-colors hover:bg-muted/50"
                        >
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="p-2 align-middle"
                                >
                                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
})

TableLoader.displayName = "TableLoader"

export { TableLoader }