"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Logo } from "./Brand";
import { NavList } from "./Sidebar";

/** Top bar for small screens: logo, account, and a menu that opens the nav. */
const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur md:hidden">
      <Logo href="/dashboard" />
      <div className="flex items-center gap-2">
        <UserButton />
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
          <DialogPrimitive.Trigger
            className="grid h-9 w-9 place-items-center rounded-lg text-subtle transition-colors hover:bg-raised hover:text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </DialogPrimitive.Trigger>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
            <DialogPrimitive.Content className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-sidebar px-4 pb-4 duration-200 data-[state=open]:animate-in data-[state=open]:slide-in-from-left-4 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
              <DialogPrimitive.Title className="sr-only">Navigation</DialogPrimitive.Title>
              <div className="flex h-14 items-center px-3">
                <Logo href="/dashboard" />
              </div>
              <nav className="mt-4" aria-label="Main">
                <NavList onNavigate={() => setOpen(false)} />
              </nav>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </div>
    </header>
  );
};

export default Header;
