
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from '../db/schema';

// This will be used for serverless connection
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema: { users } });
