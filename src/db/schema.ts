import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const blogsTable = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  date: varchar({ length: 255 }).notNull().unique(),
});