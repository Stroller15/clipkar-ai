
import {
  integer,
  pgTable,
  varchar,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  imageUrl: varchar(),
  subscription: boolean().default(false),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

// 2. Define proper types for the schema
export type StoryElement = {
  imagePrompt: string;
  contentText: string;
};

export type VideoDataInsert = {
  script: StoryElement[];
  audioFileURL: string;
  captions: string[];
  imageList: string[];
  createdBy: string;
};

// 3. Update the schema with proper types
export const videoDataSchema = pgTable("videoDataSchema", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  script: jsonb("script").notNull().$type<StoryElement[]>(), 
  audioFileURL: varchar("audioFileURL").notNull(),
  captions: jsonb("captions").notNull().$type<string[]>(),
  imageList: varchar("imageList").array(),
  createdBy: varchar("createdBy").notNull()
});
