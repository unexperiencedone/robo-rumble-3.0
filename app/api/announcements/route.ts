import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { announcements } from '@/db/schema';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';

// Middleware-like check for admin session
async function isAdmin() {
    const cookieStore = await cookies();
    return cookieStore.get('admin_session')?.value === 'true';
}

export async function GET() {
    try {
        const data = await db.select().from(announcements);
        // Reverse to show newest first (client-side sort might be better but this maintains existing behavior)
        return NextResponse.json(data.reverse());
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching announcements' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, message, type = 'info' } = body;

        if (!title || !message) {
            return NextResponse.json({ message: 'Title and message required' }, { status: 400 });
        }

        const newAnnouncement = await db.insert(announcements).values({
            id: crypto.randomUUID(), // Ensure Node environment supports this or use uuid package
            title,
            message,
            type,
            date: new Date(),
        }).returning();

        return NextResponse.json({ success: true, data: newAnnouncement[0] });
    } catch (error) {
        console.error("Error adding announcement:", error);
        return NextResponse.json({ message: 'Error adding announcement' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'ID required' }, { status: 400 });
        }

        await db.delete(announcements).where(eq(announcements.id, id));

        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        return NextResponse.json({ message: 'Error deleting announcement' }, { status: 500 });
    }
}
