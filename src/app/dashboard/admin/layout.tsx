import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import React from "react";
import AdminSidebar from "./_components/AdminSidebar";

export default function AdminDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <AdminSidebar />
            <div className="flex flex-1 flex-col">
                <DashboardHeader />
                <main className="flex-1 p-4">{children}</main>
                <DashboardFooter />
            </div>
        </div>
    );
}
