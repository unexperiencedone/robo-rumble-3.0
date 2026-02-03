"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MatrixBackground from "../components/MatrixBackground";
import { SlotText } from "../components/SlotText";
import Footer from "../components/Footer";
import { Terminal, ShieldAlert, Cpu, UserPlus, Zap, Lock } from "lucide-react";
import { useAudio } from "../hooks/useAudio";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { refetchUser } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    teamName: "", // Added teamName
    email: "",
    password: "",
    confirmPassword: "",
    college: "",
  });

  // Preload audio
  const playSubmission = useAudio('audio.wav', 0.1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // ... (existing preventDefault and basic checks)
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    playSubmission();

    if (formData.password !== formData.confirmPassword) {
      setError("PASSWORDS_DO_NOT_MATCH_SECURITY_BREACH");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          teamName: formData.teamName, // Send teamName
          email: formData.email,
          password: formData.password,
          college: formData.college,
        }),
      });

      // ... (existing response handling)
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "UPLINK_FAILED");
      }

      setIsSuccess(true);
      playSubmission();
      
      // Auto-redirect after success
      setTimeout(async () => {
        await refetchUser(); // Update navbar state immediately
        router.push("/account");
      }, 3000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // ... (existing JSX until inputs)
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixBackground color="#003B00" text="" />

      <div className="relative z-10 pt-40 pb-20 container mx-auto px-4 md:px-8 flex flex-col items-center">
        {/* ... Header ... */}
        
        {/* Tactical Registration Form */}
        <div className="w-full max-w-3xl relative">
             {/* ... Form styling ... */}
          
          <form
            onSubmit={handleSubmit}
            className="relative p-1 bg-[#050505] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)' }}
          >
            {/* ... Form Header Bar ... */}

            <div className="p-4 md:p-8 lg:p-12 space-y-6 md:space-y-8 bg-zinc-950/50">
              {isSuccess ? (
                 // ... Success Message ...
                 // (Using existing success message logic)
                 <div className="py-20 text-center space-y-6 animate-glitch-entry">
                  <div className="w-20 h-20 border-2 border-[#00F0FF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_#00F0FF]">
                    <Zap className="text-[#00F0FF]" size={40} />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black font-mono text-white tracking-tighter uppercase">Uplink_Successful</h3>
                  <p className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest px-4">Unit Data Integrated into Mainframe. Establishing secure connection...</p>
                  <Link href="/account">
                    <button 
                      className="mt-8 px-6 md:px-8 py-3 border border-[#00F0FF] text-[#00F0FF] font-mono text-xs hover:bg-[#00F0FF]/10 transition-all uppercase"
                    >
                      Enter_Command_Center
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="p-4 bg-red-950/30 border border-[#FF003C]/50 text-[#FF003C] font-mono text-xs">
                      ERROR: {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Input Field 1: Name */}
                    <div className="space-y-2 group">
                      <label className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest group-focus-within:text-[#00F0FF] transition-colors">
                        Unit_Identity (Leader Name)
                      </label>
                      <input
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="ENTER_NAME..."
                        className="w-full bg-black/50 border-l-2 border-zinc-800 p-3 md:p-4 font-mono text-xs md:text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:bg-[#00F0FF]/5 transition-all placeholder:text-zinc-700"
                      />
                    </div>
                    {/* Input Field 2: Email */}
                    <div className="space-y-2 group">
                      <label className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest group-focus-within:text-[#00F0FF] transition-colors">
                        Communication_Channel (Email)
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
                  </div>

                  {/* New Row: Team Name & College */}
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                     {/* Team Name Input */}
                     <div className="space-y-2 group">
                      <label className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest group-focus-within:text-[#00F0FF] transition-colors">
                        Team_Designation (Team Name)
                      </label>
                      <input
                        required
                        type="text" 
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        placeholder="ENTER_TEAM_NAME..."
                        className="w-full bg-black/50 border-l-2 border-zinc-800 p-3 md:p-4 font-mono text-xs md:text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:bg-[#00F0FF]/5 transition-all placeholder:text-zinc-700"
                      />
                    </div>

                    {/* College Input */}
                    <div className="space-y-2 group">
                      <label className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest group-focus-within:text-[#00F0FF] transition-colors">
                        Base_Origin (College/Org)
                      </label>
                      <input
                        required
                        type="text" 
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="IDENTIFY_ORIGIN..."
                        className="w-full bg-black/50 border-l-2 border-zinc-800 p-3 md:p-4 font-mono text-xs md:text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:bg-[#00F0FF]/5 transition-all placeholder:text-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2 group">
                      <label className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest group-focus-within:text-[#00F0FF] transition-colors">
                         Secure_Key (Password)
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
                    <div className="space-y-2 group">
                      <label className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest group-focus-within:text-[#00F0FF] transition-colors">
                        Verify_Key (Confirm Password)
                      </label>
                       <div className="relative">
                        <input 
                            required
                            type="password" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full bg-black/50 border-l-2 border-zinc-800 p-3 md:p-4 font-mono text-xs md:text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:bg-[#00F0FF]/5 transition-all placeholder:text-zinc-700"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2 group">
                      <label className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest group-focus-within:text-[#00F0FF] transition-colors">
                        Base_Origin (College/Org)
                      </label>
                      <input
                        required
                        type="text" 
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="IDENTIFY_ORIGIN..."
                        className="w-full bg-black/50 border-l-2 border-zinc-800 p-3 md:p-4 font-mono text-xs md:text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:bg-[#00F0FF]/5 transition-all placeholder:text-zinc-700"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-red-950/10 border border-[#FF003C]/20">
                      <ShieldAlert className="text-[#FF003C] shrink-0" size={18} />
                      <p className="text-[8px] md:text-[10px] font-mono text-zinc-500 leading-relaxed uppercase">
                        Warning: By submitting this data, you agree to the tactical engagement protocols of Robo Rumble 3.0. Falsifying unit data results in immediate mission termination.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 md:py-4 lg:py-5 bg-[#FF003C] text-black font-black font-mono text-xs md:text-sm lg:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-500 transition-all flex items-center justify-center gap-2 md:gap-4"
                      style={{ clipPath: 'polygon(0 0, 98% 0, 100% 20%, 100% 100%, 2% 100%, 0 80%)' }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs md:text-sm lg:text-base">Synchronizing_Uplink...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus size={16} className="md:w-5 md:h-5" />
                          <span className="text-xs md:text-sm lg:text-base">Finalize_Enrollment</span>
                        </>
                      )}
                    </button>
                    
                     <div className="text-center">
                        <Link href="/login" className="text-zinc-500 font-mono text-[10px] hover:text-[#00F0FF] transition-colors uppercase tracking-widest border-b border-zinc-800 pb-1">
                            &gt;&gt; Already_Enrolled? Access_Terminal
                        </Link>
                    </div>

                  </div>
                </>
              )}
            </div>

            {/* Form Footer Accent */}
            <div className="bg-zinc-900/50 p-2 text-[8px] font-mono text-zinc-600 flex justify-between">
              <span>LATENCY: 22ms</span>
              <span>PACKET_STATE: ENCRYPTED</span>
            </div>
          </form>
        </div>

        {/* Background Decorative Element */}
        <div className="mt-20 opacity-20 pointer-events-none">
          <Cpu size={120} className="text-[#00F0FF] animate-pulse" />
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        .glitch-container { animation: glitch-skew 3s infinite; }
        @keyframes glitch-skew {
          0%, 100% { transform: skew(0deg); }
          21% { transform: skew(-1deg); }
          22% { transform: skew(0deg); }
          61% { transform: skew(1deg); }
          62% { transform: skew(0deg); }
        }
        .glitch-layer-red { animation: glitch-clip-red 2.5s infinite; }
        .glitch-layer-cyan { animation: glitch-clip-cyan 2s infinite; }
        @keyframes glitch-clip-red {
          0%, 100% { clip-path: inset(0 0 0 0); }
          11% { clip-path: inset(22% 0 58% 0); }
          12% { clip-path: inset(0 0 0 0); }
          51% { clip-path: inset(42% 0 28% 0); }
          52% { clip-path: inset(0 0 0 0); }
        }
        @keyframes glitch-clip-cyan {
          0%, 100% { clip-path: inset(0 0 0 0); }
          16% { clip-path: inset(32% 0 48% 0); }
          17% { clip-path: inset(0 0 0 0); }
          66% { clip-path: inset(12% 0 68% 0); }
          67% { clip-path: inset(0 0 0 0); }
        }
        @keyframes glitch-entry {
          0% { opacity: 0; transform: translateY(20px); filter: brightness(2); }
          100% { opacity: 1; transform: translateY(0); filter: brightness(1); }
        }
        .animate-glitch-entry { animation: glitch-entry 0.5s ease-out forwards; }
      `}</style>
    </main>
  );
}