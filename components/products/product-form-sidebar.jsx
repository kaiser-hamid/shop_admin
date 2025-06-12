"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FileUploadCardSingle from "../cards/FileUploadCardSingle"

export default function ProductFormSidebar({ register, errors, setValue, watch }) {

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {/* Featured Image */}
                <div>
                    <FileUploadCardSingle heading="Featured Image" name="featured_image" onChange={(ctx) => setValue('featured_image', ctx.target.value)} path={watch('featured_image')?.full_path} />
                    {errors.featured_image && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.featured_image.message}
                        </p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-2">
                        Status
                    </label>
                    <Select
                        onValueChange={(value) => setValue("status", value)}
                        value={watch("status")}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.status && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.status.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
} 