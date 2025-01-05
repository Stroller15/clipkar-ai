"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const DashboardPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoList, setVideoList] = useState([]);
  return (
    <div className="">
      <div className="p-5 flex items-center justify-between">
        <h1 className="font-bold text-primary text-2xl">Dashboard</h1>
        <Link href={"/dashboard/create"}>
          <Button>
            {" "}
            <span>
              <Plus />
            </span>{" "}
            Create New
          </Button>
        </Link>
      </div>
      <div className="p-5">
        {videoList.length === 0 && (
          <div className="flex flex-col items-center justify-center bottom-2 outline-dashed p-40">
            <h1 className="text-sm md:text-lg text-center whitespace-nowrap mb-2">
              You don&apos;t have any shorts video
            </h1>
            <Link href={"/dashboard/create"}>
              <Button>Create New Shorts Video</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
