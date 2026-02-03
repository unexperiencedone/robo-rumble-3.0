
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
        }

        const decoded = jwt.verify(token.value, process.env.JWT_SECRET || "default_secret") as { userId: number };
        
        // Verify Admin
        const [adminUser] = await db.select().from(users).where(eq(users.id, decoded.userId));
        if (!adminUser || adminUser.role !== 'ADMIN') {
            return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
        }

        const { userId, status } = await req.json();

        if (!userId || !status) {
            return NextResponse.json({ error: "MISSING_DATA" }, { status: 400 });
        }

        // Fetch target user to get their current events
        const [targetUser] = await db.select().from(users).where(eq(users.id, userId));
        if (!targetUser) {
            return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
        }

        // If approving (status = 'paid'), sync paidEvents with current events
        // If revoking (status = 'pending'), maybe clear paidEvents? Or keep them? 
        // User asked "status should again become due from approved".
        // Assuming 'approve' means "Everything currently registered is now paid".
        
        const updateData: any = { paymentStatus: status };

        if (status === 'paid') {
            updateData.paidEvents = targetUser.events; // All current events are now paid
        }

        await db.update(users)
            .set(updateData)
            .where(eq(users.id, userId));

        return NextResponse.json({ message: "STATUS_UPDATED" });

    } catch (error) {
        console.error("Payment Update Error:", error);
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
