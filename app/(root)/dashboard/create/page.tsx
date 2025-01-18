/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import indentString from "indent-string";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { LoadingState } from "@/components/custom/Loading";
import { FormData, StoryElements, VideoData } from "@/types";
import { videoDataContext } from "@/app/_context/videoDataContext";

const CreatePage = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [videoScript, setVideoScript] = useState<StoryElements>([]);
  const [audioFileURL, setAudioFileURL] = useState("");
  const [captions, setCaptions] = useState("");
  const [imageList, setImageList] = useState<string[]>([]);
  const { videoData, setVideoData } = useContext(videoDataContext);

  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const isLoading =
    isGeneratingScript ||
    isGeneratingAudio ||
    isGeneratingCaption ||
    isGeneratingImage;

  const prompt = indentString(
    `write a script to generate ${
      formData.selectedDuration || "30 Seconds"
    } video topic: interesting ${
      formData.selectedTopic || "Story"
    } along with AI image prompt in ${
      formData.selectedStyle || "Realistic"
    } style for each scene and give me result in JSON format with imagePrompt and contentText and field, No plain text`,
    2
  );

  // generate video and image script
  const getVideoScript = async () => {
    setIsGeneratingScript(true);
    try {
      const result = await axios.post("/api/generate-video-image-script", {
        prompt,
      });
      const newScript = result?.data?.result?.scenes;
      setVideoData((prev) => ({
        ...prev,
        videoScript: newScript,
      }));
      setVideoScript(newScript);
      generateAudioFile(newScript);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const onCreateVideoClickHandler = () => {
    getVideoScript();
  };

  // generate audio file
  const generateAudioFile = async (script: StoryElements) => {
    let scriptText = "";
    const id = uuidv4();

    script?.forEach((item) => {
      scriptText += item.contentText + " ";
    });

    try {
      setIsGeneratingAudio(true);
      const res = await axios.post("/api/generate-audio", {
        text: scriptText,
        id,
      });

      setAudioFileURL(res?.data?.result);
      setVideoData((prev) => ({
        ...prev,
        audioFileURL: res?.data?.result,
      }));
      if (res?.data?.result) {
        generateCaptionFile(res?.data?.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // generate audio caption
  const generateCaptionFile = async (audioFileURL: string) => {
    try {
      setIsGeneratingCaption(true);
      const res = await axios.post("/api/generate-caption", {
        audioFileURL,
      });

      setCaptions(res?.data?.result);
      setVideoData((prev) => ({
        ...prev,
        captionFile: res?.data?.result,
      }));
      generateImage();
    } catch (err) {
      console.log(err);
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  // generate ai image
  const generateImage = async () => {
    setIsGeneratingImage(true);
    const images: string[] = [];
    try {
      for (const item of videoScript) {
        const res = await axios.post("/api/generate-image", {
          prompt: item?.imagePrompt,
        });
        images.push(res?.data?.result);
      }
      setVideoData((prev) => ({
        ...prev,
        imageList: images,
      }));
      setImageList(images);
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  useEffect(() => {
    console.log(videoData)
  }, [videoData])

  return (
    <div className="p-6 md:p-10">
      <h2 className="font-bold text-center text-primary md:text-4xl">
        Create New Short Video
      </h2>
      <div className="mt-3 shadow-md p-5 md:mt-5 md:shadow-md md:p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />

        <div className="mt-5 md:mt-10">
          <Button
            onClick={onCreateVideoClickHandler}
            className="w-full text-white p-6 rounded-lg"
            disabled={isLoading}
          >
            {isGeneratingScript ? (
              <LoadingState type="script" />
            ) : isGeneratingAudio ? (
              <LoadingState type="audio" />
            ) : isGeneratingCaption ? (
              <LoadingState type="caption" />
            ) : isGeneratingImage ? (
              <LoadingState type="image" />
            ) : (
              "Create Short Video"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
