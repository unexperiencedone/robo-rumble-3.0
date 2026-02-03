import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

export interface Announcement {
    id: string;
    title: string;
    message: string;
    date: string;
    type: 'info' | 'alert' | 'success';
}

export interface Registration {
    id: string;
    name: string;
    email: string;
    college: string;
    event: string;
    timestamp: string;
}

export interface Database {
    announcements: Announcement[];
    registrations: Registration[];
}

// Ensure data directory exists
const ensureDb = () => {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ announcements: [], registrations: [] }, null, 2));
    }
};

export const getDb = (): Database => {
    ensureDb();
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

export const saveDb = (data: Database) => {
    ensureDb();
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
