import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import http from "@/lib/http";

const variantSchema = yup.object().shape({
    sku: yup.string().required("SKU is required"),
    price: yup.string()
        .required("Price is required")
        .matches(/^\d*\.?\d{0,2}$/, "Price must be a valid number with up to 2 decimal places")
        .test('min', 'Price must be greater than 0', value => {
            if (!value) return false;
            return parseFloat(value) > 0;
        }),
    stock_quantity: yup.string()
        .optional()
        .matches(/^\d*\.?\d{0,2}$/, "Stock quantity must be a valid number with up to 2 decimal places")
        .test('min', 'Stock quantity cannot be negative', value => {
            if (!value) return true;
            return parseFloat(value) >= 0;
        }),
    discount_percentage: yup.string()
        .optional()
        .matches(/^\d*\.?\d{0,2}$/, "Discount must be a valid number with up to 2 decimal places")
        .test('range', 'Discount must be between 0 and 100', value => {
            if (!value) return true;
            const num = parseFloat(value);
            return num >= 0 && num <= 100;
        }),
});

export default function AddVariantModal({ showAddVariant, setShowAddVariant, product, setVariants }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
        formState: { errors },
    } = useForm({
        resolver: yupResolver(variantSchema)
    });

    // Handle adding new variant
    const onSubmit = async (data) => {
        try {
            const { data: { status, data: responseData, message } } = await http.post(`/product-variants/${product.id}`, data)

            if (status) {
                setVariants(prevVariants => [...prevVariants, responseData])//update the variants state
                setShowAddVariant(false)
                reset()
            }
            toast({
                title: message,
                variant: status ? "success" : "destructive"
            })
        } catch (error) {
            toast({
                title: error.response?.data?.message || error.message,
                variant: "destructive"
            })
            console.log('error', error.message);
        }
    }

    return (
        <Dialog open={showAddVariant} onOpenChange={setShowAddVariant}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Variant
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Variant</DialogTitle>
                    <DialogDescription>
                        Add a new variant for {product?.name}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sku" className="text-right">
                            SKU
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="sku"
                                {...register("sku")}
                                className={errors.sku ? "border-red-500" : ""}
                                placeholder="e.g. PROD-001-S"
                            />
                            {errors.sku && (
                                <p className="text-sm text-red-500 mt-1">{errors.sku.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="price"
                                type="text"
                                {...register("price")}
                                className={errors.price ? "border-red-500" : ""}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="discount_percentage" className="text-right">
                            Discount(%)
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="discount_percentage"
                                type="text"
                                {...register("discount_percentage")}
                                className={errors.discount_percentage ? "border-red-500" : ""}
                            />
                            {errors.discount_percentage && (
                                <p className="text-sm text-red-500 mt-1">{errors.discount_percentage.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock_quantity" className="text-right">
                            Stock Quantity
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="stock_quantity"
                                type="text"
                                {...register("stock_quantity")}
                                className={errors.stock_quantity ? "border-red-500" : ""}
                            />
                            {errors.stock_quantity && (
                                <p className="text-sm text-red-500 mt-1">{errors.stock_quantity.message}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setShowAddVariant(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add Variant'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}