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


export default function CategoryFormSub({ register, errors, setValue, watch }) {

    const level = watch("level");

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="parentCategory" className="block text-sm font-medium mb-2">
                        Category Level
                    </label>
                    <Select
                        onValueChange={(value) => setValue("level", parseInt(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select parent category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">First Level</SelectItem>
                            <SelectItem value="2">Second Level</SelectItem>
                            <SelectItem value="3">Third Level</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.level && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.level.message}
                        </p>
                    )}
                </div>

                {[2, 3].includes(level) && (
                    <div>
                        <label htmlFor="parentCategory" className="block text-sm font-medium mb-2">
                            Main Category
                        </label>
                        <Select
                            onValueChange={(value) => setValue("main_category", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select main category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="electronics">Electronics</SelectItem>
                                <SelectItem value="clothing">Clothing</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.main_category && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.main_category.message}
                            </p>
                        )}
                    </div>
                )}

                {[3].includes(level) && (
                    <div>
                        <label htmlFor="parentCategory" className="block text-sm font-medium mb-2">
                            Sub Category
                        </label>
                        <Select
                            onValueChange={(value) => setValue("sub_category", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select parent category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="electronics">Electronics</SelectItem>
                                <SelectItem value="clothing">Clothing</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.sub_category && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.sub_category.message}
                            </p>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}
