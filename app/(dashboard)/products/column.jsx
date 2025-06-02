"use client"

import { Button } from "@/components/ui/button"
import ProductStatusBadge from "@/components/ui/ProductStatusBadge"
import Image from "next/image"

const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

export const columns = [
    {
        accessorKey: "featured_image",
        header: "Product Image",
        cell: ({ row }) => (
            <div className="w-20 h-20 relative shadow-md rounded-md overflow-hidden">
                <Image
                    src={row.original.featured_image || '/assets/images/placeholder.jpg'}
                    alt="Product Image"
                    fill
                    className="object-cover rounded-md"
                />
            </div>
        )
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <p className="flex flex-col gap-2 max-w-[320px] font-medium text-zinc-800">
                <a href={`${frontendUrl}/products/${row.original.slug}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">{row.original.name}</a>
                {row.original.size && (
                    <span className="text-xs text-slate-500">Size: {row.original.size}</span>
                )}
            </p>
        )
    },
    {
        accessorKey: "brand",
        header: "Brand"
    },
    {
        accessorKey: "categories",
        header: "Categories",
        cell: ({ row }) => <p className="max-w-[180px]">{row.original.categories?.map(cat => cat).join(', ') || '-'}</p>
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <ProductStatusBadge status={row.original.status} />
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/products/edit/${row.original.id}`}
                    >
                        Edit
                    </Button>
                </div>
            )
        }
    }
]