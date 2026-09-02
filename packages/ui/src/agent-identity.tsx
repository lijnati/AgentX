'use client';

import { useState } from 'react';
import { cn } from './utils';
import { Copy, Check, ExternalLink } from 'lucide-react';

export interface AgentIdentityProps {
  address: string;
  label?: string;
  showExplorerLink?: boolean;
  chainId?: number;
  className?: string;
}

export function AgentIdentity({
  address,
  label = 'Identity',
  showExplorerLink = true,
  chainId = 56,
  className,
}: AgentIdentityProps) {
  const [copied, setCopied] = useState(false);

  const shortAddress =
    address.length > 12 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;

  const explorerBaseUrl =
    chainId === 97 ? 'https://testnet.bscscan.com/address/' : 'https://bscscan.com/address/';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-300 font-sans',
        className
      )}
    >
      {label && <span className="text-zinc-500 font-medium">{label}:</span>}

      <span className="font-medium text-zinc-200" title={address}>
        {shortAddress}
      </span>

      <div className="flex items-center gap-1 border-l border-zinc-800 pl-1.5 ml-0.5">
        <button
          type="button"
          onClick={handleCopy}
          className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer active:scale-95"
          title={copied ? 'Copied to clipboard' : 'Copy address'}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        {showExplorerLink && (
          <a
            href={`${explorerBaseUrl}${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-md text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition-colors cursor-pointer"
            title="View on BscScan"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
