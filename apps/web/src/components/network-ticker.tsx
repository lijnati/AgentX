import { ShieldCheck, Activity } from 'lucide-react';

export function NetworkTicker() {
  return (
    <div className="w-full bg-[#05060a] border-b border-zinc-800/60 px-4 sm:px-6 py-1.5 text-[11px] text-zinc-400 flex items-center justify-between overflow-x-auto select-none">
      <div className="flex items-center gap-5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-zinc-200 font-medium">BNB Chain</span>
          <span className="text-zinc-500 text-[10px]">ID: 56</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-zinc-400">
          <Activity className="w-3 h-3 text-amber-400" />
          <span>Indexer:</span>
          <span className="text-emerald-400 font-medium">Synced</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-zinc-400">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Integrity Standard:</span>
          <span className="text-zinc-300 font-medium">Cryptographic Proof Enforced</span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 text-zinc-500 text-[11px]">
        <span className="hidden sm:inline">4 Core Agent Categories</span>
        <span className="hidden sm:inline text-zinc-700">•</span>
        <span className="text-zinc-400 font-medium">Mainnet Online</span>
      </div>
    </div>
  );
}
