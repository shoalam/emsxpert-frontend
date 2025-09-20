'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { UserRoundCog, UserRoundCogIcon } from "lucide-react";

export default function Header() {
    const pathname = usePathname();
  return (
    <header className="w-full border-b border-border bg-card/80 backdrop-blur sticky top-0 z-10 py-3">
     <div className="container mx-auto px-4">
       <nav className="flex items-center justify-between">
        <div className="font-bold text-xl tracking-tight text-primary flex items-center gap-2">
          <div className="bg-blue-600 p-1 rounded">
            <UserRoundCog size={20} className="text-primary-foreground" />
          </div>
          EMSxpert
        </div>
        {/* <ul className="flex gap-6 text-muted-foreground font-medium">
          <li>
            <Link href="/" className={`${pathname === "/" ? "text-primary" : "hover:text-primary"} transition`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/features" className={`${pathname === "/features" ? "text-primary" : "hover:text-primary"} transition`}>
              Features
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`${pathname === "/contact" ? "text-primary" : "hover:text-primary"} transition`}>
              Contact
            </Link>
          </li>
        </ul> */}
        <div className="flex items-center gap-2">
          <Link href="/login" className="text-base font-medium mr-4 hover:text-primary transition">
            Log In
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 py-2 px-6 cursor-pointer">Get Started</Button>
          </Link>
        </div>
      </nav>
     </div>
    </header>
  );
}
