'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Settings, LayoutDashboard, FileText, BarChart2 } from 'lucide-react';

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col py-6 px-4">
      <div className="mb-8 flex items-center gap-2">
        <span className="font-bold text-xl text-primary">EMSxpert Admin</span>
      </div>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard/admin" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-accent/30 transition">
          <LayoutDashboard className="w-4 h-4" /> Dashboard
        </Link>
        <Link href="/dashboard/admin/employees" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-accent/30 transition">
          <Users className="w-4 h-4" /> Employees
        </Link>
        <Link href="/dashboard/admin/reports" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-accent/30 transition">
          <FileText className="w-4 h-4" /> Reports
        </Link>
        <Link href="/dashboard/admin/analytics" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-accent/30 transition">
          <BarChart2 className="w-4 h-4" /> Analytics
        </Link>
        {/* Dropdown Example */}
        <div>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 w-full rounded hover:bg-accent/30 transition text-left"
            onClick={() => setOpen((v) => !v)}
          >
            <Settings className="w-4 h-4" /> Settings
            {open ? <ChevronUp className="ml-auto w-4 h-4" /> : <ChevronDown className="ml-auto w-4 h-4" />}
          </button>
          {open && (
            <div className="ml-7 mt-1 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2">
              <Link href="/dashboard/admin/settings/profile" className="px-2 py-1 rounded hover:bg-accent/20 transition text-sm">
                Profile
              </Link>
              <Link href="/dashboard/admin/settings/security" className="px-2 py-1 rounded hover:bg-accent/20 transition text-sm">
                Security
              </Link>
              <Link href="/dashboard/admin/settings/notifications" className="px-2 py-1 rounded hover:bg-accent/20 transition text-sm">
                Notifications
              </Link>
            </div>
          )}
        </div>
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
