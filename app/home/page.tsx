"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Download, Shield, Trophy, Users, Terminal } from "lucide-react";
import Navbar from "../components/Navbar";
import MatrixBackground from "../components/MatrixBackground";
import Footer from "../components/Footer";
import { SlotText } from "../components/SlotText";
import Countdown from "../components/countdown";
import Image from "next/image";

// --- Types ---
interface TeamMember {
  name: string;
  role: string;
  dept: string;
  image: string;
  bio?: string;
}

// --- Internal Component: AssetCard ---
const AssetCard = ({ member, delay }: { member: TeamMember; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.volume = 0.1;
    audio.play().catch(() => {});
  };

  const handleClick = () => {
    if (showDetails || isLoading) return;
    setIsLoading(true);
    playSound('audio.wav');
    setTimeout(() => {
      setIsLoading(false);
      setShowDetails(true);
    }, 600);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('audio.wav');
    setShowDetails(false);
    setIsHovered(false);
  };

  return (
    <div 
      className="relative group cursor-crosshair" 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Asset Preview Card */}
      <div 
        className="relative p-6 bg-black/40 border-l-2 border-t border-[#00F0FF]/30 hover:bg-[#00F0FF]/5 transition-all duration-500 backdrop-blur-sm h-full"
        style={{ clipPath: 'polygon(0 0, 95% 0, 100% 10%, 100% 100%, 5% 100%, 0 90%)' }}
      >
        <div className="text-[#00F0FF] font-mono text-[8px] mb-4 opacity-50 tracking-tighter uppercase">
          // ASSET_LOG: {member.name.split(' ')[0]}
        </div>
        
        <div className="relative w-32 h-32 mx-auto mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden border border-white/10 p-1">
          <Image src={member.image} alt={member.name} fill className="object-cover" />
          <div className="absolute inset-0 border border-[#00F0FF]/20 group-hover:border-[#00F0FF] transition-colors" />
        </div>

        <div className="text-center">
          <h3 className="text-xl font-black text-white font-mono uppercase tracking-tighter group-hover:text-[#00F0FF] transition-colors">
            {member.name}
          </h3>
          <p className="text-[#00F0FF] font-mono text-[10px] mt-1 font-bold tracking-widest uppercase">
            {member.role}
          </p>
        </div>

        {isHovered && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/10 to-transparent h-[20%] w-full animate-scan pointer-events-none" />}
      </div>

      {/* Full Details Dialog */}
      {showDetails && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4 lg:p-12 pointer-events-none">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
          
          <div className="relative w-full max-w-sm md:max-w-3xl lg:max-w-4xl bg-[#050505] border border-[#FF003C] p-1 shadow-[0_0_80px_rgba(255,0,60,0.4)] pointer-events-auto overflow-hidden animate-glitch-entry">
            {/* Top Alert Bar */}
            <div className="bg-[#FF003C] text-black px-3 md:px-6 py-2 flex justify-between items-center font-mono text-[9px] md:text-[11px] font-black uppercase tracking-widest">
              <div className="flex gap-2 md:gap-4">
                <span className="animate-pulse">● CORE_TEAM_ASSET</span>
                <span className="hidden md:inline">ID_VERIFIED_LEVEL_A</span>
              </div>
              {/* Desktop Close Button */}
              <button onClick={handleClose} className="hidden md:block hover:bg-black hover:text-[#FF003C] px-2 md:px-4 py-1 transition-all border border-black text-[8px] md:text-[11px]">
                [ CLOSE ]
              </button>
            </div>

            <div className="p-4 md:p-8 lg:p-16 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
              {isLoading ? (
                <div className="h-[300px] flex flex-col items-center justify-center space-y-6">
                  <div className="w-1 bg-[#FF003C] h-24 animate-pulse" />
                  <p className="text-[#FF003C] font-mono text-xl animate-pulse tracking-[0.7em] font-black uppercase">Deciphering Profile...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-[300px_1fr] gap-12">
                  <div className="flex flex-col items-center">
                    <div className="relative w-64 h-64 mb-8 overflow-hidden border-2 border-[#00F0FF]">
                        <Image src={member.image} alt={member.name} fill className="object-cover" />
                    </div>
                    <div className="w-full space-y-4 text-center">
                        <div className="border-t border-zinc-900 pt-4">
                            <span className="text-[#FF003C] text-sm font-bold uppercase">{member.role}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-zinc-400 text-xs">{member.dept}</span>
                        </div>
                        <p className="text-zinc-500 text-sm leading-relaxed pt-4 border-t border-zinc-900 uppercase italic">
                           Operational status: active. Coordinating robotics deployment for RR_v3.0.
                        </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Mobile Close Button at Bottom */}
              <div className="md:hidden border-t border-[#FF003C]/30 p-4">
                <button 
                  onClick={handleClose}
                  className="w-full bg-[#FF003C] text-black py-3 font-black font-mono text-xs uppercase tracking-widest hover:bg-[#FF003C]/80 transition-all"
                >
                  [ CLOSE ]
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 w-full p-2 text-[7px] text-zinc-800 font-mono flex justify-between bg-zinc-950/50">
              <span>EST_CONN: 0xTEAM_{member.name.split(' ')[0].toUpperCase()}</span>
              <span>RR_SECURITY_OVERRIDE_ENABLED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  // Advisor data
  const chiefPatron = { name: "Prof. Vinay Kumar Pathak", role: "Chief Patron", dept: "Vice Chancellor, CSJMU", image: "/vinay pathak.avif" };
  
  const patrons = [
    { name: "Dr. Shilpa Kaistha", role: "Patron", dept: "Dean, Innovation Foundation", image: "/dr-shilpa.jpg" },
    { name: "Mr. Divyansh Shukla", role: "Patron", dept: "CEO, Innovation Foundation", image: "/Divyansh_Shukla_Law.jpg" },
    { name: "Dr. Alok Kumar", role: "Patron", dept: "Director, UIET", image: "/dr-alok-kumar.jpg" },
  ];

  const faculty = [
    { name: "Dr. Ajay Tiwari", role: "Faculty Coordinator", dept: "Asst. Professor, UIET", image: "/Dr.-Ajay-Tiwari34.jpg" },
    { name: "Er. Mohd Shah Alam", role: "Faculty Coordinator", dept: "Asst. Professor, UIET", image: "/shah.jpeg" },
  ];

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

          <div className="inline-block p-8 bg-zinc-950/50 border border-white/5 backdrop-blur-md mb-16"
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

      {/* Infinite Scrolling Sponsors Section */}
      <section className="py-12 relative z-10 overflow-hidden">

        {/* Title Container */}
        <div className="container mx-auto px-4 md:px-6 mb-8">
            <p className="text-[#00F0FF] text-xs uppercase tracking-[0.5em] font-black text-center">// Powered_By_Our_Partners</p>
        </div>

        {/* Full Width Scroller */}
        <div className="relative w-full">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
              
              {/* Scrolling container */}
              <div className="flex gap-12 animate-infinite-scroll">
                {/* First set of sponsors */}
                <div className="flex gap-12 items-center min-w-max">
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 1</span>
                  </div>
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 2</span>
                  </div>
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 3</span>
                  </div>
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 4</span>
                  </div>
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 5</span>
                  </div>
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 6</span>
                  </div>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex gap-12 items-center min-w-max">
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 1</span>
                  </div>
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 2</span>
                  </div>
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 3</span>
                  </div>
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 4</span>
                  </div>
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 5</span>
                  </div>
                  <div className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                    <span className="text-white/50 font-mono text-xs">SPONSOR 6</span>
                  </div>
                </div>
              </div>
            </div>

      </section>

      {/* Advisors & Leadership Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
               <div className="h-[2px] w-12 md:w-20 bg-[#FF003C]" />
               <span className="text-[#FF003C] font-mono text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase">LEADERSHIP_&_GUIDANCE</span>
               <div className="h-[2px] w-12 md:w-20 bg-[#FF003C]" />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-mono tracking-tighter uppercase">
              <span className="text-white">OUR </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#E661FF]">MENTORS</span>
            </h2>
          </div>

          {/* Chief Command */}
          <div className="space-y-24">
            <div>
              <h3 className="text-xs font-mono font-bold text-[#FF003C] tracking-[0.5em] uppercase mb-10 border-b border-[#FF003C]/20 pb-4 flex items-center gap-4">
                <Terminal size={14} /> // Chief_Patron
              </h3>
              <div className="flex justify-center">
                <AssetCard member={chiefPatron} delay={0.1} />
              </div>
            </div>

            {/* Strategic Patrons */}
            <div>
              <h3 className="text-xs font-mono font-bold text-[#00F0FF] tracking-[0.5em] uppercase mb-10 border-b border-[#00F0FF]/20 pb-4 flex items-center gap-4">
                <Terminal size={14} /> // Strategic_Patrons
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {patrons.map((p, i) => <AssetCard key={i} member={p} delay={i * 0.1} />)}
              </div>
            </div>

            {/* Technical Advisors */}
            <div>
              <h3 className="text-xs font-mono font-bold text-[#E661FF] tracking-[0.5em] uppercase mb-10 border-b border-[#E661FF]/20 pb-4 flex items-center gap-4">
                <Terminal size={14} /> // Technical_Advisors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                {faculty.map((f, i) => <AssetCard key={i} member={f} delay={i * 0.1} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
        .animate-scan { position: absolute; animation: scan 2.5s linear infinite; }
        
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
        
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
        
        @keyframes glitch-entry {
          0% { opacity: 0; transform: scale(0.98) skewX(-5deg); filter: brightness(2); }
          50% { opacity: 1; transform: scale(1.02) skewX(2deg); filter: brightness(1.2); }
          100% { transform: scale(1) skewX(0); filter: brightness(1); }
        }
        .animate-glitch-entry { animation: glitch-entry 0.4s ease-out forwards; }
      `}</style>
    </main>
  );
}