export type FormData = {
  selectedTopic?: string;
  selectedStyle?: string;
  selectedDuration?: string;
};

export interface StoryElement {
  imagePrompt: string;
  contentText: string;
}

export type StoryElements = StoryElement[];

interface Caption {
  end: number;
}

export interface VideoData {
  id?: number;
  videoScript?: StoryElements;
  audioFileURL?: string;
  captionFile?: Caption[];
  imageList?: string[];
  createdBy?: string;
  setDurationInFrame?: (frameValue: number) => void;
}
