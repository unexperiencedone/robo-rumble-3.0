"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MatrixBackground from "../../components/MatrixBackground";
import { Megaphone, Users, Plus, Trash2, LogOut } from "lucide-react";
import { Announcement, Registration } from "@/lib/db";

export default function AdminDashboard() {
    const [tab, setTab] = useState<'announcements' | 'registrations'>('announcements');
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Form states
    const [newTitle, setNewTitle] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [newType, setNewType] = useState<"info" | "alert" | "success">("info");

    useEffect(() => {
        fetchData();
    }, [tab]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            if (tab === 'announcements') {
                const res = await fetch('/api/announcements');
                if (res.ok) setAnnouncements(await res.json());
            } else {
                const res = await fetch('/api/registrations');
                if (res.status === 401) {
                    router.push('/admin/login');
                    return;
                }
                if (res.ok) setRegistrations(await res.json());
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/announcements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle, message: newMessage, type: newType }),
            });
            if (res.ok) {
                setNewTitle("");
                setNewMessage("");
                fetchData();
            }
        } catch (error) {
            console.error("Failed to add announcement", error);
        }
    };

    const handleDeleteAnnouncement = async (id: string) => {
        if (!confirm("Delete this announcement?")) return;
        try {
            await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            console.error("Failed to delete", error);
        }
    }

    return (
        <main className="min-h-screen bg-black text-white relative">
            <MatrixBackground color="#00F0FF" text="" />

            <div className="relative z-10 container mx-auto px-4 py-8">
                <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                    <h1 className="text-3xl font-black font-mono uppercase tracking-tighter text-[#00F0FF]">
                        Admin_Control_Panel
                    </h1>
                    <button
                        onClick={() => router.push('/')}
                        className="text-white hover:text-[#00F0FF] font-mono text-xs uppercase"
                    >
                        [ Exit_System ]
                    </button>
                </header>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setTab('announcements')}
                        className={`px-6 py-2 font-mono text-sm uppercase tracking-widest border ${tab === 'announcements' ? 'bg-[#00F0FF] text-black border-[#00F0FF]' : 'bg-transparent text-gray-500 border-gray-800 hover:text-white'}`}
                    >
                        Announcements
                    </button>
                    <button
                        onClick={() => setTab('registrations')}
                        className={`px-6 py-2 font-mono text-sm uppercase tracking-widest border ${tab === 'registrations' ? 'bg-[#00F0FF] text-black border-[#00F0FF]' : 'bg-transparent text-gray-500 border-gray-800 hover:text-white'}`}
                    >
                        Registrations
                    </button>
                </div>

                {tab === 'announcements' ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Create Form */}
                        <div className="bg-zinc-900/50 border border-white/10 p-6 h-fit">
                            <h2 className="text-[#00F0FF] font-mono text-lg mb-6 flex items-center gap-2">
                                <Plus size={18} /> New Broadcast
                            </h2>
                            <form onSubmit={handleAddAnnouncement} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="TITLE..."
                                    className="w-full bg-black border border-zinc-700 p-3 text-sm font-mono text-white focus:border-[#00F0FF] outline-none"
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                    required
                                />
                                <textarea
                                    placeholder="MESSAGE..."
                                    className="w-full bg-black border border-zinc-700 p-3 text-sm font-mono text-white focus:border-[#00F0FF] outline-none h-32"
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    required
                                />
                                <select
                                    className="w-full bg-black border border-zinc-700 p-3 text-sm font-mono text-white focus:border-[#00F0FF] outline-none"
                                    value={newType}
                                    onChange={e => setNewType(e.target.value as any)}
                                >
                                    <option value="info">INFO (Blue)</option>
                                    <option value="alert">ALERT (Red)</option>
                                    <option value="success">SUCCESS (Green)</option>
                                </select>
                                <button type="submit" className="w-full bg-[#00F0FF] text-black py-3 font-mono font-bold uppercase hover:bg-white transition-colors">
                                    Publish_Update
                                </button>
                            </form>
                        </div>

                        {/* List */}
                        <div className="lg:col-span-2 space-y-4">
                            {announcements.length === 0 && (
                                <div className="text-zinc-500 font-mono text-center py-12">No active broadcasts found.</div>
                            )}
                            {announcements.map(a => (
                                <div key={a.id} className="bg-zinc-900/30 border border-white/5 p-4 flex justify-between items-start group hover:border-[#00F0FF]/30 transition-all">
                                    <div>
                                        <div className={`text-[10px] font-mono px-2 py-0.5 w-fit mb-2 ${a.type === 'alert' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {a.type.toUpperCase()} // {new Date(a.date).toLocaleDateString()}
                                        </div>
                                        <h3 className="text-white font-bold text-lg">{a.title}</h3>
                                        <p className="text-zinc-400 text-sm mt-1">{a.message}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteAnnouncement(a.id)}
                                        className="text-zinc-600 hover:text-red-500 p-2"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-zinc-900/30 border border-white/5 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-zinc-500 font-mono text-xs uppercase">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">College</th>
                                    <th className="p-4">Event</th>
                                    <th className="p-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-mono">
                                {registrations.map(r => (
                                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 text-zinc-300">
                                        <td className="p-4 text-white font-bold">{r.name}</td>
                                        <td className="p-4">{r.email}</td>
                                        <td className="p-4">{r.college}</td>
                                        <td className="p-4 text-[#00F0FF]">{r.event.replace('-', ' ').toUpperCase()}</td>
                                        <td className="p-4 text-zinc-500">{new Date(r.timestamp).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {registrations.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-zinc-500">No registrations found yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </main>
    );
}
