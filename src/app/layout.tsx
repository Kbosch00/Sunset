import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import { FlowerBackground } from "@/src/components/FlowerBackground";
import { FloatingNav } from "@/src/components/FloatingNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sunset",
  description: "Para ti",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const saidYes = cookieStore.get("sunset_said_yes")?.value === "1";
  const hasAccess = cookieStore.get("sunset_access")?.value === "1";

  // Mostrar nav solo si ya pasó el login de esta sesión y ya dijo Sí
  const showNav = hasAccess && saidYes;

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-800">
        <FlowerBackground />
        <div className="relative flex flex-1 flex-col fade-enter">
          {children}
        </div>
        {showNav && <FloatingNav />}
      </body>
    </html>
  );
}
