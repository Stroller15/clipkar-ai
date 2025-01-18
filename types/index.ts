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

export interface VideoData {
  videoScript?: StoryElements; 
  audioFileURL?: string;       
  captionFile?: string[];       
  imageList?: string[];        
}