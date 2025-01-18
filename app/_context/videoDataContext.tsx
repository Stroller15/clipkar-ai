import { VideoData } from "@/types";
import {createContext} from "react";


export const videoDataContext = createContext<{
    videoData: VideoData;
    setVideoData: React.Dispatch<React.SetStateAction<VideoData>>;
  }>({
    videoData: {},
    setVideoData: () => {}, 
  });