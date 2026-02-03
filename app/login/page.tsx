"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MatrixBackground from "../components/MatrixBackground";
import { SlotText } from "../components/SlotText";
import Footer from "../components/Footer";
import { Terminal, Lock, LogIn, Cpu } from "lucide-react";
import { useAudio } from "../hooks/useAudio";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { refetchUser } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const playSubmission = useAudio('audio.wav', 0.1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    playSubmission();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "ACCESS_DENIED");
      }

      // Success
      await refetchUser(); // Update navbar state immediately
      router.push("/account");

    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixBackground color="#003B00" text="" />

      <div className="relative z-10 pt-40 pb-20 container mx-auto px-4 md:px-8 flex flex-col items-center">
        {/* Header */}
        <div className="mb-16 text-center w-full">
           <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-20 bg-[#00F0FF]" />
            <span className="text-[#00F0FF] font-mono text-[10px] md:text-sm font-bold tracking-[0.4em]">SYSTEM_ACCESS</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black font-mono tracking-tighter uppercase leading-[0.85] mb-8 flex flex-col items-center">
             <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00F0FF] flex justify-center w-full">
              <SlotText text="LOGIN" />
            </div>
          </h1>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-xl relative">
          <div className="absolute -top-10 left-0 text-[#00F0FF] font-mono text-[8px] md:text-[10px] opacity-50 uppercase tracking-widest">
            // AUTH_PROTOCOL: v1.0
          </div>

          <form 
            onSubmit={handleSubmit}
            className="relative p-1 bg-[#050505] border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)' }}
          >
            {/* Form Header Bar */}
            <div className="bg-[#00F0FF] text-black px-3 md:px-6 py-2 flex justify-between items-center font-mono text-[8px] md:text-[10px] font-black uppercase tracking-widest">
              <span className="flex items-center gap-2"><Terminal size={12}/> Access_Terminal</span>
              <span className="hidden sm:inline">STATE: LOCKED</span>
            </div>

            <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-zinc-950/50">
                {error && (
                    <div className="p-4 bg-red-950/30 border border-[#FF003C]/50 text-[#FF003C] font-mono text-xs">
                    ACCESS_DENIED: {error}
                    </div>
                )}

                <div className="space-y-2 group">
                    <label className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest group-focus-within:text-[#00F0FF] transition-colors">
                    Commander_ID (Email)
                    </label>
                    <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="EMAIL@PROTO.COM"
                    className="w-full bg-black/50 border-l-2 border-zinc-800 p-3 md:p-4 font-mono text-xs md:text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:bg-[#00F0FF]/5 transition-all placeholder:text-zinc-700"
                    />
                </div>

                <div className="space-y-2 group">
                    <label className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest group-focus-within:text-[#00F0FF] transition-colors">
                        Passcode
                    </label>
                    <div className="relative">
                    <input 
                        required
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="********"
                        className="w-full bg-black/50 border-l-2 border-zinc-800 p-3 md:p-4 font-mono text-xs md:text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:bg-[#00F0FF]/5 transition-all placeholder:text-zinc-700"
                    />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                    </div>
                </div>


                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 md:py-4 bg-[#00F0FF] text-black font-black font-mono text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-500 transition-all flex items-center justify-center gap-2"
                    style={{ clipPath: 'polygon(0 0, 98% 0, 100% 20%, 100% 100%, 2% 100%, 0 80%)' }}
                >
                    {isSubmitting ? (
                    <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                    </>
                    ) : (
                    <>
                        <LogIn size={16} />
                        <span>Establish_Connection</span>
                    </>
                    )}
                </button>

                 <div className="text-center">
                    <Link href="/register" className="text-zinc-500 font-mono text-[10px] hover:text-[#00F0FF] transition-colors uppercase tracking-widest border-b border-zinc-800 pb-1">
                        &gt;&gt; New_Unit? Initialize_Enrollment
                    </Link>
                </div>

            </div>

             {/* Form Footer Accent */}
            <div className="bg-zinc-900/50 p-2 text-[8px] font-mono text-zinc-600 flex justify-between">
              <span>LATENCY: 12ms</span>
              <span>NODE: SECURE</span>
            </div>
          </form>
        </div>
         {/* Background Decorative Element */}
         <div className="mt-20 opacity-20 pointer-events-none">
          <Cpu size={120} className="text-[#00F0FF] animate-pulse" />
        </div>
      </div>
       <Footer />
    </main>
  );
}
