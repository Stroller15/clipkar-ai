import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { useState } from "react";
import { Play } from "lucide-react";
import PlayerDialog from "./PlayerDialog";
import { VideoData } from "@/types";

const VideoList = ({ videoList }: { videoList: VideoData[] }) => {
  const [videoId, setVideoId] = useState<number>();

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {videoList.map((video, index) => (
          <li key={video.id ?? index}>
            <button
              type="button"
              onClick={() => setVideoId(video.id)}
              className="group relative block w-full overflow-hidden rounded-xl border border-border bg-sidebar text-left transition-colors hover:border-foreground/20"
              aria-label={`Play short ${index + 1}`}
            >
              <Thumbnail
                component={RemotionVideo}
                compositionWidth={250}
                compositionHeight={350}
                frameToDisplay={30}
                durationInFrames={120}
                fps={30}
                style={{ width: "100%", aspectRatio: "5 / 7", display: "block" }}
                inputProps={{ ...video }}
              />
              <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors group-hover:bg-black/30">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-black opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="ml-[2px] h-4 w-4" strokeWidth={1.5} fill="currentColor" />
                </span>
              </span>
            </button>
            <div className="mt-2 flex items-baseline justify-between px-1">
              <p className="truncate text-[13px] text-subtle">
                {video.videoScript?.[0]?.contentText?.split(" ").slice(0, 5).join(" ") ??
                  `Short ${index + 1}`}
              </p>
              <p className="ml-2 shrink-0 font-mono text-[12px] tabular-nums text-muted-foreground">
                {video.imageList?.length ?? 0} scenes
              </p>
            </div>
          </li>
        ))}
      </ul>
      <PlayerDialog
        open={videoId !== undefined}
        videoId={videoId}
        onOpenChange={(o) => !o && setVideoId(undefined)}
      />
    </>
  );
};

export default VideoList;
