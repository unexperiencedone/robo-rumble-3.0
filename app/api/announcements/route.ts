import { NextResponse } from 'next/server';
import { getDb, saveDb, Announcement } from '@/lib/db';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

// Middleware-like check for admin session
async function isAdmin() {
    const cookieStore = await cookies();
    return cookieStore.get('admin_session')?.value === 'true';
}

export async function GET() {
    const db = getDb();
    // Reverse to show newest first
    return NextResponse.json(db.announcements.reverse());
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

        const db = getDb();
        const newAnnouncement: Announcement = {
            id: uuidv4(),
            title,
            message,
            type,
            date: new Date().toISOString(),
        };

        db.announcements.push(newAnnouncement);
        saveDb(db);

        return NextResponse.json({ success: true, data: newAnnouncement });
    } catch (error) {
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

        const db = getDb();
        db.announcements = db.announcements.filter((a) => a.id !== id);
        saveDb(db);

        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting announcement' }, { status: 500 });
    }
}
