"use client"
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import indentString from "indent-string";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

type FormData = {
  selectedTopic?: string;
  selectedStyle?: string;
  selectedDuration?: string;
};

interface StoryElement {
  imagePrompt: string;
  contentText: string;
}

type StoryElements = StoryElement[];

const LoadingState = ({ type }: { type: "script" | "audio" }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>
        {type === "script"
          ? "Generating video script..."
          : "Generating audio..."}
      </span>
    </div>
  );
};

const CreatePage = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [videoScript, setVideoScript] = useState<StoryElements>([]);

  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const getVideoScript = async () => {
    setIsGeneratingScript(true);
    try {
      const result = await axios.post("/api/generate-video-image-script", {
        prompt,
      });
      const newScript = result?.data?.result?.scenes;
      console.log(videoScript);
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

  const isLoading = isGeneratingScript || isGeneratingAudio;

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
