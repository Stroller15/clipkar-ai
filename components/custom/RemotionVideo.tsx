import { VideoData } from "@/types";
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  Img,
  Audio,
  useCurrentFrame,
} from "remotion";

const RemotionVideo = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  videoScript,
  imageList,
  audioFileURL,
  captionFile,
  setDurationInFrame,
}: VideoData) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const getDurationInFrame = () => {
    if (!captionFile || captionFile.length === 0) return 0;
    const lastCaption = captionFile[captionFile.length - 1];
    const duration = (lastCaption.end / 1000) * fps;

    if (setDurationInFrame) {
      setDurationInFrame(duration);
    }

    return duration;
  };

  const getCurrentCaptions = () => {
    const currentTime = (frame / 30) * 1000;
    const currentCaptions = captionFile?.find(
      (word) => currentTime >= word?.start && currentTime <= word.end
    );
    return currentCaptions ? currentCaptions?.text : " ";
  };
  
  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((item, index) => (
        <Sequence
          key={index}
          from={(index * getDurationInFrame()) / (imageList?.length ?? 1)}
          durationInFrames={getDurationInFrame()}
        >
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Img
              src={item}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <AbsoluteFill
              style={{
                color: "white",
                justifyContent: "center",
                top: undefined,
                border: 50,
                height: 150,
                textAlign: "center",
                width: "100%",
              }}
            >
              <h2 className="text-3xl">{getCurrentCaptions()} </h2>
            </AbsoluteFill>
          </AbsoluteFill>
        </Sequence>
      ))}
      {audioFileURL && <Audio src={audioFileURL} />}
    </AbsoluteFill>
  );
};

export default RemotionVideo;
