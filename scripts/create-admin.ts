
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
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
  const password = "adminpassword123";
  const name = "System Administrator";
  const college = "CSJMU";

  console.log("Connecting to database...");

  // Check if admin exists
  const [existing] = await db.select().from(schema.users).where(eq(schema.users.email, email));

  if (existing) {
    console.log("Admin user already exists. Updating role...");
    await db.update(schema.users).set({ role: "ADMIN", teamName: "ADMIN_CORE" }).where(eq(schema.users.email, email));
    console.log("Admin role updated.");
    return;
  }

  console.log("Creating new admin user...");
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(schema.users).values({
    name,
    email,
    password: hashedPassword,
    college,
    role: "ADMIN",
    paymentStatus: "approved",
    teamName: "ADMIN_CORE",
    events: [],
  });

  console.log(`Admin user created successfully.\nEmail: ${email}\nPassword: ${password}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error creating admin:", err);
  process.exit(1);
});
