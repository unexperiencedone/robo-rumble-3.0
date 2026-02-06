"use client";

import { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import DistortionImage from "../components/DistortionImage";
import { Dancing_Script, Orbitron } from "next/font/google";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-dancing",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const galleryImages = [
  "https://images.unsplash.com/photo-1767122374969-82c7acbbb4ed?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1764617755316-ffb5ff87c2d7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1767749559743-d2e4d8031d4f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1767700358934-3466f476d948?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1767517734918-d0969751b6b6?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1764377724372-d42fed3f442b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1767518782545-17fa47a602e2?q=80&w=1200&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1747851577288-c75149e91e1a?q=80&w=1200&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1666264200758-1c03db7f530c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1763906667544-02814d191864?q=80&w=1200&auto=format&fit=crop",
];

import { SlotText } from "../components/SlotText";

const FullscreenImage = ({
  src,
  index,
  total,
  scrollYProgress,
}: {
  src: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const step = 1 / total;
  const entryStart = (index - 1) * step;
  const peak = index * step;
  const exitEnd = (index + 1) * step;

  const y = useTransform(
    scrollYProgress,
    [entryStart, peak, exitEnd],
    ["100vh", "0vh", "-100vh"],
  );
  const scrollScale = useTransform(
    scrollYProgress,
    [entryStart, peak, exitEnd],
    [0.85, 1, 1],
  );
  const scrollOpacity = useTransform(
    scrollYProgress,
    [entryStart, peak, peak + step * 0.5, exitEnd],
    [1, 1, 1, 0],
  );

  // Special logic for Index 0 Intro
  // It needs to effectively be invisible initially, then scale 0.5->1 and opacity 0->1 after delay.
  // We use standard motion values for scroll, but compose them with logic or use a helper motion value.
  // Since specific delay and duration are requested, we can use 'animate' prop.
  // However, 'animate' conflicts with 'style={{ y }}' if we are not careful.
  // We will treat the scroll controls as the "target" state, but overlay the intro state.

  // Strategy:
  // Render Index 0 with a wrapper that handles the Intro animation (Scale/Fade).
  // The inner content handles the scroll Y/Scale logic.
  // Actually, simplest is to just use 'animate' for the initial state if Index === 0.

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        zIndex: index + 1,
        y: y, // Scroll always controls Y position
        opacity: index === 0 ? undefined : scrollOpacity, // Index 0 handled below for opacity
        scale: index === 0 ? undefined : scrollScale, // Index 0 handled below for scale
      }}
      // Index 0 Intro Animation
      initial={index === 0 ? { opacity: 0, scale: 0.3 } : {}}
      animate={index === 0 ? { opacity: 1, scale: 1 } : {}}
      transition={
        index === 0
          ? {
              delay: 6, // 6s wait for text
              duration: 1.5,
              ease: "easeOut",
            }
          : {}
      }
    >
      <div className="w-full h-full relative">
        <motion.div
          className="w-full h-full"
          style={{
            // Restore scroll influence for Index 0 after the intro?
            // Actually, if we use 'animate' on the parent, it overrides 'style'.
            // Changing strategy: Use MotionValues for everything.
            // But we can't easily tween a MotionValue with a delay without a custom effect.
            // Let's use an INNER div for the scroll effects if Index 0.
            scale: index === 0 ? scrollScale : 1,
            opacity: index === 0 ? scrollOpacity : 1,
          }}
        >
          <DistortionImage src={src} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 pointer-events-none" />
        </motion.div>
      </div>
    </motion.div>
  );
};

import StarryBackground from "../components/StarryBackground";

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Force scroll to top on refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }
  }, []);

  // Title Animations
  // 1. Text Typing (0-5s) - Handled by staggerChildren
  // 2. Slot Text (Parallel)
  // 3. Move Up (6s)

  return (
    <main
      ref={containerRef}
      className={`min-h-[3000vh] relative font-sans ${orbitron.variable} ${dancingScript.variable}`}
    >
      <StarryBackground />
      <Navbar />

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0px;
        }
        .bg-radial-gradient {
          background: radial-gradient(
            circle,
            transparent 40%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }
      `}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background base removed to show StarryBackground */}


        {/* Global Heading Overlay */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-[1] pointer-events-none mix-blend-difference text-white"
          initial={{ y: "0%", opacity: 1 }}
          animate={{ y: "-40%", opacity: 0 }} // Move up and then fade out
          transition={{
            y: { delay: 6.0, duration: 1.5, ease: "easeInOut" },
            opacity: { delay: 7.5, duration: 0.5 }, // Fade out after y-move is complete
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <motion.span
              className={`text-4xl md:text-7xl opacity-90 ${dancingScript.className} text-[#FF003C]`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  transition: {
                    staggerChildren: 0.15, // Slow stagger for typed feel
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              {/* Split text for stagger effect */}
              {"Memoirs of the".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)" }, // Blur in for smoother "ink" effect
                    visible: { opacity: 1, filter: "blur(0px)" },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>

            <div className="mt-8 text-[#FF003C] flex justify-center">
              <motion.span
                className={`${dancingScript.className} text-[80px] md:text-[150px] lg:text-[180px] tracking-[0.2em]`}
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
              >
                PAST
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* The Stack */}
        <div className="relative w-full h-full">
          {galleryImages.map((src, i) => (
            <FullscreenImage
              key={i}
              src={src}
              index={i}
              total={galleryImages.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-white/40 animate-pulse pointer-events-none">
          <span className="text-xs font-mono uppercase tracking-[0.2em]">
            Scroll to Explore
          </span>
          <ChevronDown />
        </div>
      </div>
    </main>
  );
}
