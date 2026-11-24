"use client";
import VideoList from "@/components/custom/VideoList";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/custom/PageHeader";
import { Caption, ShortFrame } from "@/components/custom/Brand";
import { VideoData } from "@/types";

const EmptyState = () => (
  <div className="flex flex-col items-center gap-8 rounded-2xl border border-border bg-card px-6 py-12 text-center sm:flex-row sm:items-center sm:gap-12 sm:px-12 sm:text-left">
    <ShortFrame className="w-[132px] shrink-0">
      <Image src="/cartoon.png" alt="" fill sizes="132px" className="scale-[1.3] object-cover object-[55%_50%]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-2 bottom-6">
        <Caption words={["Your", "first", "short"]} active={2} className="text-[13px]" />
      </div>
    </ShortFrame>
    <div className="max-w-sm">
      <h2 className="text-[20px] font-medium leading-7">No shorts yet</h2>
      <p className="mt-2 text-[15px] leading-[22px] text-subtle">
        Pick a topic, a style and a length. ClipKar writes, narrates,
        captions and illustrates it in a couple of minutes.
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard/create">
          <Plus />
          Create a short
        </Link>
      </Button>
    </div>
  </div>
);

const LoadingGrid = () => (
  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" aria-busy="true">
    {Array.from({ length: 5 }).map((_, i) => (
      <li key={i}>
        <div className="aspect-[5/7] rounded-xl border border-border bg-card" />
        <div className="mt-2 h-5 w-2/3 rounded bg-card" />
      </li>
    ))}
  </ul>
);

const DashboardPage = () => {
  const [videoList, setVideoList] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setLoading(false);
      return;
    }

    axios
      .get<{ result: VideoData[] }>("/api/videos")
      .then((res) => setVideoList(res.data.result.map((r) => ({ ...r, imageList: r.imageList ?? [] }))))
      .catch((error) => console.error("Failed to load shorts", error))
      .finally(() => setLoading(false));
  }, [isLoaded, user]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your shorts"
        meta={loading ? undefined : videoList.length}
        action={
          videoList.length > 0 ? (
            <Button asChild>
              <Link href="/dashboard/create">
                <Plus />
                New short
              </Link>
            </Button>
          ) : null
        }
      />

      {loading ? (
        <LoadingGrid />
      ) : videoList.length === 0 ? (
        <EmptyState />
      ) : (
        <VideoList videoList={videoList} />
      )}
    </div>
  );
};

export default DashboardPage;
