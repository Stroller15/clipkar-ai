
import {
  integer,
  pgTable,
  varchar,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import type { Caption } from "@/types";

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

export type VideoDataInsert = typeof videoDataSchema.$inferInsert;

// 3. Update the schema with proper types
export const videoDataSchema = pgTable("videoDataSchema", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  videoScript: jsonb("script").notNull().$type<StoryElement[]>(), 
  audioFileURL: varchar("audioFileURL").notNull(),
  captionFile: jsonb("captions").notNull().$type<Caption[]>(),
  imageList: varchar("imageList").array(),
  createdBy: varchar("createdBy").notNull()
});
