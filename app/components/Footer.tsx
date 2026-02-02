"use client";

import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, Github, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-black overflow-hidden">
      {/* Decorative Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#FF003C] to-transparent opacity-30" />

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand/Logo Section */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 border-2 border-[#00F0FF] flex items-center justify-center font-mono font-black text-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-black transition-all">
                R
              </div>
              <span className="font-mono font-black text-xl tracking-tighter uppercase">Robo_Rumble <span className="text-[#FF003C]">3.0</span></span>
            </div>
            <p className="text-zinc-500 font-mono text-xs leading-relaxed uppercase">
              // The ultimate convergence of engineering and combat robotics. Establish your legacy in the arena.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[#00F0FF] font-mono text-xs font-black tracking-widest uppercase mb-6 flex items-center gap-2">
              <Terminal size={14} /> Navigation
            </h4>
            <ul className="space-y-3 font-mono text-xs text-zinc-400">
              <li><Link href="/events" className="hover:text-white transition-colors">/Events_Arena</Link></li>
              <li><Link href="/schedule" className="hover:text-white transition-colors">/Timeline_Sync</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">/Archive_Recall</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">/Unit_Registration</Link></li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="space-y-4">
            <h4 className="text-[#E661FF] font-mono text-xs font-black tracking-widest uppercase mb-6 flex items-center gap-2">
              <Shield size={14} /> Command_Center
            </h4>
            <div className="flex gap-4 mb-6">
              <Link href="#" className="p-2 border border-white/10 text-zinc-400 hover:text-white hover:border-[#00F0FF] transition-all"><Instagram size={18}/></Link>
              <Link href="#" className="p-2 border border-white/10 text-zinc-400 hover:text-white hover:border-[#FF003C] transition-all"><Twitter size={18}/></Link>
              <Link href="#" className="p-2 border border-white/10 text-zinc-400 hover:text-white hover:border-[#E661FF] transition-all"><Github size={18}/></Link>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs underline">
              <Mail size={14} /> roborumble@csjmu.ac.in
            </div>
          </div>

          {/* Status Panel */}
          <div className="bg-zinc-950/50 border border-white/5 p-6" 
               style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
            <h4 className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mb-4 italic">System_Snapshot</h4>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase">Core_Temp:</span>
                <span className="text-[#00F0FF]">Optimal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase">Connectivity:</span>
                <span className="text-[#00F0FF]">Encrypted</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase">Latency:</span>
                <span className="text-[#FF003C]">14ms</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Scrolling Activity */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-700 font-mono text-[10px] uppercase tracking-widest">
            © 2026 CSJMU_Innovation_Cell. All Rights Reserved.
          </p>
          
          <div className="flex-grow max-w-md mx-6 hidden md:block overflow-hidden relative">
             <div className="flex gap-8 animate-marquee whitespace-nowrap text-[9px] font-mono text-[#00F0FF]/40 uppercase">
                <span>[INFO] Decrypting Mission Data...</span>
                <span>[SYNC] Operational Timeline Updated...</span>
                <span>[AUTH] User Verified as Administrator...</span>
                <span>[SYS] Matrix Field Generated Successfully...</span>
             </div>
          </div>
          
          <p className="text-[#FF003C] font-mono text-[10px] font-bold tracking-widest animate-pulse">
            ENCRYPTION: AES-256_ACTIVE
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </footer>
  );
};


export default Footer;