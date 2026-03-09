import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { AuthGate } from "@/components/auth-gate";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogCraft",
  description: "Modern blogging platform frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${serif.variable} antialiased`}>
        <AppProviders>
          <AuthGate>{children}</AuthGate>
        </AppProviders>
      </body>
    </html>
  );
}
