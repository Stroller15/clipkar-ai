import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";

// gemini-2.0-flash* was shut down on 2026-06-01. Override with GEMINI_MODEL
// when Google retires this one: https://ai.google.dev/gemini-api/docs/deprecations
const DEFAULT_MODEL = "gemini-3.6-flash";

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

/**
 * A fresh chat per request. The few-shot example below is the only history,
 * so one user's prompts never leak into another user's request.
 */
export function createScriptSession() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const model = new GoogleGenerativeAI(apiKey).getGenerativeModel({
    model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
  });

  return model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Write a script for a 30-second video telling an interesting historical story. Each scene should include:\n\nImagePrompt: A detailed description for generating a realistic AI-generated image for that specific scene.\nContentText: A narration or dialogue text that explains what’s happening in the scene or moves the story forward.\nReturn the result in JSON format with fields imagePrompt and contentText. Ensure that the story fits within 30 seconds and is engaging, visually compelling, and historically accurate.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "scenes": [\n    {\n      "imagePrompt": "A dimly lit, cluttered workshop in 1840s London. A young woman, Ada Lovelace, with dark, intelligent eyes and a determined expression, sits at a large wooden table covered in complex diagrams and notes. A mechanical contraption, an early form of the Analytical Engine, sits partially assembled in the foreground. Sunlight streams in from a single window, illuminating dust motes in the air.",\n      "contentText": "1840s London. Ada Lovelace, daughter of Lord Byron, wasn\'t interested in society balls. She was captivated by a different kind of machine..."\n    },\n    {\n      "imagePrompt": "Close-up of Ada Lovelace\'s hands, delicate yet strong, carefully adjusting a cog on the Analytical Engine prototype. The metallic pieces gleam under the light. Lines of code written on parchment are visible in the background, along with mathematical symbols.",\n        "contentText": "…The Analytical Engine, a marvel of gears and cogs. But Ada saw more than just a calculating machine. She saw potential."\n    },\n   {\n      "imagePrompt": "A wider shot showing Ada Lovelace looking intently at a page of her notes. Around her, in a dreamy, slightly ethereal way, abstract representations of musical notes and complex geometric patterns float, visualizing Ada\'s concepts.",\n       "contentText": "She understood that this machine could manipulate symbols, not just numbers. She wrote the first algorithm designed to be processed by a machine... the first computer program."\n   },\n    {\n     "imagePrompt": "A fast montage of AI-generated images showing modern computer screens, smartphones, and intricate circuit boards, all flowing from the central image of the Analytical Engine, suggesting its influence. The images are dynamic and quick, almost like a transition effect.",\n     "contentText": "Her visionary work laid the foundation for the digital age we know today. Ada Lovelace: a true pioneer."\n   },\n    {\n       "imagePrompt": "A final shot of Ada Lovelace, now in a slightly brighter light, looking towards the camera with a knowing, subtle smile. Behind her, a faint, translucent image of a modern computer chip is overlaid, showing her enduring legacy.",\n       "contentText": "Her legacy echoes in every line of code. Remember her name: Ada Lovelace, the world\'s first computer programmer."\n    }\n  ]\n}\n```\n',
          },
        ],
      },
    ],
  });
}
