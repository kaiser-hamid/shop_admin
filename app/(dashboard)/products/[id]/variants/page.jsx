"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import http from "@/lib/http"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrashIcon } from "lucide-react"
import { TableLoader } from "@/components/layouts/TableLoader"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import AddVariantModal from "./add-variant-modal"
import { useParams } from "next/navigation"

export default function ProductVariants() {
    const params = useParams();
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [variants, setVariants] = useState([])
    const [product, setProduct] = useState(null);

    const [showAddVariant, setShowAddVariant] = useState(false)


    // Fetch product and its variants
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { status, data } } = await http.get(`/product-variants/${params.id}`)
                if (status) {
                    setProduct(data.product)
                    setVariants(data.variants)
                }
            } catch (error) {
                toast({
                    title: error.response?.data?.message || "Failed to load variants",
                    variant: "destructive"
                })
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [params.id])

    // Quick update function for stock/price
    const handleQuickUpdate = async (variantId, field, value) => {

        // Check if the value is different from the current variant value
        const currentVariant = variants.find(v => v.id === variantId);
        if (!currentVariant) return;

        const currentValue = currentVariant[field];
        if (Number(currentValue) === Number(value)) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append(field, value);
            formData.append('_method', 'PATCH');
            const { data: { status, message } } = await http.post(`/product-variants/${variantId}`, formData);

            toast({
                title: message,
                variant: status ? "success" : "destructive"
            })
        } catch (error) {
            toast({
                title: error.response?.data?.message || "Update failed",
                variant: "destructive"
            })
        }
    }


    // Handle deleting variant
    const handleDeleteVariant = async (variantId) => {
        const variantsOriginal = [...variants];
        try {
            const filteredVariants = variantsOriginal.filter(v => v.id !== variantId);
            setVariants(filteredVariants);

            const formData = new FormData();
            formData.append('_method', 'DELETE');
            const { data: { status, message } } = await http.post(`/product-variants/${variantId}`, formData);

            if (!status) {
                setVariants(variantsOriginal);
            }

            toast({
                title: message,
                variant: status ? "success" : "destructive"
            })
        } catch (error) {
            toast({
                title: error.response?.data?.message || "Failed to delete variant",
                variant: "destructive"
            });
            setVariants(variantsOriginal);
        }
    }

    if (isLoading) {
        return <TableLoader rows={5} columns={5} />
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl text-slate-800 font-semibold">
                        Manage Variants - <span className="text-slate-500 font-medium">{product?.name}</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Quick update stock and price for each variant
                    </p>
                </div>
                {product && variants?.length === 0 &&
                    <AddVariantModal
                        showAddVariant={showAddVariant}
                        setShowAddVariant={setShowAddVariant}
                        product={product}
                        setVariants={setVariants}
                    />}

            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>SKU</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Discount(%)</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {variants.map((variant) => (
                            <TableRow key={variant.id}>
                                <TableCell>{variant.sku}</TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        defaultValue={variant.price}
                                        onBlur={(e) => handleQuickUpdate(variant.id, 'price', e.target.value)}
                                        onWheel={(e) => e.target.blur()}
                                        className="w-24"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        defaultValue={variant.discount_percentage}
                                        onBlur={(e) => handleQuickUpdate(variant.id, 'discount_percentage', e.target.value)}
                                        onWheel={(e) => e.target.blur()}
                                        className="w-24"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        defaultValue={variant.stock_quantity}
                                        onBlur={(e) => handleQuickUpdate(variant.id, 'stock_quantity', e.target.value)}
                                        onWheel={(e) => e.target.blur()}
                                        className="w-24"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleDeleteVariant.bind(null, variant.id)}
                                    >
                                        <TrashIcon className="w-4 h-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}