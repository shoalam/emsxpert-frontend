'use client';

import React, { useEffect, useState } from 'react';
import AdminSidebar from './_components/AdminSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';


export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // sidebarOpen: visible (true) or hidden (false)
  // sidebarCollapsed: when visible on wide screens, collapsed to icons-only (true)
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
      </div>
    </div>
  );
}
