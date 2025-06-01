"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import ActiveStatusBadge from "@/components/ui/ActiveStatusBadge"

export const columns = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "is_featured",
        header: "Featured Brand"
    },
    {
        accessorKey: "is_top",
        header: "Top Brand"
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => <ActiveStatusBadge isActive={row.original.is_active} />
    },
]
