"use client"

import { DataTable } from "./data-table";
import { columns } from "./column";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"
import http from "@/lib/http";
import PageLoader from "@/components/layouts/PageLoader";
import ContentLoader, { TableLoader } from "@/components/layouts/TableLoader";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";

export default function CategoriesPage() {

    const { toast } = useToast();

    const [isLoading, setIsloading] = useState(true);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { status, data, message } } = await http.get('categories');

                if (status) {
                    setPageData(data);
                } else {
                    toast({
                        title: message,
                        variant: "destructive"
                    })
                }
            } catch (e) {
                const errMsg = error.response?.data?.message || error.message;
                console.error(errMsg)
                toast({
                    title: errMsg,
                    variant: "destructive"
                })
            } finally {
                setIsloading(false);
            }
        }

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <TableLoader rows={12} columns={4} />
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-start">
                <h1 className="text-2xl text-slate-800 font-semibold mb-6">Add Category</h1>
                <div>
                    <Link
                        href="/categories/add"
                        className={buttonVariants({ variant: "default", className: "flex items-center gap-x-1" })}
                    >
                        <PlusIcon className="w-4 h-4" /> Add Category
                    </Link>
                </div>
            </div>

            <div className="w-full">
                <DataTable columns={columns} data={pageData} />
            </div>
        </div>
    )

    /* return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={pageData} />
        </div>
    ) */
}
