"use client"

import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

export default function DashboardHeader() {
    const pathname = usePathname()

    // Function to format the path segment into a readable title
    const formatPathSegment = (segment) => {
        // Remove any query parameters
        segment = segment.split('?')[0]
        // Convert to title case and replace hyphens with spaces
        return segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    // Generate breadcrumb items from the current path
    const generateBreadcrumbs = () => {
        const segments = pathname.split('/').filter(Boolean)
        const breadcrumbs = []

        // Always add Dashboard as the first item
        breadcrumbs.push({
            href: '/',
            label: 'Dashboard',
            isCurrentPage: segments.length === 0
        })

        // Build up the path for each segment
        let currentPath = ''
        segments.forEach((segment, index) => {
            currentPath += `/${segment}`
            breadcrumbs.push({
                href: currentPath,
                label: formatPathSegment(segment),
                isCurrentPage: index === segments.length - 1
            })
        })

        return breadcrumbs
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <header
            className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => (
                            <React.Fragment key={item.href}>
                                <BreadcrumbItem className="hidden md:block">
                                    {item.isCurrentPage ? (
                                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={item.href}>
                                            {item.label}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {index < breadcrumbs.length - 1 && (
                                    <BreadcrumbSeparator className="hidden md:block" />
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
