'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React, { useState } from 'react';
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
} from 'lucide-react';

// Define a type for menu items
type MenuItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
  subItems?: { label: string; href: string }[];
};

const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/dashboard/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Employees', href: '/dashboard/admin/employees', icon: <Users className="w-4 h-4" /> },
  { label: 'Projects', href: '/dashboard/admin/projects', icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Tasks', href: '/dashboard/admin/tasks', icon: <CheckSquare className="w-4 h-4" /> },
  { label: 'Attendance', href: '/dashboard/admin/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
  { label: 'Reports', href: '/dashboard/admin/reports', icon: <FileText className="w-4 h-4" /> },
  { label: 'Analytics', href: '/dashboard/admin/analytics', icon: <ChartColumnDecreasing className="w-4 h-4" /> },
  {
    label: 'Settings',
    icon: <Settings className="w-4 h-4" />,
    subItems: [
      { label: 'Profile', href: '/dashboard/admin/settings/profile' },
      { label: 'Security', href: '/dashboard/admin/settings/security' },
      { label: 'Notifications', href: '/dashboard/admin/settings/notifications' },
    ],
  },
];

export default function AdminSidebar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col py-6 px-4">
      <div className="mb-8 flex items-center gap-2">
        <span className="font-bold text-xl text-primary">EMSxpert Admin</span>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) =>
          item.subItems ? (
            <div key={item.label}>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 w-full rounded hover:bg-accent/30 transition text-left"
                onClick={() => toggleDropdown(item.label)}
              >
                {item.icon} {item.label}
                {openDropdown === item.label ? (
                  <ChevronUp className="ml-auto w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-auto w-4 h-4" />
                )}
              </button>
              {openDropdown === item.label && (
                <div className="ml-7 mt-1 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2">
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
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-accent/30 transition"
            >
              {item.icon} {item.label}
            </Link>
          )
        )}
      </nav>

      <div className="mt-auto flex items-center gap-3 pt-6 border-t border-border">
        <Avatar>
          <AvatarImage src="/admin-avatar.png" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">Admin</div>
          <div className="text-xs text-muted-foreground">admin@emsxpert.com</div>
        </div>
      </div>
    </aside>
  );
}
