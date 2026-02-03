
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registrations, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || "default_secret") as { userId: number };
    
    const userRegistrations = await db.select().from(registrations).where(eq(registrations.userId, decoded.userId));

    return NextResponse.json({ registrations: userRegistrations });
  } catch (error) {
    console.error("Fetch Registrations Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
