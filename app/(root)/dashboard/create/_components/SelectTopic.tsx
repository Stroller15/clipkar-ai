"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { TOPICS } from "@/components/custom/Brand";
import { Field, chipClass } from "./Field";

const CUSTOM = "Custom Prompt";

export const TOPIC_LABELS: Record<string, string> = {
  "Random AI Story": "Random story",
  "Scary Story": "Scary story",
  "Historical Facts": "Historical facts",
  "Bed Time Story": "Bedtime story",
  Motivational: "Motivational",
  "Fun Facts": "Fun facts",
  "Kids Story": "Kids story",
  [CUSTOM]: "Write my own",
};

interface SelectTopicProps {
  onUserSelect: (type: string, value: string) => void;
}

const SelectTopic: React.FC<SelectTopicProps> = ({ onUserSelect }) => {
  const [selected, setSelected] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState("");

  const choose = (value: string) => {
    setSelected(value);
    onUserSelect("selectedTopic", value === CUSTOM ? customPrompt : value);
  };

  return (
    <Field step="01" id="topic" title="Topic" hint="What the short is about">
      <div role="radiogroup" aria-labelledby="topic" className="flex flex-wrap gap-2">
        {[...TOPICS, CUSTOM].map((item) => (
          <button
            key={item}
            type="button"
            role="radio"
            aria-checked={selected === item}
            onClick={() => choose(item)}
            className={chipClass(selected === item)}
          >
            {TOPIC_LABELS[item] ?? item}
          </button>
        ))}
      </div>

      {selected === CUSTOM && (
        <div className="mt-4">
          <label htmlFor="custom-prompt" className="sr-only">
            Your prompt
          </label>
          <Textarea
            id="custom-prompt"
            autoFocus
            value={customPrompt}
            onChange={(e) => {
              setCustomPrompt(e.target.value);
              onUserSelect("selectedTopic", e.target.value);
            }}
            placeholder="A lighthouse keeper who finds a message in a bottle"
            className="min-h-28"
            maxLength={400}
          />
          <p className="mt-2 text-right font-mono text-[12px] tabular-nums text-muted-foreground">
            {customPrompt.length}/400
          </p>
        </div>
      )}
    </Field>
  );
};

export default SelectTopic;
