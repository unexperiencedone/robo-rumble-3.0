import { NextResponse } from 'next/server';
import { getDb, saveDb, Registration } from '@/lib/db';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

// Middleware-like check for admin session
async function isAdmin() {
    const cookieStore = await cookies();
    return cookieStore.get('admin_session')?.value === 'true';
}

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    // Reverse to show newest first
    return NextResponse.json(db.registrations.reverse());
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, college, event } = body;

        if (!name || !email || !college || !event) {
            return NextResponse.json({ message: 'All fields required' }, { status: 400 });
        }

        const db = getDb();
        const newRegistration: Registration = {
            id: uuidv4(),
            name,
            email,
            college,
            event,
            timestamp: new Date().toISOString(),
        };

        db.registrations.push(newRegistration);
        saveDb(db);

        return NextResponse.json({ success: true, message: 'Registration successful' });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing registration' }, { status: 500 });
    }
}
