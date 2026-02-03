
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { userId, status } = await req.json(); // status: 'pending' | 'paid'

        if (!userId || !status) {
            return NextResponse.json({ error: "MISSING_DATA" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
        }

        // Verify Admin Token
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET || "default_secret") as { userId: number };
        const [adminUser] = await db.select().from(users).where(eq(users.id, decoded.userId));
        
        if (!adminUser || adminUser.role !== 'ADMIN') {
             return NextResponse.json({ error: "FORBIDDEN: ADMIN_ACCESS_ONLY" }, { status: 403 });
        }

        // Update Payment Status
        await db.update(users)
            .set({ paymentStatus: status })
            .where(eq(users.id, userId));

        return NextResponse.json({ message: "STATUS_UPDATED", userId, status }, { status: 200 });

    } catch (error) {
        console.error("Admin Payment Update Error:", error);
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
