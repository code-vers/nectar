"use client";

import { useState } from "react";
import BrrrrCalculator from "./Brrrrcalculator";
import DealAnalyzer from "./Dealanalyzer";
import FlipAnalyzer from "./Flipanalyzer";
import FlipVsHold from "./Flipvshold";
import RehabTracker from "./Rehabtracker";

// ─── Tab Config ───────────────────────────────────────────────────────────────

const TABS = [
  {
    id: "deal-analyzer",
    label: "Deal Analyzer",
    shortDesc: "Compare up to 3 properties",
    component: DealAnalyzer,
  },
  {
    id: "brrrr",
    label: "BRRRR Calculator",
    shortDesc: "Capital recycling analysis",
    component: BrrrrCalculator,
  },
  {
    id: "flip-analyzer",
    label: "Fix & Flip Analyzer",
    shortDesc: "Itemized profit and 70% rule",
    component: FlipAnalyzer,
  },
  {
    id: "flip-vs-hold",
    label: "Flip vs Hold",
    shortDesc: "5-year strategy comparison",
    component: FlipVsHold,
  },
  {
    id: "rehab-tracker",
    label: "Rehab Budget Tracker",
    shortDesc: "Line-item variance tracking",
    component: RehabTracker,
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OwnerInvestorPage() {
  const [activeTab, setActiveTab] = useState<TabId>("deal-analyzer");

  const ActiveComponent = TABS.find((t) => t.id === activeTab)!.component;

  return (
    <div className='min-h-screen bg-[var(--color-main-bg)]'>
      <div className='border-b border-[var(--color-divider)] bg-gradient-to-r from-[#0f274e] to-[#1b2a4a] px-6 py-7 text-white'>
        <h1 className='text-4xl font-semibold leading-tight'>Investor Tools</h1>
        <p className='mt-1 text-sm text-white/80'>
          Professional educational analysis suite for real estate decision
          modeling.
        </p>
      </div>

      <div className='px-6 py-5'>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  rounded-2xl border p-4 text-left transition
                  ${
                    isActive
                      ? "border-[var(--color-secondary)] bg-white shadow-md"
                      : "border-[var(--color-card-border)] bg-white/70 hover:bg-white"
                  }
                `}>
                <p
                  className={`text-sm font-semibold ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-primary)]"}`}>
                  {tab.label}
                </p>
                <p className='mt-1 text-xs text-[var(--color-placeholder-text)]'>
                  {tab.shortDesc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className='mx-auto w-full max-w-7xl px-6 pb-8'>
        <div className='rounded-2xl border border-[var(--color-card-border)] bg-white p-5 shadow-sm md:p-6'>
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
