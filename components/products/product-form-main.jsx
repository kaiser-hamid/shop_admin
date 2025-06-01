"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SelectMultiCreatable, SelectSearchable, AsyncSelectSearchable } from "@/components/ui/react-select"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FileUploadCardMultiple from "../cards/FileUploadCardMultiple"
import QuillEditor from "@/components/ui/quill-editor"
import { AsteriskIcon } from "lucide-react"

export default function ProductFormMain({ register, errors, setValue, getValues, watch }) {

    const handleGalleriesChange = (ctx) => {
        const galleryImages = getValues('galleries') || [];
        galleryImages.push(...ctx.target.value)
        setValue('galleries', galleryImages)
    }

    const handleGalleriesDelete = (markedImages) => {
        console.log('markedImages', markedImages)
        const galleryImages = getValues('galleries') || [];
        console.log('galleryImages', galleryImages)
        const remainingImages = galleryImages.filter((_, index) => !markedImages.includes(index.toString()));
        console.log('remainingImages', remainingImages)
        setValue('galleries', remainingImages)
    }


    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {/* Product Name */}
                <div>
                    <label htmlFor="name" className="flex items-center gap-0.5 text-sm font-medium mb-2">
                        Product Name
                        <AsteriskIcon className="h-4 w-4 text-red-500" />
                    </label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter product name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Brand Selection */}
                <div>
                    <label htmlFor="brand_id" className="flex items-center gap-0.5 text-sm font-medium mb-2">
                        Brand
                        <AsteriskIcon className="h-4 w-4 text-red-500" />
                    </label>
                    <AsyncSelectSearchable
                        value={watch("brand_id")}
                        onChange={(selected) => setValue("brand_id", selected)}
                        apiEndpoint="/brands/search"
                        placeholder="Type to search for a brand"
                    />
                    {errors.brand_id && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.brand_id.message}
                        </p>
                    )}
                </div>

                {/* Categories Selection */}
                <div>
                    <label htmlFor="categories" className="flex items-center gap-0.5 text-sm font-medium mb-2">
                        Categories
                        <AsteriskIcon className="h-4 w-4 text-red-500" />
                    </label>
                    <AsyncSelectSearchable
                        value={watch("categories")}
                        onChange={(selected) => setValue("categories", selected)}
                        apiEndpoint="/categories/search"
                        isMulti={true}
                        placeholder="Type to search for a category"
                    />
                    {errors.categories && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.categories.message}
                        </p>
                    )}
                </div>

                {/* Image Galleries */}
                <div>
                    <FileUploadCardMultiple
                        heading="Image Galleries"
                        name="galleries"
                        onChange={handleGalleriesChange}
                        onDelete={handleGalleriesDelete}
                        paths={watch('galleries')?.map(item => item.full_path) || []}
                        required={true}
                    />
                    {errors.galleries && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.galleries.message}
                        </p>
                    )}
                </div>

                {/* Brief Description */}
                <div>
                    <label htmlFor="description" className="flex items-center gap-0.5 text-sm font-medium mb-2">
                        Brief Description
                        <AsteriskIcon className="h-4 w-4 text-red-500" />
                    </label>
                    <QuillEditor
                        value={watch("description")}
                        onChange={(value) => setValue("description", value)}
                        placeholder="Type brief description here.."
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Ingredients */}
                <div>
                    <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
                        Ingredients
                    </label>
                    <QuillEditor
                        value={watch("ingredients")}
                        onChange={(value) => setValue("ingredients", value)}
                        placeholder="Type ingredients here.."
                    />
                    {errors.ingredients && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.ingredients.message}
                        </p>
                    )}
                </div>

                {/* How to Use */}
                <div>
                    <label htmlFor="how_to_use" className="block text-sm font-medium mb-2">
                        How to Use
                    </label>
                    <QuillEditor
                        value={watch("how_to_use")}
                        onChange={(value) => setValue("how_to_use", value)}
                        placeholder="Type usage instructions here.."
                    />
                    {errors.how_to_use && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.how_to_use.message}
                        </p>
                    )}
                </div>

                {/* Tags */}
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium mb-2">
                        Tags
                    </label>
                    <SelectMultiCreatable
                        options={[]}
                        value={watch("tags")}
                        onChange={(selected) => setValue("tags", selected)}
                        placeholder="Type and press tab to add tags"
                    />
                    {errors.tags && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.tags.message}
                        </p>
                    )}
                </div>

                {/* Meta data */}
                <div className="space-y-4 pt-12">
                    {/* Meta Title */}
                    <div>
                        <label htmlFor="meta_title" className="block text-sm font-medium mb-2">
                            Meta Title
                        </label>
                        <Input
                            id="meta_title"
                            type="text"
                            placeholder="Enter meta title"
                            {...register("meta_title")}
                        />
                        {errors.meta_title && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.meta_title.message}
                            </p>
                        )}
                    </div>

                    {/* Meta Keywords */}
                    <div>
                        <label htmlFor="meta_keywords" className="block text-sm font-medium mb-2">
                            Meta Keywords
                        </label>
                        <SelectMultiCreatable
                            options={[]}
                            value={watch("meta_keywords")}
                            onChange={(selected) => setValue("meta_keywords", selected)}
                            placeholder="Type and press tab to add keywords"
                        />
                        {errors.meta_keywords && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.meta_keywords.message}
                            </p>
                        )}
                    </div>

                    {/* Meta Description */}
                    <div>
                        <label htmlFor="meta_description" className="block text-sm font-medium mb-2">
                            Meta Description
                        </label>
                        <Textarea
                            id="meta_description"
                            placeholder="Enter meta description"
                            className="resize-none"
                            {...register("meta_description")}
                        />
                        {errors.meta_description && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.meta_description.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 