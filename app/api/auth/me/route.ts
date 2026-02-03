
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify Token
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || "default_secret") as { userId: number };

    // Fetch User
    const [user] = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      college: users.college,
      events: users.events,
      paymentStatus: users.paymentStatus,
      role: users.role,
      teamName: users.teamName,
      paidEvents: users.paidEvents,
      createdAt: users.createdAt
    }).from(users).where(eq(users.id, decoded.userId));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error("Session Error:", error);
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}
