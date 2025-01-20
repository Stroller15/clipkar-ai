
import {
  integer,
  pgTable,
  varchar,
  boolean,
  timestamp,
  json,
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

export const videoData = pgTable("videoData", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  script: json().notNull(),
  audioFileURL: varchar().notNull(),
  captions: json().notNull(),
  imageList: varchar().array(),
  createdBy: varchar().notNull()
})