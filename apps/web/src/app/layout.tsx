import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AgentX — The Intelligent Marketplace for Autonomous Agents on BNB Chain',
  description:
    'Find the right agent. Understand what it does. See evidence that it works. Discover, compare, and hire proof-backed autonomous agents for Rebalancing, Grid Trading, Yield Optimization, and Health Factor Monitoring on BNB Smart Chain.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable}`}>
      <body className="min-h-screen bg-[#06080d] text-zinc-100 font-sans flex flex-col antialiased selection:bg-amber-400/25 selection:text-white">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
