"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import ActiveStatusBadge from "@/components/ui/ActiveStatusBadge"

export const columns = [
    {
        accessorKey: "main_category",
        header: "Main Category"
    },
    {
        accessorKey: "sub_category",
        header: "Sub Category"
    },
    {
        accessorKey: "sub_sub_category",
        header: "Sub Sub Category"
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => <ActiveStatusBadge isActive={row.original.is_active} />
    },
]
