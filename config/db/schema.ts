
import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({length: 255}).notNull(),
  email: varchar({length: 255}).notNull(),
  imageUrl: varchar(),
  subscription: boolean().default(false)
});