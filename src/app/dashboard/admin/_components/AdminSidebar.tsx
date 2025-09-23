"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  List,
  Plus,
  UserRoundCog,
  BellRing,
} from "lucide-react";

type SubItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

type MenuItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
  subItems?: SubItem[];
};

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Employees",
    href: "#",
    icon: <Users className="w-5 h-5" />,
    subItems: [
      {
        label: "List of Employees",
        href: "/dashboard/admin/employees",
        icon: <List className="w-4 h-4" />,
      },
      {
        label: "Create Employee",
        href: "/dashboard/admin/employees/create",
        icon: <Plus className="w-4 h-4" />,
      },
    ],
  },
   {
    label: "Clients",
    href: "#",
    icon: <Users className="w-5 h-5" />,
    subItems: [
      {
        label: "List of Clients",
        href: "/dashboard/admin/clients",
        icon: <List className="w-4 h-4" />,
      },
      {
        label: "Create Client",
        href: "/dashboard/admin/clients/create",
        icon: <Plus className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Projects",
    href: "/dashboard/admin/projects",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    label: "Tasks",
    href: "/dashboard/admin/tasks",
    icon: <CheckSquare className="w-5 h-5" />,
  },
  {
    label: "Attendance",
    href: "/dashboard/admin/attendance",
    icon: <CalendarCheck className="w-5 h-5" />,
  },
  {
    label: "Reports",
    href: "/dashboard/admin/reports",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: <ChartColumnDecreasing className="w-5 h-5" />,
  },
  {
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    subItems: [
      { label: "Profile", href: "/dashboard/admin/settings/profile", icon: <UserRoundCog className="w-4 h-4" /> },
      {
        label: "Notifications",
        href: "/dashboard/admin/settings/notifications",
        icon: <BellRing className="w-4 h-4" />,
      },
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
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const toggleDropdown = (label: string) =>
    setOpenDropdown((p) => (p === label ? null : label));

  // refs to submenu DOM nodes (do NOT return a value from ref callback)
  const dropdownRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const setDropdownRef = (key: string) => (el: HTMLDivElement | null) => {
    dropdownRefs.current[key] = el;
  };

  // store measured heights so we don't read scrollHeight during render
  const [heights, setHeights] = React.useState<Record<string, number>>({});

  React.useLayoutEffect(() => {
    const measure = () => {
      const map: Record<string, number> = {};
      Object.keys(dropdownRefs.current).forEach((k) => {
        const el = dropdownRefs.current[k];
        if (el) {
          // read layout measurement
          map[k] = el.scrollHeight;
        }
      });
      setHeights(map);
    };

    // initial measure
    measure();

    // re-measure on window resize (debounce-ish via requestAnimationFrame)
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // widths:
  const wideWidth = "w-64";
  const collapsedWidth = "w-16";

  // helper to check active states
  // inside your component, after `const pathname = usePathname();`

  const isItemActive = (item: MenuItem) => {
    if (!item.href) return false;

    // If the item has subItems, consider it active for its route *or* any child route.
    // Otherwise require an exact match (so Dashboard '/dashboard/admin' won't be active
    // for '/dashboard/admin/employees').
    if (item.subItems && item.subItems.length > 0) {
      return pathname === item.href || pathname?.startsWith(item.href + "/");
    }

    return pathname === item.href;
  };

  // Optional: auto-open parent dropdown when on a child route
  React.useEffect(() => {
    const activeParent = menuItems.find(
      (m) =>
        m.subItems &&
        (pathname === m.href || pathname?.startsWith(m.href + "/"))
    );
    if (activeParent) {
      setOpenDropdown(activeParent.label);
    } else {
      // close if no parent matches (optional — keep/remove based on your preference)
      setOpenDropdown((prev) => {
        // don't override user-opened dropdowns when they intentionally opened one
        // but if you want always-to-follow-route, simply return activeParent?.label ?? null
        return prev;
      });
    }
  }, [pathname]);

  return (
    <>
      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-200 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:inset-auto`}
        aria-hidden={
          !isOpen && typeof window !== "undefined" && window.innerWidth < 1024
        }
      >
        <aside
          className={`h-full flex flex-col bg-card border-r border-border py-4 px-2
            ${
              collapsed ? collapsedWidth : wideWidth
            } transition-all duration-200 ease-in-out`}
        >
          {/* header area (logo + controls) */}
          <div className="flex items-center justify-between px-2 mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`font-bold text-lg text-primary truncate ${
                  collapsed ? "hidden" : "block"
                }`}
              >
                <h3 className="text-2xl font-bold text-primary mb-2 text-center flex items-center justify-center gap-2">
                  <span className="text-white bg-blue-600 rounded p-1 flex items-center justify-center">
                    <UserRoundCog size={20} />
                  </span>
                  EMSxpert
                </h3>
              </div>
              {/* icon-only logo when collapsed */}
              <div
                className={`flex items-center justify-center ${
                  collapsed ? "block" : "hidden"
                }`}
              >
                <MenuIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* collapse toggle - visible on large screens */}
              <button
                onClick={onToggleCollapse}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="p-1 rounded hover:bg-accent/20 transition hidden lg:inline-flex"
              >
                {collapsed ? (
                  <ChevronsRight className="w-4 h-4" />
                ) : (
                  <ChevronsLeft className="w-4 h-4" />
                )}
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

          <nav className="flex flex-col gap-1 p-1 max-h-[calc(100vh-160px)] overflow-y-auto">
            {menuItems.map((item) =>
              item.subItems ? (
                <div
                  key={item.label}
                  className={`group ${collapsed ? "px-0" : ""}`}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-3 w-full rounded px-2 py-2 transition text-left cursor-pointer ${
                      collapsed ? "justify-center" : ""
                    } 
                    hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600
                    ${isItemActive(item) ? "bg-blue-600 text-white" : ""}
                    `}
                    onClick={() => toggleDropdown(item.label)}
                    aria-expanded={openDropdown === item.label}
                    data-active={isItemActive(item)}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
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

                  {/* Animated submenu: uses max-height + opacity; height comes from measured heights */}
                  <div
                    ref={setDropdownRef(item.label)}
                    style={{
                      maxHeight:
                        openDropdown === item.label
                          ? `${
                              heights[item.label] ?? item.subItems.length * 36
                            }px`
                          : "0px",
                      transition:
                        "max-height 220ms cubic-bezier(.2,.8,.2,1), opacity 200ms ease",
                      opacity: openDropdown === item.label ? 1 : 0,
                    }}
                    className="ml-8 mt-1 flex flex-col gap-1 overflow-hidden"
                    aria-hidden={openDropdown !== item.label}
                  >
                    {item.subItems.map((sub) => {
                      const subActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          data-active={subActive}
                          className={`px-2 py-1 rounded text-sm transition flex items-center gap-2
                            hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600
                            ${subActive ? "bg-blue-600 text-white" : ""}`}
                        >
                          {sub.icon && (
                            <span className="flex-shrink-0">{sub.icon}</span>
                          )}
                          <span>{sub.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  data-active={isItemActive(item)}
                  className={`flex items-center gap-3 rounded px-2 py-2 transition
                    ${collapsed ? "justify-center" : ""}
                    hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600
                    ${isItemActive(item) ? "bg-blue-500 text-white" : ""}`}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              )
            )}
          </nav>

          <div className="mt-auto px-2">
            <div
              className={`flex items-center gap-3 pt-4 border-t border-border ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <Avatar>
                <AvatarImage src="/admin-avatar.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div>
                  <div className="font-medium">Admin</div>
                  <div className="text-xs text-muted-foreground">
                    admin@emsxpert.com
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* overlay for small screens when open */}
      <div
        className={`fixed inset-0 bg-black/30 z-20 transition-opacity lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
    </>
  );
}
