"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import MatrixBackground from "../components/MatrixBackground";
import { Trophy, Users, Info, Shield, Zap, Cpu, Bot, Gamepad2, Mic, Rocket } from "lucide-react";
import { BiFootball } from "react-icons/bi";
import { SlotText } from "../components/SlotText";
import Footer from "../components/Footer";

// --- Types ---
interface EventData {
  id: string;
  title: string;
  category: string;
  icon: any;
  desc: string;
  teamSize: string;
  prize: string;
  rules: string[];
}

// --- Internal Component: EventCard ---
const EventCard = ({ event, index }: { event: EventData; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.volume = 0.1;
    audio.play().catch(() => {});
  };

  const handleOpen = () => {
    setIsHovered(true);
    setIsLoading(true);
    playSound('/open.mp3');
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
    setIsLoading(false);
  };

  const Icon = event.icon;

  return (
    <div className="relative group cursor-crosshair" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleOpen}>
      {/* Main Preview Card */}
      <div 
        className="relative p-8 bg-black/40 border-l-4 border-t border-[#00F0FF]/30 hover:bg-[#00F0FF]/10 transition-all duration-500 backdrop-blur-sm h-full"
        style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)' }}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 border border-[#00F0FF]/40 flex items-center justify-center bg-[#00F0FF]/10 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Icon size={24} />
          </div>
          <span className="text-[#00F0FF] font-mono text-[10px] opacity-50 tracking-widest uppercase">
            [{event.category}]
          </span>
        </div>

        <h3 className="text-2xl font-black text-white mb-3 font-mono tracking-tighter uppercase group-hover:text-[#00F0FF] transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-500 font-mono text-xs leading-relaxed uppercase mb-6 line-clamp-2">
          {event.desc}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <span className="text-[#00F0FF] font-mono text-xs font-bold">{event.prize}</span>
          <span className="text-white font-mono text-[9px] opacity-40 group-hover:opacity-100 transition-opacity underline">VIEW_SPECS</span>
        </div>

        {isHovered && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/20 to-transparent h-[20%] w-full animate-scan pointer-events-none" />}
      </div>

      {/* FULL SCREEN MISSION BRIEFING DIALOG */}
      {(isLoading || showDetails) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4 lg:p-12 pointer-events-none">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
          
          <div className="relative w-full max-w-sm md:max-w-3xl lg:max-w-5xl bg-[#050505] border border-[#FF003C] p-1 shadow-[0_0_80px_rgba(255,0,60,0.4)] pointer-events-auto overflow-hidden animate-glitch-entry">
            {/* Header Status Bar */}
            <div className="bg-[#FF003C] text-black px-3 md:px-6 py-2 flex justify-between items-center font-mono text-[9px] md:text-[11px] font-black uppercase tracking-widest">
              <div className="flex gap-2 md:gap-4">
                <span className="animate-pulse">● MISSION_INTEL: {event.id.toUpperCase()}</span>
              </div>
              {/* Desktop Close Button */}
              <button onClick={handleClose} className="hidden md:block hover:bg-black hover:text-[#FF003C] px-2 md:px-4 py-1 transition-all border border-black font-bold text-[8px] md:text-[11px]">
                [ CLOSE ]
              </button>
            </div>

            <div className="p-4 md:p-8 lg:p-16 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
              {isLoading ? (
                <div className="h-[450px] flex flex-col items-center justify-center space-y-6">
                  <div className="w-1 bg-[#FF003C] h-24 animate-pulse" />
                  <p className="text-[#FF003C] font-mono text-xl animate-pulse tracking-[0.7em] font-black uppercase">Retrieving Ruleset...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-16 overflow-y-auto max-h-[70vh]">
                  {/* Left Side: Stats & Details */}
                  <div className="space-y-8">
                    <div className="aspect-square bg-zinc-950 border border-[#FF003C]/30 relative flex items-center justify-center">
                       <Icon size={120} className="text-[#FF003C] opacity-20 filter blur-[1px]" />
                       <div className="absolute inset-0 border-[40px] border-transparent border-t-[#FF003C]/5 border-l-[#FF003C]/5" />
                       <div className="absolute bottom-4 left-4 text-[#FF003C] font-mono text-[10px] tracking-[0.3em]">OPERATIONAL_UNIT_{index}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 font-mono">
                      <div className="p-4 border border-[#FF003C]/20 bg-red-950/5">
                        <p className="text-zinc-600 text-[10px] mb-1 uppercase flex items-center gap-2"><Users size={12}/> Team Size</p>
                        <p className="text-[#FF003C] text-sm font-bold">{event.teamSize}</p>
                      </div>
                      <div className="p-4 border border-[#FF003C]/20 bg-red-950/5">
                        <p className="text-zinc-600 text-[10px] mb-1 uppercase flex items-center gap-2"><Trophy size={12}/> Prize Pool</p>
                        <p className="text-[#FF003C] text-sm font-bold">{event.prize}</p>
                      </div>
                    </div>
                    
                    <Link href="/register" className="w-full">
                      <button className="w-full py-4 bg-[#FF003C] text-black font-black font-mono tracking-widest hover:bg-white transition-colors uppercase text-lg" 
                              style={{ clipPath: 'polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%)' }}>
                        Register for Combat
                      </button>
                    </Link>
                  </div>

                  {/* Right Side: Deep Content & Rules */}
                  <div className="flex flex-col">
                    <h4 className="text-5xl font-black text-white font-mono mb-4 uppercase tracking-tighter leading-none">
                      {event.title}
                    </h4>
                    <div className="h-1.5 w-32 bg-[#FF003C] mb-8" />
                    
                    <p className="text-zinc-400 font-mono text-base leading-relaxed mb-8">
                      {event.desc}
                    </p>

                    <div className="space-y-4">
                      <h5 className="text-[#00F0FF] font-mono text-[11px] uppercase tracking-[0.3em] font-bold flex items-center gap-2">
                        <Info size={14} /> Rule Protocols:
                      </h5>
                      <div className="space-y-3">
                        {event.rules.map((rule, i) => (
                          <div key={i} className="text-zinc-300 font-mono text-xs flex gap-3 leading-relaxed border-l border-[#FF003C]/30 pl-4 py-1">
                            <span className="text-[#FF003C] font-bold">»</span> {rule}
                          </div>
                        ))}
                      </div>
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
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Page ---
export default function EventsPage() {
  const events: EventData[] = [
    {
      id: "robo-wars",
      title: "Robo Wars",
      category: "Robotics",
      icon: Shield,
      desc: "The ultimate battle of steel and strategy. Build a remote-controlled bot to survive the arena.",
      teamSize: "3-5 Members",
      prize: "₹20,000",
      rules: ["Width: Not More Than 45cm.", "Length: Not More Than 45cm", "Max weight: 6kg (+10% penalty limit).", "No explosives or flammable liquids."]
    },
    {
        id: "line-following",
        title: "Line Following Bot",
        category: "Robotics",
        icon: Zap,
        desc: "Speed and precision. Program your bot to follow the twisted path in the shortest time.",
        teamSize: "3-5 Members",
        prize: "₹15,000",
        rules: ["Autonomous robots only.", "Dimensions: 30x30x30 cm Max.", "Onboard batteries only (External Prohibited)."]
    },
    {
        id: "robo-soccer",
        title: "Robo Soccer",
        category: "Robotics",
        icon: BiFootball,
        desc: "The Fifa of Robotics. Design bots to outmaneuver and outscore your opponents.",
        teamSize: "2-4 Members",
        prize: "₹20,000",
        rules: ["Max Dimensions: 30x30x30 cm.", "Max Weight: 5kg.", "Dribbling mechanisms permitted under specific conditions."]
    },
    {
        id: "rc-flying",
        title: "RC Flying",
        category: "Aerial",
        icon: Cpu,
        desc: "Navigate obstacles at breakneck speeds. Test your piloting skills.",
        teamSize: "Individual / Team of 2",
        prize: "₹20,000",
        rules: ["Fixed-wing aircraft only.", "Wingspan Max: 1.5m.", "Handmade models only (RTF Prohibited).", "Electric motors only."]
    },
    {
        id: "project-expo",
        title: "Project Expo",
        category: "Innovation",
        icon: Users,
        desc: "Showcase your hardware or software projects to industry experts.",
        teamSize: "1-4 Members",
        prize: "₹10,000",
        rules: ["Working prototype required.", "Technical presentation mandatory.", "Live Q&A with industry judges."]
    },
    {
        id: "e-sports",
        title: "E-SPORTS",
        category: "Gaming",
        icon: Gamepad2,
        desc: "Competitive digital arena showcasing strategy and reflexes in high-intensity battles.",
        teamSize: "4 Members (Squad)",
        prize: "₹10,000 Pool",
        rules: ["Squad Mode only.", "No iPads/Tablets/Emulators allowed.", "Registered IDs must remain consistent."]
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixBackground color="#003B00" text="" />
      <Navbar />

      <div className="relative z-10 pt-40 pb-32 container mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
             <div className="h-[2px] w-12 md:w-20 bg-[#00F0FF]" />
             <span className="text-[#00F0FF] font-mono text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase">SYSTEM_ARENA_INITIALIZED</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black font-mono tracking-tighter uppercase leading-[0.8] mb-8">
            {/* Multi-layered Glitch Effect on EVENT */}
            <div className="relative inline-block glitch-container">
              {/* Red glitch layer */}
              <span className="absolute top-0 left-0 text-[#FF003C] mix-blend-screen opacity-70 glitch-layer-red" style={{ transform: 'translate(-0.02em, 0.02em)' }}>
                EVENT
              </span>
              {/* Cyan glitch layer */}
              <span className="absolute top-0 left-0 text-[#00F0FF] mix-blend-screen opacity-60 glitch-layer-cyan" style={{ transform: 'translate(0.03em, -0.02em)' }}>
                EVENT
              </span>
              {/* Main white layer */}
              <span className="relative text-white">
                EVENT
              </span>
            </div>
            <br />
            <div className="flex justify-center w-full">
              <SlotText text="ARENA_" className="text-6xl md:text-9xl" />
            </div>
          </h1>
          <p className="text-zinc-500 text-lg font-mono max-w-2xl border-l-2 border-[#00F0FF] pl-6 py-2 bg-gradient-to-r from-[#00F0FF]/5 to-transparent">
            Choose your battlefield. Engage in high-precision robotics, aerial maneuvers, or digital warfare.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        @keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
        .animate-scan { position: absolute; animation: scan 2s linear infinite; }
        @keyframes glitch-entry {
          0% { opacity: 0; transform: scale(0.97) skewX(-4deg); filter: brightness(2); }
          50% { opacity: 1; transform: scale(1.03) skewX(2deg); filter: brightness(1.2); }
          100% { transform: scale(1) skewX(0); filter: brightness(1); }
        }
        .animate-glitch-entry { animation: glitch-entry 0.4s ease-out forwards; }
        
        /* Normal Glitch Effect */
        .glitch-container {
          animation: glitch-skew 3s infinite;
        }
        @keyframes glitch-skew {
          0%, 100% { transform: skew(0deg); }
          20% { transform: skew(0deg); }
          21% { transform: skew(-0.6deg); }
          22% { transform: skew(0deg); }
          60% { transform: skew(0deg); }
          61% { transform: skew(0.6deg); }
          62% { transform: skew(0deg); }
        }
        
        .glitch-layer-red {
          animation: glitch-clip-red 2.5s infinite;
        }
        .glitch-layer-cyan {
          animation: glitch-clip-cyan 2s infinite;
        }
        
        @keyframes glitch-clip-red {
          0%, 100% { clip-path: inset(0 0 0 0); }
          10% { clip-path: inset(0 0 0 0); }
          11% { clip-path: inset(22% 0 58% 0); }
          12% { clip-path: inset(0 0 0 0); }
          50% { clip-path: inset(0 0 0 0); }
          51% { clip-path: inset(42% 0 28% 0); }
          52% { clip-path: inset(0 0 0 0); }
        }
        
        @keyframes glitch-clip-cyan {
          0%, 100% { clip-path: inset(0 0 0 0); }
          15% { clip-path: inset(0 0 0 0); }
          16% { clip-path: inset(32% 0 48% 0); }
          17% { clip-path: inset(0 0 0 0); }
          65% { clip-path: inset(0 0 0 0); }
          66% { clip-path: inset(12% 0 68% 0); }
          67% { clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </main>
  );
}