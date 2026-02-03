
import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  college: text("college").notNull(),
  events: text("events").array(), // Storing as array of strings
  teamMembers: text("team_members").array(), // Store team members if needed
  paymentStatus: text("payment_status").default("pending"),
  role: text("role").default("USER"), // 'USER' | 'ADMIN'
  teamName: text("team_name"), // Team name for the user
  paidEvents: text("paid_events").array(), // Events that have been paid for
  transactionId: text("transaction_id"),
  screenshotUrl: text("screenshot_url"),
  declaredAmount: text("declared_amount"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  eventId: text("event_id").notNull(),
  teamDetails: text("team_details").notNull(), // Store JSON string of team members
  createdAt: timestamp("created_at").defaultNow(),
});
