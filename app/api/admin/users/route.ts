
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, registrations } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
        }

        // Verify Admin Token
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET || "default_secret") as { userId: number, email: string };
        
        // Check if user is admin in DB
        const [adminUser] = await db.select().from(users).where(eq(users.id, decoded.userId));
        
        if (!adminUser || adminUser.role !== 'ADMIN') {
             return NextResponse.json({ error: "FORBIDDEN: ADMIN_ACCESS_ONLY" }, { status: 403 });
        }

        // Fetch all users with their registrations
        // Note: Drizzle doesn't support easy relations without defining them in schema with relations(), 
        // so we might need to do a join or separate queries. 
        // For simplicity in this stack, let's fetch users and format them.
        
        const allUsers = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            college: users.college,
            role: users.role,
            paymentStatus: users.paymentStatus,
            events: users.events,
            createdAt: users.createdAt
        }).from(users).orderBy(desc(users.createdAt));
        
        // We could also join with registrations to get specific team details if needed
        // but for payment approval, user paymentStatus is on the user table itself currently.
        
        return NextResponse.json({ users: allUsers }, { status: 200 });

    } catch (error) {
        console.error("Admin Users Fetch Error:", error);
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
