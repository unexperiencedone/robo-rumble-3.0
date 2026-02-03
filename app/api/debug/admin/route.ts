
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
    try {
        const email = "admin@roborumble.com";
        const [existing] = await db.select().from(users).where(eq(users.email, email));

        if (!existing) {
            return NextResponse.json({ 
                status: "MISSING", 
                message: "Admin user does not exist." 
            });
        }

        return NextResponse.json({ 
            status: "EXISTS", 
            user: { 
                id: existing.id, 
                role: existing.role, 
                teamName: existing.teamName,
                paymentStatus: existing.paymentStatus
            }
        });

    } catch (error) {
        return NextResponse.json({ error: "DB_ERROR", details: String(error) }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const email = "admin@roborumble.com";
        const password = "adminpassword123";
        
        const [existing] = await db.select().from(users).where(eq(users.email, email));
        
        if (existing) {
             // Force update role
             await db.update(users).set({ 
                 role: "ADMIN", 
                 teamName: "ADMIN_CORE",
                 paymentStatus: "approved"
             }).where(eq(users.email, email));
             
             return NextResponse.json({ message: "Admin role restored." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.insert(users).values({
            name: "System Administrator",
            email,
            password: hashedPassword,
            college: "CSJMU",
            role: "ADMIN",
            paymentStatus: "approved",
            teamName: "ADMIN_CORE",
            events: [],
        });

        return NextResponse.json({ message: "Admin created successfully." });

    } catch(err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
