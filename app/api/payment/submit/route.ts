
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || "default_secret") as { userId: number };
    const { transactionId, amount, screenshotUrl } = await req.json();

    if (!transactionId || !amount || !screenshotUrl) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Update User
    await db.update(users)
      .set({ 
        transactionId, 
        declaredAmount: amount, 
        screenshotUrl,
        paymentStatus: "verification_pending" 
      })
      .where(eq(users.id, decoded.userId));

    return NextResponse.json({ success: true, message: "Payment submitted for verification" });

  } catch (error) {
    console.error("Payment Submission Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
