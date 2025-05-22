"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import authService from "@/lib/auth-service"
import ButtonLoader from "@/components/ui/ButtonLoader"
import { useToast } from "@/hooks/use-toast"
import http from "@/lib/http"
import { useRouter } from "next/navigation"
import useAuthStore from "@/lib/auth-store"

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
}).required()

export function LoginForm({
  className,
  ...props
}) {

  const { toast } = useToast();
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema)
  });


  const onSubmit = async (data) => {
    try {
      const { data: { status, message, data: responseData } } = await http.post('/login', data);
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
    <div className="flex h-screen w-full items-center justify-center">
      <div className={cn("flex flex-col gap-6 min-w-[400px]", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Ruprong admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-0.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-0.5">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <ButtonLoader /> : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
