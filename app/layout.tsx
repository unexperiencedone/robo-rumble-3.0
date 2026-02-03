"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isIntroPage = pathname === "/";
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en" className="bg-black">
      <head>
        <title>ROBO RUMBLE | The Ultimate Robotics Showdown</title>
        <meta name="description" content="Join Robo Rumble 3.0 at CSJMU. The Ultimate Robotics Competition." />
        <link rel="icon" href="/skull.png" />
      </head>
      <body>
        <AuthProvider>
          {!isIntroPage && !isAdminPage && <Navbar />}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
