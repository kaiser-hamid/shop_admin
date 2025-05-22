"use client"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "@/components/layouts/DashboardHeader"
import AuthGuardLayout from "@/components/layouts/AuthGuardLayout"

export default function DashboardLayout({ children }) {
    return (
        <AuthGuardLayout>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <DashboardHeader />
                    <div className="flex-1 p-4 pt-0">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </AuthGuardLayout>
    )
}
