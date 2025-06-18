import type { Metadata } from 'next';
import { ClientOnlyToaster } from '@/components/dashboard/layout/ClientOnlyToaster';
import { Inter, Poppins } from "next/font/google";
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Coffee Shop',
  description: 'Your favorite place for coffee and pastries.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${inter.className}`} suppressHydrationWarning>
        {children}
        <ClientOnlyToaster />
      </body>
    </html>
  );
}
