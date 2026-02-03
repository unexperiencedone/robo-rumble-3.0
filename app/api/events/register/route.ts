import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, registrations } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { events } from "@/app/data/events";

export async function POST(req: Request) {
    try {
        const { eventId, teamDetails } = await req.json();

        if (!eventId || !teamDetails) {
            return NextResponse.json({ error: "MISSING_DATA" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "UNAUTHORIZED_ACCESS" }, { status: 401 });
        }

        // Verify Token
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET || "default_secret") as { userId: number };
        const userId = decoded.userId;

        // Fetch User
        const [user] = await db.select().from(users).where(eq(users.id, userId));
        if (!user) {
            return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
        }

        // Validate Event
        const eventDef = events.find(e => e.id === eventId);
        if (!eventDef) {
           return NextResponse.json({ error: "INVALID_EVENT" }, { status: 400 });
        }

        // Validate Team Size
        // Parse "3-5 Members" or "Individual" or "2-4 Members"
        // Simple parser: find numbers.
        const sizeString = eventDef.teamSize.toLowerCase();
        let min = 1, max = 1;
        if (sizeString.includes("individual")) {
             max = 1;
             if (sizeString.includes("team of")) { 
                 // e.g. "Individual / Team of 2" -> max 2
                 const matches = sizeString.match(/(\d+)/g);
                 if (matches) max = Math.max(...matches.map(Number));
             }
        } else {
             const matches = sizeString.match(/(\d+)/g);
             if (matches && matches.length > 0) {
                 min = matches[0] ? parseInt(matches[0]) : 1;
                 max = matches[matches.length - 1] ? parseInt(matches[matches.length - 1]) : min;
             }
        }
        
        // teamDetails should be an array of members
        const members = Array.isArray(teamDetails) ? teamDetails : [];
        if (members.length < min || members.length > max) {
            return NextResponse.json({ error: `TEAM_SIZE_VIOLATION: Must be between ${min} and ${max} members.` }, { status: 400 });
        }


        // Check if already registered
        const existingReg = await db.select().from(registrations).where(
            and(
                eq(registrations.userId, userId),
                eq(registrations.eventId, eventId)
            )
        );

        if (existingReg.length > 0) {
            return NextResponse.json({ message: "ALREADY_REGISTERED" }, { status: 200 });
        }

        // Insert Registration
        await db.insert(registrations).values({
            userId: userId,
            eventId: eventId,
            teamDetails: JSON.stringify(teamDetails)
        });

        // Update User Events Array (Legacy/Quick Access)
        const currentEvents = user.events || [];
        if (!currentEvents.includes(eventId)) {
            await db.update(users)
                .set({ events: [...currentEvents, eventId] })
                .where(eq(users.id, userId));
        }

        return NextResponse.json({ message: "MISSION_ACCEPTED" }, { status: 200 });

    } catch (error) {
        console.error("Event Registration Error:", error);
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
