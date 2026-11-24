"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Check, Circle, Loader2 } from "lucide-react";
import SelectTopic, { TOPIC_LABELS } from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import indentString from "indent-string";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { FormData, StoryElements, VideoData } from "@/types";
import { videoDataContext } from "@/app/_context/videoDataContext";
import PlayerDialog from "@/components/custom/PlayerDialog";
import { PageHeader } from "@/components/custom/PageHeader";
import { Caption, ShortFrame, STYLES } from "@/components/custom/Brand";
import { cn } from "@/lib/utils";

type Stage = "script" | "voice" | "captions" | "images" | "saving";

const STAGES: { key: Stage; label: string; running: string }[] = [
  { key: "script", label: "Script", running: "Writing the script" },
  { key: "voice", label: "Voiceover", running: "Recording the voiceover" },
  { key: "captions", label: "Captions", running: "Timing the captions" },
  { key: "images", label: "Images", running: "Illustrating scenes" },
];

const CreatePage = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [stage, setStage] = useState<Stage | null>(null);
  const [done, setDone] = useState<Stage[]>([]);
  const [imageProgress, setImageProgress] = useState<{ done: number; total: number }>();
  const [error, setError] = useState<string | null>(null);
  const { videoData, setVideoData } = useContext(videoDataContext);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [videoId, setVideoId] = useState<number>();

  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const isGenerating = stage !== null;
  const ready = Boolean(
    formData.selectedTopic?.trim() && formData.selectedStyle && formData.selectedDuration
  );

  const markDone = (s: Stage) => setDone((prev) => [...prev, s]);

  const fail = (message: string, err: unknown) => {
    console.error(message, err);
    setError(message);
    setStage(null);
  };

  const prompt = indentString(
    `write a script to generate ${formData.selectedDuration || "30 Seconds"} video topic: interesting ${
      formData.selectedTopic || "Story"
    } along with AI image prompt in ${
      formData.selectedStyle || "Realistic"
    } style for each scene and give me result in JSON format with imagePrompt and contentText and field, No plain text`,
    2
  );

  // 1. script
  const getVideoScript = async () => {
    setStage("script");
    try {
      const result = await axios.post("/api/generate-video-image-script", { prompt });
      const newScript: StoryElements = result?.data?.result?.scenes;
      if (!newScript?.length) throw new Error("Empty script");
      setVideoData((prev) => ({ ...prev, videoScript: newScript }));
      markDone("script");
      generateAudioFile(newScript);
    } catch (err) {
      fail("Couldn't write the script. Try again.", err);
    }
  };

  const onCreate = () => {
    if (!ready || isGenerating) return;
    setError(null);
    setDone([]);
    setImageProgress(undefined);
    setVideoData({});
    getVideoScript();
  };

  // 2. voiceover
  const generateAudioFile = async (script: StoryElements) => {
    setStage("voice");
    const scriptText = script.map((item) => item.contentText).join(" ");
    try {
      const res = await axios.post("/api/generate-audio", { text: scriptText, id: uuidv4() });
      const url = res?.data?.result;
      if (!url) throw new Error("No audio URL");
      setVideoData((prev) => ({ ...prev, audioFileURL: url }));
      markDone("voice");
      generateCaptionFile(url, script);
    } catch (err) {
      fail("Couldn't record the voiceover. Try again.", err);
    }
  };

  // 3. captions
  const generateCaptionFile = async (audioFileURL: string, script: StoryElements) => {
    setStage("captions");
    try {
      const res = await axios.post("/api/generate-caption", { audioFileURL });
      setVideoData((prev) => ({ ...prev, captionFile: res?.data?.result }));
      markDone("captions");
      generateImage(script);
    } catch (err) {
      fail("Couldn't time the captions. Try again.", err);
    }
  };

  // 4. images
  const generateImage = async (script: StoryElements) => {
    setStage("images");
    const images: string[] = [];
    setImageProgress({ done: 0, total: script.length });
    try {
      for (const item of script) {
        const res = await axios.post("/api/generate-image", { prompt: item?.imagePrompt });
        images.push(res?.data?.result);
        setImageProgress({ done: images.length, total: script.length });
      }
      markDone("images");
      setStage("saving");
      setVideoData((prev) => ({ ...prev, imageList: images }));
    } catch (err) {
      fail("Couldn't illustrate the scenes. Try again.", err);
    }
  };

  useEffect(() => {
    if (Object.keys(videoData).length === 4) {
      saveVideoData(videoData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoData]);

  const saveVideoData = async (data: VideoData) => {
    if (!data.videoScript || !data.audioFileURL || !data.captionFile) {
      fail("Something went missing while generating. Try again.", data);
      return;
    }

    try {
      const res = await axios.post<{ result: { id: number } }>("/api/videos", {
        videoScript: data.videoScript,
        audioFileURL: data.audioFileURL,
        captionFile: data.captionFile,
        imageList: data.imageList ?? [],
      });
      setVideoId(res.data.result.id);
      setPlayerOpen(true);
      setStage(null);
    } catch (err) {
      fail("Couldn't save your short. Try again.", err);
    }
  };

  const style = STYLES.find((s) => s.name === formData.selectedStyle);
  const captionWords = (formData.selectedTopic?.trim() || "Your short starts here")
    .split(/\s+/)
    .slice(0, 8);

  const currentStage = STAGES.find((s) => s.key === stage);

  return (
    <div className="space-y-8">
      <PageHeader title="New short" description="Three choices, then ClipKar does the rest" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 xl:gap-16">
        {/* Form */}
        <div className="divide-y divide-border">
          <SelectTopic onUserSelect={onHandleInputChange} />
          <SelectStyle onUserSelect={onHandleInputChange} />
          <SelectDuration onUserSelect={onHandleInputChange} />
        </div>

        {/* Preview + generate */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex gap-4 lg:flex-col">
              <ShortFrame className="w-[112px] shrink-0 lg:mx-auto lg:w-[200px]">
                {style && (
                  <Image
                    key={style.name}
                    src={style.image}
                    alt=""
                    fill
                    sizes="200px"
                    className="animate-in fade-in-0 scale-[1.35] object-cover duration-300"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-2 bottom-6 lg:inset-x-3 lg:bottom-10">
                  <Caption
                    words={captionWords}
                    active={captionWords.length - 1}
                    className="text-[12px] lg:text-[16px]"
                  />
                </div>
              </ShortFrame>

              <dl className="min-w-0 flex-1 space-y-2 text-[13px]">
                {[
                  ["Topic", TOPIC_LABELS[formData.selectedTopic ?? ""] ?? formData.selectedTopic?.trim()],
                  ["Style", style && ("label" in style ? style.label : style.name)],
                  ["Length", formData.selectedDuration?.replace(" Seconds", "s")],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className={cn("truncate text-right", v ? "text-foreground" : "text-muted-foreground")}>
                      {v || "—"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {(isGenerating || done.length > 0) && (
              <ol className="mt-4 space-y-1 border-t border-border pt-4" aria-live="polite">
                {STAGES.map((s) => {
                  const isDone = done.includes(s.key);
                  const isRunning = stage === s.key;
                  return (
                    <li
                      key={s.key}
                      className={cn(
                        "flex h-9 items-center gap-2 rounded-lg px-2 text-[13px]",
                        isRunning && "bg-raised"
                      )}
                    >
                      <span className="grid h-4 w-4 place-items-center">
                        {isDone ? (
                          <Check className="h-4 w-4 text-positive" strokeWidth={1.5} />
                        ) : isRunning ? (
                          <Loader2 className="h-4 w-4 animate-spin text-caption" strokeWidth={1.5} />
                        ) : (
                          <Circle className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                        )}
                      </span>
                      <span className={isRunning ? "text-foreground" : "text-subtle"}>{s.label}</span>
                      {s.key === "images" && imageProgress && (
                        <span className="ml-auto font-mono text-[12px] tabular-nums text-muted-foreground">
                          {imageProgress.done} of {imageProgress.total}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}

            {error && (
              <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-[13px] text-destructive">
                {error}
              </p>
            )}

            <Button
              size="lg"
              onClick={onCreate}
              disabled={!ready || isGenerating}
              className="mt-4 w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" />
                  {stage === "saving" ? "Saving" : currentStage?.running}
                </>
              ) : (
                "Generate short"
              )}
            </Button>
            {!ready && !isGenerating && (
              <p className="mt-2 text-center text-[12px] text-muted-foreground">
                Choose a topic, style and length to continue
              </p>
            )}
          </div>
        </aside>
      </div>

      <PlayerDialog
        open={playerOpen}
        videoId={videoId}
        onOpenChange={setPlayerOpen}
        title="Your short is ready"
      />
    </div>
  );
};

export default CreatePage;
