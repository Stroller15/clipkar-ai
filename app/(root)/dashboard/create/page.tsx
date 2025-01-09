"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import indentString from "indent-string";
import axios from "axios";

type FormData = {
  selectedTopic?: string;
  selectedStyle?: string;
  selectedDuration?: string;
};

const CreatePage = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);

  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };
  console.log(formData);

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

  const onCreateVideoClickHandler = () => {
    getVideoScript();
  };

  const getVideoScript = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post("/api/get-video-script", {
        prompt,
      });
      setVideoScript(result.data.result);
      console.log(videoScript);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="font-bold text-center text-primary md:text-4xl">
        Create New Short Video{" "}
      </h2>
      <div className="mt-5 shadow-md p-5 md:mt-10 md:shadow-md md:p-10">
        {/* select topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* select style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* create button */}
        <div className="mt-5 md:mt-10">
          <Button
            onClick={onCreateVideoClickHandler}
            className="w-full text-white p-6 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Creating Video..." : "Create Short Video"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
