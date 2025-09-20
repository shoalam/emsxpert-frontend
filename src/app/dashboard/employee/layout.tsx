'use client';
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AdminSidebar from "../admin/_components/AdminSidebar";
import { useEffect, useState } from "react";

export default function EmployeeDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  
    // Keep sidebar visible by default on larger screens, but allow toggle on all sizes.
    useEffect(() => {
      function handleResize() {
        if (window.innerWidth >= 1024) {
          // on large screens default to visible (but preserve collapsed state)
          setSidebarOpen(true);
        } else {
          // on smaller screens default to hidden to avoid overlaying content
          setSidebarOpen(false);
        }
      }
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const toggleSidebar = () => setSidebarOpen((s) => !s);
    const toggleCollapse = () => setSidebarCollapsed((c) => !c);
  
    return (
      <div className="h-screen flex bg-background text-foreground overflow-hidden">
        <AdminSidebar
          isOpen={sidebarOpen}
          collapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={toggleCollapse}
          onToggleOpen={() => setSidebarOpen((s) => !s)}
        />
  
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader
            onToggleSidebar={toggleSidebar}
            onToggleCollapse={toggleCollapse}
            isSidebarOpen={sidebarOpen}
            isSidebarCollapsed={sidebarCollapsed}
          />
  
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
          <DashboardFooter />
        </div>
      </div>
  );
}
