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
import { Button } from "../ui/button";
import { db } from "@/config/db";
import { videoDataSchema } from "@/config/db/schema";
import { eq } from "drizzle-orm";
import { VideoData } from "@/types";

const PlayerDialog = ({
  playVideo,
  videoId,
}: {
  playVideo: boolean;
  videoId: number;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | undefined>(undefined);

  console.log(videoData);

  const getVideoData = async () => {
    const response = await db
      .select()
      .from(videoDataSchema)
      .where(eq(videoDataSchema.id, videoId));

    if (response.length > 0) {
      setVideoData(response[0] as VideoData);
    }
    console.log("response", response);
  };

  useEffect(() => {
    setOpenDialog(playVideo);
    if (videoId) {
      getVideoData();
    }
  }, [playVideo]);

  useEffect(() => {
    if (videoId) {
      getVideoData();
    }
  }, [videoId]);
  return (
    <Dialog open={openDialog}>
      <DialogContent className=" bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your AI Short Video is Ready
          </DialogTitle>
          <DialogDescription>
            <Player
              component={RemotionVideo}
              durationInFrames={120}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
            />
            <div className="flex gap-10">
              <Button>Cancle</Button>
              <Button>Export</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
