import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RemotionVideo from "./RemotionVideo";
import { Player } from "@remotion/player";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { VideoData } from "@/types";

const PlayerDialog = ({
  open,
  videoId,
  onOpenChange,
  title = "Your short",
}: {
  open: boolean;
  videoId?: number;
  onOpenChange: (open: boolean) => void;
  title?: string;
}) => {
  const [videoData, setVideoData] = useState<VideoData>();
  const [durationInFrame, setDurationInFrame] = useState<number>(1000);

  useEffect(() => {
    if (!open || !videoId) return;
    let cancelled = false;
    setVideoData(undefined);

    axios
      .get<{ result: VideoData }>(`/api/videos/${videoId}`)
      .then(({ data }) => {
        if (!cancelled) setVideoData({ ...data.result, imageList: data.result.imageList ?? [] });
      })
      .catch((error) => console.error("Failed to load video", error));

    return () => {
      cancelled = true;
    };
  }, [open, videoId]);

  const seconds = Math.round(durationInFrame / 30);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[380px] gap-0 p-6">
        <DialogHeader className="text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="font-mono text-[12px] tabular-nums">
            {videoData
              ? `${videoData.imageList?.length ?? 0} scenes · 0:${String(seconds).padStart(2, "0")}`
              : "Loading"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-sidebar">
          {videoData ? (
            <Player
              component={RemotionVideo}
              durationInFrames={Math.max(1, Number(durationInFrame.toFixed(0)))}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls
              style={{ width: "100%", aspectRatio: "2 / 3" }}
              inputProps={{
                ...videoData,
                setDurationInFrame: (frameValue: number) => setDurationInFrame(frameValue),
              }}
            />
          ) : (
            <div className="grid aspect-[2/3] place-items-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
