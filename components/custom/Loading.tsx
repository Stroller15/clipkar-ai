import { Loader2 } from "lucide-react";

export const LoadingState = ({
  type,
}: {
  type: "script" | "audio" | "caption" | "image";
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>
        {type === "script"
          ? "Generating video script..."
          : type === "audio"
          ? "Generating audio..."
          : type === "caption"
          ? "Generating caption..."
          : "Generating images..."}
      </span>
    </div>
  );
};
