import type { Metadata } from 'next';
import './globals.css';
import { ClientOnlyToaster } from '@/components/layout/ClientOnlyToaster';
import { Inter } from "next/font/google";
import { AIAssistantButton } from "@/components/layout/AIAssistantButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'BrewControl Coffee Shop',
  description: 'Your favorite place for coffee and pastries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <ClientOnlyToaster />
        <AIAssistantButton />
      </body>
    </html>
  );
}
