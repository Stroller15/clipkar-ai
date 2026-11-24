import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { STYLES } from "@/components/custom/Brand";
import { cn } from "@/lib/utils";
import { Field } from "./Field";

interface SelectStyleProps {
  onUserSelect: (type: string, value: string) => void;
}

const SelectStyle: React.FC<SelectStyleProps> = ({ onUserSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Field step="02" id="style" title="Style" hint="Every scene is illustrated in this look">
      <div
        role="radiogroup"
        aria-labelledby="style"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {STYLES.map((item) => {
          const active = selected === item.name;
          const label = "label" in item ? item.label : item.name;
          return (
            <button
              key={item.name}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                setSelected(item.name);
                onUserSelect("selectedStyle", item.name);
              }}
              className={cn(
                "group rounded-xl border p-1 text-left transition-colors",
                active
                  ? "border-caption/70 bg-caption/10"
                  : "border-border bg-card hover:border-foreground/20"
              )}
            >
              <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-raised">
                <Image
                  alt=""
                  src={item.image}
                  fill
                  sizes="(min-width: 640px) 200px, 45vw"
                  className="object-cover"
                />
                {active && (
                  <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-caption text-caption-foreground">
                    <Check className="h-3 w-3" strokeWidth={2} />
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "block px-2 pb-1 pt-2 text-[14px]",
                  active ? "text-foreground" : "text-subtle group-hover:text-foreground"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </Field>
  );
};

export default SelectStyle;
