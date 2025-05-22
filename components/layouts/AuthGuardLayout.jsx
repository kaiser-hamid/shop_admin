'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/lib/auth-store'
import authService from '@/lib/auth-service'
import PageLoader from '@/components/layouts/PageLoader'
import http from '@/lib/http'

export default function AuthGuardLayout({ children }) {
    const { isAuthenticated, token, logout } = useAuthStore()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const verifyAuth = async () => {
            // Check both Zustand store and localStorage for token
            const storedAuth = localStorage.getItem('auth-storage');
            const storedToken = storedAuth ? JSON.parse(storedAuth).state.token : null;

            if (!token && !storedToken) {
                router.push('/auth/login');
                return;
            }

            try {
                const { data: { status } } = await http.get('/me');
                if (status) {
                    setIsLoading(false);
                } else {
                    logout();
                    router.push('/auth/login');
                }
            } catch (error) {
                logout();
                router.push('/auth/login');
            }
        }

        verifyAuth();
    }, [token, router, logout]);

    if (isLoading) {
        return <PageLoader />
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <>{children}</>
    )
}