CREATE TABLE "stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"mood" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
