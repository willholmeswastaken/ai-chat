import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations, InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  clerkId: varchar("clerk_id").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  chats: many(chats),
}));

export const chats = pgTable("chats", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatsRelations = relations(chats, ({ many, one }) => ({
  user: one(users, {
    fields: [chats.userId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey(),
  chatId: varchar("chat_id").references(() => chats.id),
  role: varchar("role", { enum: ["user", "assistant"] }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
}));

export type Chat = InferSelectModel<typeof chats>;
export type Message = InferSelectModel<typeof messages>;
export type User = InferSelectModel<typeof users>;

// You might also want relationship types
export type ChatWithMessages = Chat & {
  messages: Message[];
};
