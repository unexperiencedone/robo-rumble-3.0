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
    title: "ROBO RUMBLE | The Ultimate Robotics Showdown",
    description: "Join Robo Rumble 3.0 at CSJMU. Compete in Robo Wars, Line Follower, and Esports.",
    url: "https://roborumble.in", // Assuming a URL or placeholder
    siteName: "Robo Rumble",
    images: [
      {
        url: "/skull.png",
        width: 800,
        height: 600,
        alt: "Robo Rumble Skull",
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
