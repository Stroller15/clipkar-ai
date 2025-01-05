import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectDurationProps {
  onUserSelect: (type: string, value: string) => void;
}

const SelectDuration: React.FC<SelectDurationProps> = ({ onUserSelect }) => {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-primary">3 - Content Duration</h2>
      <p className="font-xl font-gray">
        {" "}
        Select the duration of your short video!{" "}
      </p>
      <Select
        onValueChange={(value) => onUserSelect("selectedDuration", value)}
      >
        <SelectTrigger className="w-full p-6 mt-2 text-lg border-gray-400 rounded-lg">
          <SelectValue placeholder="Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="15 Seconds">15 Seconds</SelectItem>
          <SelectItem value="30 Seconds">30 Seconds</SelectItem>
          <SelectItem value="45 Seconds">45 Seconds</SelectItem>
          <SelectItem value="60 Seconds">60 Seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDuration;
