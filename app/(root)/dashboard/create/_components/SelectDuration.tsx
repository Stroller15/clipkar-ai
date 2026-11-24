import { useState } from "react";
import { DURATIONS } from "@/components/custom/Brand";
import { cn } from "@/lib/utils";
import { Field } from "./Field";

interface SelectDurationProps {
  onUserSelect: (type: string, value: string) => void;
}

const SelectDuration: React.FC<SelectDurationProps> = ({ onUserSelect }) => {
  const [value, setValue] = useState("");

  return (
    <Field step="03" id="length" title="Length" hint="The script and voiceover are paced to fit">
      <div
        role="radiogroup"
        aria-labelledby="length"
        className="inline-grid w-full grid-cols-4 gap-1 rounded-xl border border-border bg-card p-1 sm:w-auto"
      >
        {DURATIONS.map((d) => {
          const active = value === d;
          return (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                setValue(d);
                onUserSelect("selectedDuration", d);
              }}
              className={cn(
                "h-9 rounded-lg px-4 font-mono text-[13px] tabular-nums transition-colors sm:min-w-20",
                active
                  ? "bg-raised text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "text-subtle hover:text-foreground"
              )}
            >
              {d.replace(" Seconds", "s")}
            </button>
          );
        })}
      </div>
    </Field>
  );
};

export default SelectDuration;
