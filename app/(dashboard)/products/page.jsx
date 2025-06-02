"use client"

import { DataTable } from "./data-table"
import { columns } from "./column"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import http from "@/lib/http"
import { TableLoader } from "@/components/layouts/TableLoader"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

export default function ProductsPage() {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [initialData, setInitialData] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [pageSize, setPageSize] = useState(20) // Default value, will be updated from API

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const { data: { status, data, message } } = await http.get('products', {
                    params: {
                        page: 1
                    }
                })

                if (status) {
                    setInitialData(data.data)
                    setTotalItems(data.total)
                    setPageSize(data.per_page) // Get page size from API response
                } else {
                    toast({
                        title: message,
                        variant: "destructive"
                    })
                }
            } catch (error) {
                const errMsg = error.response?.data?.message || error.message
                toast({
                    title: errMsg,
                    variant: "destructive"
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchInitialData()
    }, [])

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <TableLoader rows={12} columns={6} />
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-start">
                <h1 className="text-2xl text-slate-800 font-semibold mb-6">Product List</h1>
                <div>
                    <Link
                        href="/products/add"
                        className={buttonVariants({ variant: "default", className: "flex items-center gap-x-1" })}
                    >
                        <PlusIcon className="w-4 h-4" /> Add Product
                    </Link>
                </div>
            </div>

            <div className="w-full">
                <DataTable
                    columns={columns}
                    initialData={initialData}
                    initialTotalItems={totalItems}
                    pageSize={pageSize}
                />
            </div>
        </div>
    )
}