"use client"

import ProductFormMain from "@/components/products/product-form-main"
import ProductFormSidebar from "@/components/products/product-form-sidebar"
import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/ButtonLoader"
import { useToast } from "@/hooks/use-toast"
import http from "@/lib/http"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useState } from "react"
import * as yup from "yup"

/* Schema Validation */
const formSchema = yup.object({
    name: yup.string().required("Product name is required").max(255, "Product name must be less than 255 characters"),
    brand_id: yup.object().required("Brand is required"),
    categories: yup.array().of(yup.object()).required("At least one category is required").min(1, "At least one category is required"),
    size: yup.string().nullable(),

    galleries: yup.array().of(yup.object().shape({
        path: yup.mixed().required(),
        full_path: yup.string().required(),
    })).required("At least one gallery image is required").min(1, "At least one gallery image is required"),

    description: yup.string().required("Brief Description is required").test('is-not-empty', 'Brief Description is required', value => {
        if (!value) return false;
        // Remove HTML tags and check if there's actual content
        const strippedContent = value.replace(/<[^>]*>/g, '').trim();
        return strippedContent !== '';
    }),

    ingredients: yup.string().nullable(),
    how_to_use: yup.string().nullable(),
    meta_title: yup.string().nullable().max(255, "Meta title must be less than 255 characters"),
    meta_keywords: yup.array().nullable(),
    meta_description: yup.string().nullable().max(255, "Meta description must be less than 255 characters"),

    featured_image: yup.object().shape({
        path: yup.mixed().required(),
        full_path: yup.string().required(),
    }).required("Featured image is required"),

    status: yup.string().required("Status is required"),
});

export default function AddProduct() {
    const { toast } = useToast();
    const router = useRouter();

    /* const [imageGalleries, setImageGalleries] = useState([]);
    const [featured_image, setFeaturedImage] = useState(null); */

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(formSchema)
    });

    const onSubmit = async (data) => {
        try {
            const selectItems = ['brand_id'];
            const arrayOfSelectItems = ['categories', 'meta_keywords', 'tags'];
            const filesItems = ['featured_image'];
            const multiFilesItems = ['galleries'];

            const formData = new FormData();

            // Append all form fields to FormData
            Object.keys(data).forEach(key => {
                if (multiFilesItems.includes(key)) {

                    Array.from(data[key] ?? []).forEach(file => {
                        formData.append('galleries[]', file.path);
                    });

                } else if (arrayOfSelectItems.includes(key)) {

                    Array.from(data[key] ?? []).forEach(item => {
                        formData.append(`${key}[]`, item.value);
                    });

                } else if (selectItems.includes(key)) {
                    formData.append(key, data[key].value);
                } else if (filesItems.includes(key)) {
                    formData.append(key, data[key].path);
                } else {
                    formData.append(key, data[key]);
                }
            });

            const { data: { status, message } } = await http.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast({
                title: message,
                variant: status ? "success" : "destructive"
            });

            if (status) {
                router.push('/products')
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || error.message;
            console.error(errMsg)
            toast({
                title: errMsg,
                variant: "destructive"
            })
        }
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-start">
                    <h1 className="text-2xl text-slate-800 font-semibold mb-6">Add Product</h1>
                    <div>
                        <Button
                            type="submit"
                            className="w-[120px]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <ButtonLoader /> : "Add Product"}
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-6 lg:gap-8">
                    <div className="col-span-1 lg:col-span-5 rounded-lg p-6 shadow-md border border-slate-200">
                        <ProductFormMain
                            register={register}
                            setValue={setValue}
                            getValues={getValues}
                            watch={watch}
                            errors={errors}
                        />
                    </div>

                    <div className="col-span-1 lg:col-span-2 rounded-lg p-6 shadow-md border border-slate-200">
                        <ProductFormSidebar
                            register={register}
                            setValue={setValue}
                            watch={watch}
                            errors={errors}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}