"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import MatrixBackground from "../../components/MatrixBackground";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/admin/dashboard");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
            <MatrixBackground color="#FF003C" text="" />

            <div className="z-10 w-full max-w-md p-1 bg-[#FF003C] shadow-[0_0_50px_rgba(255,0,60,0.3)] animate-glitch-entry">
                <div className="bg-black p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF003C] to-transparent animate-pulse" />

                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-[#FF003C]/10 rounded-full flex items-center justify-center border border-[#FF003C] mb-4">
                            <ShieldCheck className="text-[#FF003C] w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-black font-mono uppercase tracking-widest">
                            Admin_Access
                        </h1>
                        <p className="text-zinc-600 text-xs font-mono mt-2">SECURE_LEVEL_5_REQUIRED</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-950/30 border border-red-500/30 text-red-500 text-xs font-mono text-center">
                                [ERROR]: {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 text-sm font-mono focus:border-[#FF003C] focus:outline-none transition-colors text-white"
                                    placeholder="IDENTIFIER..."
                                />
                                <Lock className="absolute left-3 top-3 text-zinc-600 w-4 h-4" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 pr-10 text-sm font-mono focus:border-[#FF003C] focus:outline-none transition-colors text-white"
                                    placeholder="ACCESS_KEY..."
                                />
                                <Lock className="absolute left-3 top-3 text-zinc-600 w-4 h-4" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-zinc-600 hover:text-[#FF003C] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#FF003C] text-black font-bold font-mono py-3 uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Authenticating..." : "Establish_Connection"}
                        </button>
                    </form>

                    <style jsx>{`
@keyframes glitch - entry {
    0 % { opacity: 0; transform: scale(0.95); }
    100 % { opacity: 1; transform: scale(1); }
}
            .animate - glitch - entry { animation: glitch - entry 0.5s cubic - bezier(0.23, 1, 0.32, 1) forwards; }
`}</style>
                </div>
            </div>
        </main>
    );
}
