"use client"

import CategoryFormMain from "@/components/categories/category-form-main"
import CategoryFormSub from "@/components/categories/category-form-sub";
import { Button } from "@/components/ui/button"
import ButtonLoader from "@/components/ui/ButtonLoader";
import { useToast } from "@/hooks/use-toast";
import http from "@/lib/http";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup"

/* Schema Validation */
const formSchema = yup.object({
    name: yup.string().required("Category name is required"),
    level: yup.number().required("Level is required"),
    main_category: yup.string().when('level', {
        is: (level) => [2, 3].includes(level),
        then: (schema) => schema.required("Main category is required"),
        otherwise: (schema) => schema.optional()
    }),
    sub_category: yup.string().when('level', {
        is: (level) => [3].includes(level),
        then: (schema) => schema.required("Sub category is required"),
        otherwise: (schema) => schema.optional()
    }),
    description: yup.string().optional(),
});
/* End of Schema Validation */

export default function AddCategory() {

    const { toast } = useToast();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(formSchema)
    });

    const onSubmit = async (data) => {
        try {
            const { data: { status, message, data: responseData } } = await http.post('/categories', data);
            toast({
                title: message,
                variant: status ? "success" : "destructive"
            });
            if (status) {
                setAuth({
                    user: responseData.user,
                    token: responseData.access_token
                })
                router.push('/dashboard')
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
                    <h1 className="text-2xl text-slate-800 font-semibold mb-6">Add Category</h1>
                    <div>
                        <Button
                            type="submit"
                            className="w-[120px]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <ButtonLoader /> : "Add Category"}
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-6 lg:gap-8">
                    <div className="col-span-1 lg:col-span-5 rounded-lg p-6 shadow-md border border-slate-200">
                        <CategoryFormMain register={register} errors={errors} setValue={setValue} />
                    </div>

                    <div className="col-span-1 lg:col-span-2 rounded-lg p-6 shadow-md border border-slate-200">
                        <CategoryFormSub register={register} errors={errors} setValue={setValue} watch={watch} />
                    </div>
                </div>
            </form>
        </div>
    )
}