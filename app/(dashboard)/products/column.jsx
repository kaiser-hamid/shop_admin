"use client"

import { Button } from "@/components/ui/button"
import ProductStatusBadge from "@/components/ui/ProductStatusBadge"
import Image from "next/image"
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

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
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full focus:ring-0 focus:outline-none">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/products/${row.original.id}/variants`} className="cursor-pointer">
                                    Manage Variants
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/products/${row.original.id}/edit`} className="cursor-pointer">
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]