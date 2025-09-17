'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronDown,
  ChevronUp,
  Users,
  Settings,
  LayoutDashboard,
  FileText,
  ChartColumnDecreasing,
  Briefcase,
  CheckSquare,
  CalendarCheck,
  X,
  Menu as MenuIcon,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

type MenuItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
  subItems?: { label: string; href: string }[];
};

const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/dashboard/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Employees', href: '/dashboard/admin/employees', icon: <Users className="w-5 h-5" /> },
  { label: 'Projects', href: '/dashboard/admin/projects', icon: <Briefcase className="w-5 h-5" /> },
  { label: 'Tasks', href: '/dashboard/admin/tasks', icon: <CheckSquare className="w-5 h-5" /> },
  { label: 'Attendance', href: '/dashboard/admin/attendance', icon: <CalendarCheck className="w-5 h-5" /> },
  { label: 'Reports', href: '/dashboard/admin/reports', icon: <FileText className="w-5 h-5" /> },
  { label: 'Analytics', href: '/dashboard/admin/analytics', icon: <ChartColumnDecreasing className="w-5 h-5" /> },
  {
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    subItems: [
      { label: 'Profile', href: '/dashboard/admin/settings/profile' },
      { label: 'Security', href: '/dashboard/admin/settings/security' },
      { label: 'Notifications', href: '/dashboard/admin/settings/notifications' },
    ],
  },
];

export default function AdminSidebar({
  isOpen,
  collapsed,
  onClose,
  onToggleCollapse,
  onToggleOpen,
}: {
  isOpen: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
  onToggleOpen: () => void;
}) {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const toggleDropdown = (label: string) => setOpenDropdown((p) => (p === label ? null : label));

  // widths:
  // - hidden: translate -full
  // - collapsed: w-16 (icons only)
  // - expanded: w-64
  const wideWidth = 'w-64';
  const collapsedWidth = 'w-16';

  return (
    <>
      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}
        aria-hidden={!isOpen && typeof window !== 'undefined' && window.innerWidth < 1024}
      >
        <aside
          className={`h-full flex flex-col bg-card border-r border-border py-4 px-2
            ${collapsed ? collapsedWidth : wideWidth} transition-all duration-200 ease-in-out`}
        >
          {/* header area (logo + controls) */}
          <div className="flex items-center justify-between px-2 mb-4">
            <div className="flex items-center gap-2">
              <div className={`font-bold text-lg text-primary truncate ${collapsed ? 'hidden' : 'block'}`}>
                EMSxpert Admin
              </div>
              {/* icon-only logo when collapsed */}
              <div className={`flex items-center justify-center ${collapsed ? 'block' : 'hidden'}`}>
                <MenuIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* collapse toggle - visible on large screens */}
              <button
                onClick={onToggleCollapse}
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="p-1 rounded hover:bg-accent/20 transition hidden lg:inline-flex"
              >
                {collapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
              </button>

              {/* open/close on mobile */}
              <button
                onClick={onToggleOpen}
                className="p-1 rounded hover:bg-accent/20 transition lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-1 px-1">
            {menuItems.map((item) =>
              item.subItems ? (
                <div key={item.label} className={`group ${collapsed ? 'px-0' : ''}`}>
                  <button
                    type="button"
                    className={`flex items-center gap-3 w-full rounded px-2 py-2 hover:bg-accent/30 transition text-left ${
                      collapsed ? 'justify-center' : ''
                    }`}
                    onClick={() => toggleDropdown(item.label)}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && (
                      <span className="ml-auto">
                        {openDropdown === item.label ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </button>

                  {openDropdown === item.label && !collapsed && (
                    <div className="ml-8 mt-1 flex flex-col gap-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="px-2 py-1 rounded hover:bg-accent/20 transition text-sm"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`flex items-center gap-3 rounded px-2 py-2 hover:bg-accent/30 transition ${
                    collapsed ? 'justify-center' : ''
                  }`}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              )
            )}
          </nav>

          <div className="mt-auto px-2">
            <div className={`flex items-center gap-3 pt-4 border-t border-border ${collapsed ? 'justify-center' : ''}`}>
              <Avatar>
                <AvatarImage src="/admin-avatar.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div>
                  <div className="font-medium">Admin</div>
                  <div className="text-xs text-muted-foreground">admin@emsxpert.com</div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* overlay for small screens when open */}
      <div
        className={`fixed inset-0 bg-black/30 z-20 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
    </>
  );
}
