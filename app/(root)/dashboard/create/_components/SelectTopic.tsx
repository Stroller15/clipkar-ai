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

  const handleSelect = (value: string) => {
    setSelectedTopic(value);
    if (value !== "Custom Prompt") {
      onUserSelect("selectedTopic", value);
    }
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
      <h2 className="font-bold text-primary">1 - Content Type</h2>
      <p className="font-xl font-gray">
        {" "}
        Select content type of your short video!{" "}
      </p>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full p-6 mt-2 text-lg border-gray-400 rounded-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {contentOption.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTopic === "Custom Prompt" && (
        <div className="mt-4">
          <Textarea
            onChange={(e) => onUserSelect("topic", e.target.value)}
            required
            placeholder="Enter your custom prompt here..."
            className="w-full min-h-32 p-4 border-gray-400 rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default SelectTopic;
