"use client";

import { FieldConfig } from "@/components/universal-form/form.types";
import UniversalForm from "@/components/universal-form/UniversalForm";
import { useState } from "react";
import { z } from "zod";
import { ToolSavePanel, formatPercent, useToolHistory } from "./toolkit";

// ─── Schema ───────────────────────────────────────────────────────────────────

const flipSchema = z.object({
  purchasePrice: z.coerce.number().positive("Required"),
  arv: z.coerce.number().positive("Required"),
  holdingPeriod: z.coerce.number().positive("Required"),
  financingRate: z.coerce.number().min(0).max(30),
  // Rehab line items
  foundation: z.coerce.number().min(0),
  roof: z.coerce.number().min(0),
  hvac: z.coerce.number().min(0),
  electrical: z.coerce.number().min(0),
  plumbing: z.coerce.number().min(0),
  kitchen: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  flooring: z.coerce.number().min(0),
  paint: z.coerce.number().min(0),
  landscaping: z.coerce.number().min(0),
  otherRehab: z.coerce.number().min(0),
  // Selling costs
  agentCommissionPct: z.coerce.number().min(0).max(15),
  closingCosts: z.coerce.number().min(0),
  staging: z.coerce.number().min(0),
});

type FlipForm = z.infer<typeof flipSchema>;

// ─── Fields ───────────────────────────────────────────────────────────────────

const fields: FieldConfig<FlipForm>[] = [
  {
    name: "purchasePrice",
    label: "Purchase Price ($)",
    type: "number",
    placeholder: "150000",
    line: 1,
    lineColumns: 2,
  },
  {
    name: "arv",
    label: "After-Repair Value ($)",
    type: "number",
    placeholder: "240000",
    line: 1,
  },
  {
    name: "holdingPeriod",
    label: "Holding Period (months)",
    type: "number",
    placeholder: "6",
    line: 2,
    lineColumns: 2,
  },
  {
    name: "financingRate",
    label: "Financing Rate (%)",
    type: "number",
    placeholder: "10",
    line: 2,
  },
  // Rehab
  {
    name: "foundation",
    label: "Foundation ($)",
    type: "number",
    placeholder: "0",
    line: 3,
    lineColumns: 2,
  },
  {
    name: "roof",
    label: "Roof ($)",
    type: "number",
    placeholder: "0",
    line: 3,
  },
  {
    name: "hvac",
    label: "HVAC ($)",
    type: "number",
    placeholder: "0",
    line: 4,
    lineColumns: 2,
  },
  {
    name: "electrical",
    label: "Electrical ($)",
    type: "number",
    placeholder: "0",
    line: 4,
  },
  {
    name: "plumbing",
    label: "Plumbing ($)",
    type: "number",
    placeholder: "0",
    line: 5,
    lineColumns: 2,
  },
  {
    name: "kitchen",
    label: "Kitchen ($)",
    type: "number",
    placeholder: "0",
    line: 5,
  },
  {
    name: "bathrooms",
    label: "Bathrooms ($)",
    type: "number",
    placeholder: "0",
    line: 6,
    lineColumns: 2,
  },
  {
    name: "flooring",
    label: "Flooring ($)",
    type: "number",
    placeholder: "0",
    line: 6,
  },
  {
    name: "paint",
    label: "Paint ($)",
    type: "number",
    placeholder: "0",
    line: 7,
    lineColumns: 2,
  },
  {
    name: "landscaping",
    label: "Landscaping ($)",
    type: "number",
    placeholder: "0",
    line: 7,
  },
  {
    name: "otherRehab",
    label: "Other Rehab ($)",
    type: "number",
    placeholder: "0",
    line: 8,
    lineColumns: 1,
    span: 1,
  },
  // Selling
  {
    name: "agentCommissionPct",
    label: "Agent Commission (%)",
    type: "number",
    placeholder: "6",
    line: 9,
    lineColumns: 2,
  },
  {
    name: "closingCosts",
    label: "Closing Costs ($)",
    type: "number",
    placeholder: "3000",
    line: 9,
  },
  {
    name: "staging",
    label: "Staging ($)",
    type: "number",
    placeholder: "2000",
    line: 10,
    lineColumns: 1,
    span: 1,
  },
];

// ─── Calculations ─────────────────────────────────────────────────────────────

interface FlipMetrics {
  totalRehabCost: number;
  holdingCosts: number;
  totalSellingCosts: number;
  totalProjectCost: number;
  grossProfit: number;
  netProfit: number;
  roi: number;
  annualizedRoi: number;
  mao: number;
  goNoGo: "GO" | "NO-GO" | "CAUTION";
}

