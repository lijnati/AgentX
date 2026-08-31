'use client';

import React from 'react';
import Link from 'next/link';
import {
  AgentCategoriesList,
  CAPABILITY_DEFINITIONS,
  AgentCapabilitiesList,
} from '@agentx/domain';
import { CategoryCard, PageHeader, SectionHeader } from '@agentx/ui';
import { Layers } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <PageHeader
        badge={
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Architecture & Taxonomy</span>
          </span>
        }
        title="First-Class Agent Categories"
        description="AgentX natively supports four specialized autonomous agent archetypes on BNB Smart Chain. Each category defines standardized telemetry invariants, expected capability sets, and risk boundaries."
      />

      {/* 4 Category Cards Grid */}
      <section className="space-y-6">
        <SectionHeader
          title="Explore Category Marketplaces"
          description="Select a category to view specialized execution mechanics, live invariant requirements, and filtered agent directories."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AgentCategoriesList.map((catKey) => {
            const slug = catKey.toLowerCase().replace('_', '-');
            return (
              <Link
                key={catKey}
                href={`/categories/${slug}`}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl"
              >
                <CategoryCard category={catKey} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Autonomous Capability Matrix */}
      <section className="space-y-6">
        <SectionHeader
          badge={
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              Capability Taxonomy
            </span>
          }
          title="Autonomous Capability Matrix"
          description="Domain definitions governing smart contract interaction permissions, telemetry access, and execution risk parameters on BNB Chain."
        />

        <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-[#0b0e17]/90 backdrop-blur-sm shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-800/80 bg-zinc-900/50 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Capability</th>
                  <th className="p-4">Execution Scope</th>
                  <th className="p-4">Risk Level</th>
                  <th className="p-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-sans text-xs">
                {AgentCapabilitiesList.map((cap) => {
                  const def = CAPABILITY_DEFINITIONS[cap];
                  return (
                    <tr key={cap} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-zinc-100">{def.name}</div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wide">{cap}</div>
                      </td>
                      <td className="p-4">
                        {def.requiresContractExecution ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            State-Modifying (Tx)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-zinc-400 text-[11px]">
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                            Read-Only / Telemetry
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                            def.riskLevel === 'HIGH'
                              ? 'text-red-400 border-red-500/30 bg-red-500/10'
                              : def.riskLevel === 'MEDIUM'
                              ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                              : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                          }`}
                        >
                          {def.riskLevel}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-400 leading-relaxed max-w-md">
                        {def.shortDescription}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
