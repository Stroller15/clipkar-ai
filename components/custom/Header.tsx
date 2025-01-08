import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="p-3 px-5 flex justify-between shadow-md">
      <div className="flex items-center gap-1">
        <Image
          className="flex items-center gap-1"
          src={"/logo_without_name.png"}
          alt="logo"
          width={30}
          height={30}
        />
        <h1 className="font-bold text-xl text-primary">ClipKar</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
