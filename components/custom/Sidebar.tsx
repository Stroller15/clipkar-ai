"use client";
import { Clapperboard, LayoutGrid, Plus, UserRound, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Logo } from "./Brand";
import { cn } from "@/lib/utils";

export const NAV_ITEMS: { name: string; icon: LucideIcon; path: string }[] = [
  { name: "Your shorts", icon: LayoutGrid, path: "/dashboard" },
  { name: "Create", icon: Clapperboard, path: "/dashboard/create" },
  { name: "Plans", icon: Plus, path: "/dashboard/upgrade" },
  { name: "Account", icon: UserRound, path: "/dashboard/account" },
];

export const NavList = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();

  return (
    <ul className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.path;
        return (
          <li key={item.path}>
            <Link
              href={item.path}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-9 items-center gap-3 rounded-lg px-3 text-[14px] transition-colors",
                active
                  ? "bg-raised text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "text-subtle hover:bg-raised/60 hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
                strokeWidth={1.5}
              />
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-sidebar px-4 pb-4">
      <div className="flex h-14 items-center px-3">
        <Logo />
      </div>
      <nav className="mt-4" aria-label="Main">
        <NavList />
      </nav>

      <div className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2">
        <UserButton />
        <div className="min-w-0">
          <p className="truncate text-[13px] leading-5 text-foreground">
            {user?.fullName ?? user?.username ?? ""}
          </p>
          <p className="truncate text-[12px] leading-4 text-muted-foreground">
            {user?.primaryEmailAddress?.emailAddress ?? ""}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
