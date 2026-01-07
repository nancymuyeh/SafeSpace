import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const stories = pgTable('stories', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  mood: text('mood').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
