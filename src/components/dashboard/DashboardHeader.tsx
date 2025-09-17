'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, MoreVertical } from 'lucide-react';
import AdminProfileDropdown from '@/app/dashboard/admin/_components/AdminProfileDropdown';

export default function DashboardHeader({
  onToggleSidebar,
  onToggleCollapse,
  isSidebarOpen,
  isSidebarCollapsed,
}: {
  onToggleSidebar: () => void;
  onToggleCollapse: () => void;
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
}) {
  // for demo, hardcoded notification count. Replace with state from API later
  const notificationCount = 3;

  return (
    <header className="sticky top-0 z-40 h-16 bg-card border-b border-border flex items-center px-4 justify-between">
      <div className="flex items-center gap-3">
        {/* hamburger toggle (all devices) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
            className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* collapse button (desktop only) */}
        <button
          onClick={onToggleCollapse}
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-2 rounded hover:bg-accent/20 transition hidden lg:inline-flex"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        <span className="font-semibold text-lg text-primary">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications with badge */}
        <button
          className="relative p-2 rounded-md hover:bg-accent/20 transition"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile dropdown */}
        <AdminProfileDropdown />
      </div>
    </header>
  );
}
