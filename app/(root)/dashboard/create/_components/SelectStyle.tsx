import { useState } from "react";
import Image from "next/image";

interface SelectStyleProps {
  onUserSelect: (type: string, value: string) => void;
}

const SelectStyle: React.FC<SelectStyleProps> = ({ onUserSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  const selectOptions = [
    {
      name: "Realistic",
      image: "/realistic.png",
    },
    {
      name: "Cartoon",
      image: "/cartoon.png",
    },
    {
      name: "Comic",
      image: "/comic.png",
    },
    {
      name: "GTA",
      image: "/gta.png",
    },
    {
      name: "Imaginary",
      image: "/imaginary.png",
    },
    {
      name: "WaterColor",
      image: "/watercolor.png",
    },
  ];

  const handleSelection = (itemName: string) => {
    setSelectedOption(itemName);
    setIsTouched(true);
    onUserSelect("selectedStyle", itemName);
  };

  return (
    <div className="mt-5">
      <div className="flex items-baseline gap-2">
        <h2 className="font-bold text-xl text-primary">Content Style</h2>
        <span className="text-red-500">*</span>
      </div>
      <p className="font-xl text-gray-500">
        Select content style of your short video!
      </p>
      <div className="grid grid-col-2 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-4">
        {selectOptions.map((item, index) => (
          <div
            onClick={() => handleSelection(item.name)}
            key={index}
            className={`relative hover:scale-105 transition-all cursor-pointer
              ${
                selectedOption === item.name
                  ? "border-4 border-primary rounded-xl"
                  : isTouched && !selectedOption
                  ? "border-2 border-red-500 rounded-xl"
                  : ""
              }`}
          >
            <Image
              alt={item.name}
              src={item.image}
              width={200}
              height={200}
              className="h-48 object-cover w-full rounded-md"
            />
            <h2 className="bg-black absolute bottom-0 w-full text-white text-center rounded-b-md">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
      {isTouched && !selectedOption && (
        <p className="mt-2 text-sm text-red-500">
          Please select a content style
        </p>
      )}
    </div>
  );
};

export default SelectStyle;
