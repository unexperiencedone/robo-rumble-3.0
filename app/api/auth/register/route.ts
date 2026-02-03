
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { name, teamName, email, password, college } = await req.json();

        if (!name || !teamName || !email || !password || !college) {
            return NextResponse.json({ error: "ALL_FIELDS_REQUIRED" }, { status: 400 });
        }

        // Check if user exists
        const [existing] = await db.select().from(users).where(eq(users.email, email));

        if (existing) {
            return NextResponse.json({ error: "USER_ALREADY_EXISTS" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const [newUser] = await db.insert(users).values({
            name,
            teamName,
            email,
            password: hashedPassword,
            college,
            events: [], // Initialize as empty array
            paymentStatus: "pending"
        }).returning();

        // Create Token
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "7d" }
        );

        // Set Cookie
        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return NextResponse.json({ message: "Registration successful", user: newUser }, { status: 201 });

    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
