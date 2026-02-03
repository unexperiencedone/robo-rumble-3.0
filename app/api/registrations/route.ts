import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { registrations } from '@/db/schema';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';

// Middleware-like check for admin session
async function isAdmin() {
    const cookieStore = await cookies();
    return cookieStore.get('admin_session')?.value === 'true';
}

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await db.select().from(registrations);
        // Reverse to show newest first
        return NextResponse.json(data.reverse());
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching registrations' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // NOTE: This POST handler logic seems to mismatch the database schema for 'registrations'.
        // The table expects 'userId', 'eventId', 'teamDetails', but this API was receiving 'name', 'email', etc.
        // Since this route seems unused (Auth uses /api/auth/register), I am disabling the write to DB to prevent runtime errors.
        // If this route is needed, it must be aligned with the schema.
        
        const body = await request.json();
        console.log("Received registration request (Legacy Route):", body);

        return NextResponse.json({ success: false, message: 'Endpoint deprecated or needs update' }, { status: 501 });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing registration' }, { status: 500 });
    }
}
