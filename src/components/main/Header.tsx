'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
    const pathname = usePathname();
  return (
    <header className="w-full border-b border-border bg-card/80 backdrop-blur sticky top-0 z-10">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="font-bold text-xl tracking-tight text-primary">
          EMSxpert
        </span>
        <ul className="flex gap-6 text-muted-foreground font-medium">
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
        </ul>
      </nav>
    </header>
  );
}
