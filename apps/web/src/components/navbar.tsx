'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@agentx/ui';
import {
  Grid,
  Layers,
  Trophy,
  Activity,
  Search,
  Wallet,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Marketplace', icon: Grid },
    { href: '/categories', label: 'Categories', icon: Layers },
    { href: '/rankings', label: 'Rankings', icon: Trophy },
    { href: '/activity', label: 'Activity', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#06080d]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 text-zinc-950 flex items-center justify-center font-bold text-base shadow-[0_0_16px_rgba(240,185,11,0.3)] group-hover:scale-105 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]">
              X
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors font-sans">
                AgentX
              </span>
              <span className="text-[10px] text-zinc-400 font-medium -mt-0.5 tracking-wider uppercase font-sans">
                BNB Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-[background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] font-sans',
                    isActive
                      ? 'text-white bg-zinc-800/80 shadow-sm border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border border-transparent'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-3.5 h-3.5 transition-colors',
                      isActive ? 'text-amber-400' : 'text-zinc-500'
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Network Status, Search & Connect Wallet */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 text-[11px] text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-zinc-300 font-medium">BNB Chain</span>
            <span className="text-zinc-500">56</span>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs hover:border-zinc-700 hover:text-zinc-200 transition-colors font-sans"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-400">Search agents...</span>
            <kbd className="hidden lg:inline-flex h-4 items-center gap-0.5 rounded border border-zinc-700/80 bg-zinc-800/80 px-1.5 text-[10px] text-zinc-400 font-medium">
              ⌘K
            </kbd>
          </Link>

          <button
            type="button"
            disabled
            title="Wallet connection integration scheduled for future milestone"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40 text-xs font-medium text-zinc-400 cursor-not-allowed select-none opacity-80 font-sans"
          >
            <Wallet className="w-3.5 h-3.5 text-zinc-500" />
            <span>Connect Wallet</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-zinc-800 text-zinc-400 font-medium">
              M1
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 focus-visible:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-800 bg-[#06080d] px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors font-sans',
                    isActive
                      ? 'bg-zinc-800/90 text-white font-semibold border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn('w-4 h-4', isActive ? 'text-amber-400' : 'text-zinc-500')}
                    />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-sans">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>BNB Chain (ID 56)</span>
            </div>
            <span>v0.1.0-M0</span>
          </div>
        </div>
      )}
    </header>
  );
}
