"use client"
import {
  Clapperboard,
  LayoutDashboard,
  SquarePlus,
  SquareUser,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const menuOptions = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Create",
      icon: Clapperboard,
      path: "/create",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: SquarePlus,
      path: "/upgrade",
    },
    {
      id: 4,
      name: "Account",
      icon: SquareUser,
      path: "/account",
    },
  ];
  const urlPathName = usePathname();
  const router = useRouter();

  return (
    <div className="h-screen w-64 shadow-md p-5">
      <div className="grid gap-3">
        {menuOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-3 p-3  cursor-pointer rounded-md ${
              urlPathName === item.path
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
