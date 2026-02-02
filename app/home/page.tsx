"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Download, Shield, Trophy, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import MatrixBackground from "../components/MatrixBackground";
import Footer from "../components/Footer";
import { SlotText } from "../components/SlotText";
import Countdown from "../components/countdown";

export default function Home() {
  const stats = [
    { title: "10+", subtitle: "ACTIVE_EVENTS", desc: "From Robo Wars to Esports", icon: <Shield size={20} /> },
    { title: "₹1.5L+", subtitle: "VAL_PRIZE_POOL", desc: "Total cash prizes to be won", icon: <Trophy size={20} /> },
    { title: "1000+", subtitle: "SYNC_PARTICIPANTS", desc: "Students from 10+ colleges", icon: <Users size={20} /> },
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-[#00F0FF] selection:text-black">
      {/* Background Matrix Effect */}
      <MatrixBackground color="#003B00" text="" />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 md:px-6 z-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
             <div className="h-[2px] w-12 bg-[#FF003C]" />
             <span className="text-[#FF003C] font-mono text-sm font-bold tracking-[0.4em] uppercase">
               Build Compete Dominate
             </span>
             <div className="h-[2px] w-12 bg-[#FF003C]" />
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-mono tracking-tighter uppercase leading-[0.85] mb-8 flex flex-col items-center">
            <div className="relative inline-block glitch-container">
              <span className="absolute top-0 left-0 text-[#FF003C] mix-blend-screen opacity-70 glitch-layer-red" style={{ transform: 'translate(-0.02em, 0.02em)' }}>
                ROBO
              </span>
              <span className="absolute top-0 left-0 text-[#00F0FF] mix-blend-screen opacity-60 glitch-layer-cyan" style={{ transform: 'translate(0.03em, -0.02em)' }}>
                ROBO
              </span>
              <span className="relative text-white">ROBO</span>
            </div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#E661FF] flex justify-center w-full">
               <SlotText text="RUMBLE" />
            </div>
            <span className="text-2xl md:text-4xl align-top text-[#E661FF] font-mono animate-pulse">3.0</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-mono leading-relaxed border-l-2 border-[#FF003C] pl-6 py-2 bg-gradient-to-r from-[#FF003C]/5 to-transparent">
            Where Innovation Meets Competition. Join the ultimate robotics showdown
            featuring top talent from across the nation. // SYSTEM_STATUS: READY
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            <Link href="/register" className="w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-4 bg-[#FF003C] text-black font-black font-mono tracking-widest hover:bg-white transition-all uppercase flex items-center justify-center gap-2"
                      style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 70%, 85% 100%, 0 100%, 0 30%)' }}>
                Register_Now <ArrowRight size={20} />
              </button>
            </Link>
            
            <Link href="/events" className="w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-4 border border-[#00F0FF] text-[#00F0FF] font-black font-mono tracking-widest hover:bg-[#00F0FF]/10 transition-all uppercase"
                      style={{ clipPath: 'polygon(0 0, 85% 0, 100% 30%, 100% 100%, 15% 100%, 0 70%)' }}>
                Explore_Events
              </button>
            </Link>

            <a href="/brochureroborumble3.o.pdf" download="RoboRumble_Brochure.pdf" className="w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-4 border border-[#E661FF] text-[#E661FF] font-black font-mono tracking-widest hover:bg-[#E661FF]/10 transition-all uppercase flex items-center justify-center gap-2"
                      style={{ clipPath: 'polygon(0 15%, 85% 0, 100% 0, 100% 85%, 15% 100%, 0 100%)' }}>
                <Download size={20} /> Brochure.pdf
              </button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-12 text-zinc-500 font-mono text-sm mb-16">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-[#E661FF]" />
              <span className="tracking-tighter">MARCH_09-11_2026</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-[#E661FF]" />
              <span className="tracking-tighter">CSJMU_CAMPUS_KANPUR</span>
            </div>
          </div>

          <div className="inline-block p-8 bg-zinc-950/50 border border-white/5 backdrop-blur-md"
               style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
            <p className="text-[#FF003C] text-xs mb-4 uppercase tracking-[0.5em] font-black">Deployment Countdown</p>
            <Countdown targetDate="2026-03-09T09:00:00" />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {stats.map((stat, i) => (
                <div key={i} className="relative group p-10 bg-black/40 border-l-4 border-t border-[#00F0FF]/30 hover:bg-[#00F0FF]/5 transition-all duration-500 backdrop-blur-sm"
                     style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)' }}>
                  
                  <div className="text-[#00F0FF] mb-6 opacity-60">
                    {stat.icon}
                  </div>

                  <h3 className="text-5xl font-black text-white mb-2 font-mono tracking-tighter group-hover:text-[#00F0FF] transition-colors">
                    {stat.title}
                  </h3>
                  <h4 className="text-xs text-[#E661FF] font-mono font-bold mb-4 tracking-[0.2em]">// {stat.subtitle}</h4>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-tight">{stat.desc}</p>
                  
                  {/* Hover Scan Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/10 to-transparent h-[20%] w-full animate-scan opacity-0 group-hover:opacity-100 pointer-events-none" />
                </div>
              ))}
            </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
        .animate-scan { position: absolute; animation: scan 2.5s linear infinite; }
        
        .glitch-container { animation: glitch-skew 3s infinite; }
        @keyframes glitch-skew {
          0%, 100% { transform: skew(0deg); }
          20% { transform: skew(0deg); }
          21% { transform: skew(-0.8deg); }
          22% { transform: skew(0deg); }
          60% { transform: skew(0deg); }
          61% { transform: skew(0.8deg); }
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
      `}</style>
    </main>
  );
}