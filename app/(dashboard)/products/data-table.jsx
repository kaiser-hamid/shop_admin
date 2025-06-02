"use client"
import React, { useEffect, useState } from "react"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import { useToast } from "@/hooks/use-toast"
import http from "@/lib/http"
import { Button } from "@/components/ui/button"

export function DataTable({ columns, initialData, initialTotalItems, pageSize }) {
    const { toast } = useToast()
    const [data, setData] = useState(initialData)
    const [totalItems, setTotalItems] = useState(initialTotalItems)
    const [globalFilter, setGlobalFilter] = useState("")
    const [pageIndex, setPageIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const debouncedFilter = useDebounce(globalFilter, 500)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualFiltering: true,
        pageCount: Math.ceil(totalItems / pageSize),
        state: {
            globalFilter,
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const newState = updater({
                    pageIndex,
                    pageSize,
                })
                setPageIndex(newState.pageIndex)
            }
        },
    })

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const { data: { status, data, message } } = await http.get('products', {
                    params: {
                        page: pageIndex + 1,
                        search: debouncedFilter
                    }
                })

                if (status) {
                    setData(data.data)
                    setTotalItems(data.total)
                } else {
                    setData([]);
                    setTotalItems(0);
                    toast({
                        title: message,
                        variant: "destructive"
                    })
                }
            } catch (error) {
                setData([]);
                setTotalItems(0);
                const errMsg = error.response?.data?.message || error.message
                toast({
                    title: errMsg,
                    variant: "destructive"
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [pageIndex, debouncedFilter])

    return (
        <div>
            {/* Filter */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search products by name, brand, or category."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-nowrap">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}