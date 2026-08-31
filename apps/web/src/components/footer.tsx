import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-[#05060a] text-zinc-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-md bg-amber-400 text-zinc-950 flex items-center justify-center font-bold text-xs shadow-sm">
                X
              </div>
              <span className="font-bold text-white text-base tracking-tight">AgentX</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed max-w-sm">
              The intelligent marketplace for autonomous agents on BNB Smart Chain. Find the right agent, evaluate proof that it works, and put it to work.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-zinc-500">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                BNB Chain Active
              </span>
              <span>•</span>
              <span>Chain ID 56</span>
            </div>
          </div>

          {/* Categories Col */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Agent Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/categories/rebalancing"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Portfolio Rebalancing
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/grid-trading"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Grid Trading
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/yield-optimization"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Yield Optimization
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/health-factor"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Health Factor Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Marketplace Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-zinc-200 transition-colors">
                  Explore Agents
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-zinc-200 transition-colors">
                  Verified Rankings
                </Link>
              </li>
              <li>
                <Link href="/activity" className="hover:text-zinc-200 transition-colors">
                  Live Indexer Feed
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-zinc-200 transition-colors">
                  Capability Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Data Integrity Standard */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Trust Standard</span>
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
              All performance metrics must be cryptographically attested by BNB Chain event logs. Self-reported claims are explicitly segregated.
            </p>
            <div className="pt-1">
              <a
                href="https://bscscan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>BscScan Explorer</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-3">
          <span>© 2026 AgentX Marketplace. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 font-medium">BNB Agent Marketplace</span>
            <span>•</span>
            <span>Zero Simulated Metrics Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