function calculate(d: FlipForm): FlipMetrics {
  const totalRehabCost =
    d.foundation +
    d.roof +
    d.hvac +
    d.electrical +
    d.plumbing +
    d.kitchen +
    d.bathrooms +
    d.flooring +
    d.paint +
    d.landscaping +
    d.otherRehab;
  const holdingCosts =
    d.purchasePrice * (d.financingRate / 100 / 12) * d.holdingPeriod;
  const totalSellingCosts =
    d.arv * (d.agentCommissionPct / 100) + d.closingCosts + d.staging;
  const totalProjectCost =
    d.purchasePrice + totalRehabCost + holdingCosts + totalSellingCosts;
  const grossProfit = d.arv - d.purchasePrice;
  const netProfit = d.arv - totalProjectCost;
  const invested = d.purchasePrice + totalRehabCost;
  const roi = invested > 0 ? (netProfit / invested) * 100 : 0;
  const annualizedRoi = d.holdingPeriod > 0 ? (roi / d.holdingPeriod) * 12 : 0;
  const mao = d.arv * 0.7 - totalRehabCost;
  const goNoGo: "GO" | "NO-GO" | "CAUTION" =
    d.purchasePrice <= mao
      ? "GO"
      : d.purchasePrice <= mao * 1.05
        ? "CAUTION"
        : "NO-GO";
  return {
    totalRehabCost,
    holdingCosts,
    totalSellingCosts,
    totalProjectCost,
    grossProfit,
    netProfit,
    roi,
    annualizedRoi,
    mao,
    goNoGo,
  };
}

// ─── Go/No-Go Badge ───────────────────────────────────────────────────────────

function GoNoGoBadge({ status }: { status: "GO" | "NO-GO" | "CAUTION" }) {
  const config = {
    GO: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-300",
      emoji: "✅",
    },
    CAUTION: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-300",
      emoji: "⚠️",
    },
    "NO-GO": {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-300",
      emoji: "❌",
    },
  }[status];
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${config.bg} ${config.border}`}>
      <span className='text-lg'>{config.emoji}</span>
      <span className={`text-lg font-bold ${config.text}`}>{status}</span>
      <span className={`text-xs ${config.text}`}>— 70% Rule</span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function FlipAnalyzer() {
  const [result, setResult] = useState<FlipMetrics | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { history, saveSnapshot, clearHistory } = useToolHistory<
    FlipForm,
    FlipMetrics
  >("flip-analyzer");

  function handleSubmit(data: FlipForm) {
    const computed = calculate(data);
    setResult(computed);
    saveSnapshot(data, computed);
    setFormOpen(false);
    console.log("Flip Analyzer submit:", data);
  }

  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h2 className='text-[28px] font-semibold text-[var(--color-text-section-title)]'>
            Fix & Flip Analyzer
          </h2>
          <p className='text-sm text-[var(--color-placeholder-text)] mt-1'>
            Full profit/loss projection with itemized rehab budget and 70% rule
            check.
          </p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className='shrink-0 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition'>
          {result ? "Recalculate" : "Run Analysis"}
        </button>
      </div>

      {result ? (
        <div className='space-y-4'>
          {/* Go/No-Go */}
          <div className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <p className='text-xs font-medium text-[var(--color-placeholder-text)] uppercase tracking-wide mb-1'>
                70% Rule Decision
              </p>
              <GoNoGoBadge status={result.goNoGo} />
              <p className='text-xs text-[var(--color-placeholder-text)] mt-2'>
                Max Allowable Offer:{" "}
                <span className='font-semibold text-[var(--color-primary)]'>
                  {fmt(result.mao)}
                </span>
              </p>
            </div>
            <div className='text-right'>
              <p className='text-xs text-[var(--color-placeholder-text)]'>
                Net Profit
              </p>
              <p
                className={`text-3xl font-bold ${result.netProfit >= 0 ? "text-[var(--color-secondary)]" : "text-[var(--color-error)]"}`}>
                {result.netProfit < 0 ? "-" : ""}
                {fmt(result.netProfit)}
              </p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            {[
              { label: "Total Rehab Cost", value: fmt(result.totalRehabCost) },
              { label: "Holding Costs", value: fmt(result.holdingCosts) },
              { label: "Selling Costs", value: fmt(result.totalSellingCosts) },
              {
                label: "Total Project Cost",
                value: fmt(result.totalProjectCost),
              },
              { label: "Gross Profit", value: fmt(result.grossProfit) },
              { label: "ROI", value: formatPercent(result.roi) },
              {
                label: "Annualized ROI",
                value: formatPercent(result.annualizedRoi),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 shadow-sm'>
                <p className='text-xs text-[var(--color-placeholder-text)] mb-1'>
                  {label}
                </p>
                <p className='text-base font-bold text-[var(--color-primary)]'>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='rounded-xl border-2 border-dashed border-[var(--color-card-border)] p-12 text-center'>
          <div className='text-4xl mb-3'>🔨</div>
          <p className='text-[var(--color-placeholder-text)] text-sm'>
            Enter your fix-and-flip details to project profit and check the 70%
            rule.
          </p>
        </div>
      )}

      <div className='rounded-lg bg-[var(--color-tertiary)] border border-[var(--color-quaternary)] p-4 text-xs text-[var(--color-text-primary)]'>
        <strong>Educational Tool Only.</strong> Fix-and-flip projections are
        estimates only. The 70% rule is a heuristic, not a guarantee. Consult a
        licensed contractor, appraiser, and real estate attorney before
        purchasing any property for renovation.
      </div>

      <ToolSavePanel history={history} clearHistory={clearHistory} />

      {formOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
          <div className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <UniversalForm<FlipForm>
              title='Fix & Flip Details'
              subtitle='Enter purchase info, itemized rehab costs, and selling costs'
              fields={fields}
              schema={flipSchema}
              defaultValues={{ agentCommissionPct: 6, financingRate: 10 }}
              onSubmit={handleSubmit}
              submitText='Calculate'
              setOpen={setFormOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}
