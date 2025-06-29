"use client"

import { Button } from "@/components/ui/button"
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";
import PaymentStatusBadge from "@/components/ui/PaymentStatusBadge";
import ProductStatusBadge from "@/components/ui/ProductStatusBadge"
import Image from "next/image"
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

export const columns = [
    {
        accessorKey: "order_number",
        header: "Customer Info",
        cell: ({ row }) => (
            <p className="flex flex-col gap-0.5 max-w-[320px] font-medium text-zinc-800">
                <span className="text-sm font-semibold text-zinc-700 whitespace-nowrap">Order No: <span className="text-zinc-800">#{row.original.order_number}</span></span>
                <span className="text-xs text-slate-500">Name: {row.original.customer_name}</span>
                <span className="text-xs text-slate-500">Phone: {row.original.customer_phone}</span>
                {row.original.transaction_number && (
                    <span className="text-xs text-slate-500">Transaction No.: {row.original.transaction_number}</span>
                )}
            </p>
        )
    },
    {
        accessorKey: "items",
        header: "Items",
        cell: ({ row }) => (
            <p className="flex flex-col font-medium text-zinc-800">
                {row.original.items?.map((item, index) => (
                    <span key={index} className="flex justify-between gap-x-1 text-xs text-slate-500">
                        <Popover>
                            <PopoverTrigger asChild>
                                <button type="button" className="max-w-[150px] truncate  cursor-pointer">
                                    {item.product_name}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex gap-x-1 justify-between text-xs font-medium text-zinc-800">
                                    <p>{item.product_name}</p>
                                    <p>-</p>
                                    <p>×{item.quantity}</p>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <span>-</span>
                        <span>x{item.quantity}</span>
                    </span>
                )) || "No items"}
            </p>
        )
    },
    {
        accessorKey: "total_amount",
        header: "Amount",
        cell: ({ row }) => (
            <p className="flex flex-col max-w-[320px] font-medium text-zinc-800">
                <span className="flex justify-between gap-x-4 text-xs text-slate-500 whitespace-nowrap">
                    <span>Subtotal:</span>
                    <span className="text-slate-700">{row.original.subtotal}</span>
                </span>
                <span className="flex justify-between gap-x-4 text-xs text-slate-500 whitespace-nowrap">
                    <span>Discount:</span>
                    <span className="text-slate-700">{row.original.discount_amount}</span>
                </span>
                <span className="flex justify-between gap-x-4 text-xs text-slate-500 whitespace-nowrap">
                    <span>Delivery Fee:</span>
                    <span className="text-slate-700">{row.original.shipping_cost}</span>
                </span>
                <span className="flex justify-between gap-x-4 text-xs text-slate-500 whitespace-nowrap">
                    <span>Total:</span>
                    <span className="text-slate-700">{row.original.total_amount}</span>
                </span>
            </p>
        )
    },
    {
        accessorKey: "shipping_address",
        header: "Shipping Address"
    },
    {
        accessorKey: "payment_status",
        header: "Payment Status",
        cell: ({ row }) => <PaymentStatusBadge status={row.original.payment_status} />
    },
    {
        accessorKey: "order_status",
        header: "Order Status",
        cell: ({ row }) => <OrderStatusBadge status={row.original.order_status} />
    },
    {
        accessorKey: "order_date",
        header: "Order Date",
        cell: ({ row }) => (
            <p className="flex flex-col gap-0.5 max-w-[320px] font-medium text-zinc-800">
                <span className="text-xs text-slate-500">{row.original.order_date?.date}</span>
                <span className="text-xs text-slate-500">{row.original.order_date?.time}</span>
            </p>
        )
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="btn btn-outline"
                        onClick={() => alert("Upcoming feature")}
                    >
                        Click me
                    </Button>
                </div>
            )
        }
    }
]