import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { useState } from "react";
import PlayerDialog from "./PlayerDialog";

interface Video {
  id: number;
  // Add other video properties as needed
}

const VideoList = ({ videoList }: { videoList: Video[] }) => {
  const [openPlayerDialog, setOpenPlayerDialog] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number>();
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {videoList?.map((video, index) => (
        <div
          key={index}
          className="cursor-pointer hover:scale-105 transition-all"
          onClick={() => {setOpenPlayerDialog(Date.now());setVideoId(video.id)}}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={350}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15,
            }}
            inputProps={{
              ...video,
              setDurationFrame: (v: number) => console.log(v),
            }}
          />
        </div>
      ))}
      <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
    </div>
  );
};

export default VideoList;
