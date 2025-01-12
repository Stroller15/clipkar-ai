import React, { useState } from "react";
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
  const [isTouched, setIsTouched] = useState(false);
  const [value, setValue] = useState("");

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setIsTouched(true);
    onUserSelect("selectedDuration", newValue);
  };

  return (
    <div className="mt-5">
      <div className="flex items-baseline gap-2">
        <h2 className="font-bold text-xl text-primary">Content Duration</h2>
        <span className="text-red-500">*</span>
      </div>
      <p className="font-xl text-gray-500">
        Select the duration of your short video!
      </p>
      <div className="relative">
        <Select onValueChange={handleValueChange} required>
          <SelectTrigger
            className={`w-full p-6 mt-2 text-lg rounded-lg ${
              isTouched && !value
                ? "border-red-500 border-2"
                : "border-gray-400"
            }`}
          >
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15 Seconds">15 Seconds</SelectItem>
            <SelectItem value="30 Seconds">30 Seconds</SelectItem>
            <SelectItem value="45 Seconds">45 Seconds</SelectItem>
            <SelectItem value="60 Seconds">60 Seconds</SelectItem>
          </SelectContent>
        </Select>
        {isTouched && !value && (
          <p className="mt-2 text-sm text-red-500">Please select a duration</p>
        )}
      </div>
    </div>
  );
};

export default SelectDuration;
