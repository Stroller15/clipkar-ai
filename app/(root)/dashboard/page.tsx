"use client";
import VideoList from "@/components/custom/VideoList";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { videoDataSchema } from "@/config/db/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";



const DashboardPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getVideoList();
    }
  }, [user]);

  const getVideoList = async () => {
    if (!user || !user.primaryEmailAddress) {
      console.error("User or primary email address is not defined");
      return;
    }

    const email = user.primaryEmailAddress.emailAddress;

    const result = await db
      .select()
      .from(videoDataSchema)
      .where(eq(videoDataSchema.createdBy, email));

    setVideoList(result);
  };
  return (
    <div className="px-5">
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
        {/* empty state mean no vide */}
        {videoList.length === 0 && (
          <div className="flex flex-col items-center justify-center bottom-2 outline-dashed p-40">
            <h1 className="text-sm md:text-lg text-center whitespace-nowrap mb-2">
              You don&apos;t have any shorts video
            </h1>
            <Link href={"/dashboard/create"}>
              <Button>Create New AI Powered Shorts Video</Button>
            </Link>
          </div>
        )}

        {/* when there is videos */}
        <VideoList videoList={videoList} />
      </div>
    </div>
  );
};

export default DashboardPage;
