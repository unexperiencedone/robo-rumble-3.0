
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: '.env.local' }); 

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing from .env.local");
    process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function main() {
  const email = "admin@roborumble.com";
  console.log(`Checking for user: ${email}...`);

  try {
      const users = await db.select().from(schema.users).where(eq(schema.users.email, email));
      
      if (users.length === 0) {
          console.log("RESULT: User NOT FOUND.");
      } else {
          const u = users[0];
          console.log("RESULT: User FOUND.");
          console.log(`ID: ${u.id}`);
          console.log(`Role: ${u.role}`);
          console.log(`PaymentStatus: ${u.paymentStatus}`);
      }
  } catch (err) {
      console.error("DB Error:", err);
  }
  process.exit(0);
}

main();
