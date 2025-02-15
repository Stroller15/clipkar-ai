CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"imageUrl" varchar,
	"subscription" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "videoDataSchema" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "videoDataSchema_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"script" jsonb NOT NULL,
	"audioFileURL" varchar NOT NULL,
	"captions" jsonb NOT NULL,
	"imageList" varchar[],
	"createdBy" varchar NOT NULL
);
