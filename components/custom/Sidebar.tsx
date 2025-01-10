"use client";
import {
  Clapperboard,
  LayoutDashboard,
  SquarePlus,
  SquareUser,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
      path: "/dashboard/create",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: SquarePlus,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Account",
      icon: SquareUser,
      path: "/dashboard/account",
    },
  ];
  const urlPathName = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen w-64 text-white bg-primary shadow-md p-5">
      <div className="grid gap-3">
        <div className="flex items-center gap-1 mb-5">
          <Link href="/">
            <div className="flex items-center gap-1 cursor-pointer">
              <Image src={"/logo.png"} alt="logo" width={40} height={40} />
              <h1 className="font-bold text-2xl text-bg">ClipKar</h1>
            </div>
          </Link>
        </div>
        {menuOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-3 p-3 cursor-pointer rounded-md ${
              urlPathName === item.path
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
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
