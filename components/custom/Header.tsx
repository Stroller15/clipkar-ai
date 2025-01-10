import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="p-3 px-5 flex justify-between shadow-md">
      <div className="flex items-center gap-1">
      </div>
      <div className="flex items-center gap-5 mr-5">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
