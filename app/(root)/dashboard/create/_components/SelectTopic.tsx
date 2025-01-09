"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface SelectTopicProps {
  onUserSelect: (type: string, value: string) => void;
}

const SelectTopic: React.FC<SelectTopicProps> = ({ onUserSelect }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isTouched, setIsTouched] = useState(false);
  const [isPromptTouched, setIsPromptTouched] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedTopic(value);
    setIsTouched(true);
    if (value !== "Custom Prompt") {
      onUserSelect("selectedTopic", value);
    }
  };

  const handleCustomPromptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setCustomPrompt(value);
    setIsPromptTouched(true);
    onUserSelect("selectedTopic", value);
  };

  const contentOption: string[] = [
    "Custom Prompt",
    "Random AI Story",
    "Scary Story",
    "Historical Facts",
    "Bed Time Story",
    "Motivational",
    "Fun Facts",
    "Kids Story",
  ];

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <h2 className="font-bold text-primary">1 - Content Type</h2>
        <span className="text-red-500">*</span>
      </div>
      <p className="font-xl text-gray-500">
        Select content type of your short video!
      </p>
      <div className="relative">
        <Select onValueChange={handleSelect} required>
          <SelectTrigger
            className={`w-full p-6 mt-2 text-lg rounded-lg ${
              isTouched && !selectedTopic
                ? "border-red-500 border-2"
                : "border-gray-400"
            }`}
          >
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            {contentOption.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isTouched && !selectedTopic && (
          <p className="mt-2 text-sm text-red-500">
            Please select a content type
          </p>
        )}
      </div>

      {selectedTopic === "Custom Prompt" && (
        <div className="mt-4">
          <Textarea
            onChange={handleCustomPromptChange}
            onBlur={() => setIsPromptTouched(true)}
            value={customPrompt}
            required
            placeholder="Enter your custom prompt here..."
            className={`w-full min-h-32 p-4 rounded-lg ${
              isPromptTouched && !customPrompt
                ? "border-red-500 border-2"
                : "border-gray-400"
            }`}
          />
          {isPromptTouched && !customPrompt && (
            <p className="mt-2 text-sm text-red-500">
              Please enter your custom prompt
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectTopic;
