"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AdminProfileDropdown() {
  const router = useRouter();
  const handleLogout = () => {
    // Implement logout functionality here
    Cookies.remove('accessToken');
    router.push('/login'); // Redirect to login page after logout
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
        {/* Avatar */}
        <div className="h-9 w-9 rounded-full border border-border overflow-hidden">
          <Image
            src="/assets/img/github.jpg"
            alt="Admin"
            width={36}
            height={36}
            className="object-cover"
          />
        </div>
        {/* Dropdown icon */}
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="w-full flex items-center gap-2" href="/dashboard/admin/profile">
            <User className="h-4 w-4" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="w-full flex items-center gap-2" href="/dashboard/admin/settings">
            <Settings className="h-4 w-4" /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
          <LogOut className="h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
