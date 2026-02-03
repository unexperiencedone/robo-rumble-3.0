
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users, announcements, registrations } from '../db/schema';
export * from '../db/schema'; // Re-export everything (tables + types)

// This will be used for serverless connection
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema: { users, announcements, registrations } });
