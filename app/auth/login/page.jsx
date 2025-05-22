"use client"

import { LoginForm } from "@/components/auth/login-form";
import useAuthStore from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {

    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, router])

    return (
        <LoginForm />
    );
}