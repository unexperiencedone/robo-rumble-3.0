import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ROBO RUMBLE | The Ultimate Robotics Showdown",
  description: "Join Robo Rumble 3.0 at CSJMU. Compete in Robo Wars, Line Follower, and Esports. Where Innovation Meets Competition.",
  keywords: ["Robotics", "Robo Rumble", "CSJMU", "Techfest", "Robo Wars", "Esports", "Kanpur Events"],
  icons: {
    icon: "/skull.png",
    shortcut: "/skull.png",
    apple: "/skull.png",
  },
  openGraph: {
    title: "ROBO RUMBLE 3.0 | The Ultimate Robotics & Innovation Frontier",
    description: "Access the operational grid of Robo Rumble 3.0 at CSJM University, Kanpur. The region's premier robotics showdown featuring high-octane Robo Wars, Autonomous Line Following Bots, Robo Soccer, and RC Flying challenges. Beyond combat, engage in the Project Expo for startup incubation, the Defence Expo for tactical innovation, and high-intensity Esports tournaments. Join 1000+ innovators, win from a ₹1.5L+ prize pool, and secure direct incubation through CSJMIF. // SYSTEM_STATUS: ENROLLMENT_OPEN",
    url: "https://robo-rumble-3-0.vercel.app/",
    siteName: "Robo Rumble 3.0 | CSJMU Kanpur",
    images: [
      {
        url: "/skull.png", // Ensure this is in your /public folder
        width: 1200, // Standard recommended OG width
        height: 630,  // Standard recommended OG height
        alt: "Robo Rumble 3.0 - Tactical Robotics Engagement Unit",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROBO RUMBLE | The Ultimate Robotics Showdown",
    description: "Join Robo Rumble 3.0 at CSJMU. The Ultimate Robotics Competition.",
    images: ["/skull.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body>
        {children}
      </body>
    </html>
  );
}
