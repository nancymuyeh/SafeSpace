import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Users table (mostly for potential future use or internal tracking, as app is anonymous-first)
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const stories = pgTable('stories', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  mood: text('mood').notNull(), // e.g., 'happy', 'sad', 'anxious'
  userId: uuid('user_id').references(() => users.id), // Nullable for anonymous posts
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reactions = pgTable('reactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  storyId: uuid('story_id').references(() => stories.id).notNull(),
  type: text('type').notNull(), // e.g., 'heart', 'hug', 'support'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  storyId: uuid('story_id').references(() => stories.id).notNull(),
  reason: text('reason').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const resources = pgTable('resources', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  url: text('url').notNull(),
  type: text('type').notNull(), // e.g., 'crises', 'article', 'video'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
