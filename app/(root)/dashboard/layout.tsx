"use client";

import Header from "@/components/custom/Header";
import Sidebar from "@/components/custom/Sidebar";
import { useState } from "react";
import { videoDataContext } from "../../_context/videoDataContext";
import { VideoData } from "@/types";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [videoData, setVideoData] = useState<VideoData>({});

  return (
    <videoDataContext.Provider value={{ videoData, setVideoData }}>
      <div className="min-h-screen bg-background">
        <div className="fixed inset-y-0 left-0 hidden md:block">
          <Sidebar />
        </div>
        <Header />
        <main className="md:pl-64">
          <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-6 sm:px-6 md:pt-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </videoDataContext.Provider>
  );
};

export default DashboardLayout;
