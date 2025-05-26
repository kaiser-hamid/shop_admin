"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function CategoryFormMain({ register, errors, setValue }) {

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Category Name
                    </label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter category name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                        Description
                    </label>
                    <Textarea
                        id="description"
                        placeholder="Enter category description"
                        className="resize-none"
                        {...register("description")}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
