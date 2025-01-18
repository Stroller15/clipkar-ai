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