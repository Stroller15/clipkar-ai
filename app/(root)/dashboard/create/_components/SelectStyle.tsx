import { useState } from "react";
import Image from "next/image";

interface SelectStyleProps {
  onUserSelect: (type: string, value: string) => void;
}
const SelectStyle: React.FC<SelectStyleProps> = ({ onUserSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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

  return (
    <div className="mt-5">
      <h2 className="font-bold text-primary">2 - Content Style</h2>
      <p className="font-xl font-gray">
        Select content style of your short video!
      </p>
      <div className="grid grid-col-2 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-4">
        {selectOptions.map((item, index) => (
          <div
            onClick={() => {
              setSelectedOption(item.name);
              onUserSelect("selectedStyle", item.name);
            }}
            key={index}
            className={`relative hover:scale-105 transition-all cursor-pointer ${
              selectedOption === item.name
                ? "border-4 border-primary rounded-xl"
                : ""
            }`}
          >
            <Image
              alt={item.name}
              src={item.image}
              width={200}
              height={200}
              className="h-48 object-cover w-full rounded-md "
            />
            <h2 className="bg-black absolute bottom-0 w-full text-white text-center rounded-b-md">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
