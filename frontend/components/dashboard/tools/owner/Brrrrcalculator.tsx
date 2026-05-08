"use client";

import { FieldConfig } from "@/components/universal-form/form.types";
import UniversalForm from "@/components/universal-form/UniversalForm";
import { useState } from "react";
import { z } from "zod";
import {
  ToolSavePanel,
  formatPercent,
  useToolHistory,
} from "./toolkit";

// ─── Schema ───────────────────────────────────────────────────────────────────

const brrrrSchema = z.object({
  purchasePrice: z.coerce.number().positive("Required"),
  rehabCost: z.coerce.number().min(0),
  arv: z.coerce.number().positive("Required"),
  refinanceLtv: z.coerce.number().min(0).max(100),
  newLoanRate: z.coerce.number().min(0).max(30),
  monthlyRent: z.coerce.number().min(0),
  monthlyExpenses: z.coerce.number().min(0),
});

type BrrrrForm = z.infer<typeof brrrrSchema>;

// ─── Fields ───────────────────────────────────────────────────────────────────

const fields: FieldConfig<BrrrrForm>[] = [
  {
    name: "purchasePrice",
    label: "Purchase Price ($)",
    type: "number",
    placeholder: "150000",
    line: 1,
    lineColumns: 2,
  },
  {
    name: "rehabCost",
    label: "Rehab Cost ($)",
    type: "number",
    placeholder: "30000",
    line: 1,
  },
  {
    name: "arv",
    label: "After-Repair Value ($)",
    type: "number",
    placeholder: "220000",
    line: 2,
    lineColumns: 2,
  },
  {
    name: "refinanceLtv",
    label: "Refinance LTV (%)",
    type: "number",
    placeholder: "75",
    line: 2,
  },
  {
    name: "newLoanRate",
    label: "New Loan Interest Rate (%)",
    type: "number",
    placeholder: "7.5",
    line: 3,
    lineColumns: 2,
  },
  {
    name: "monthlyRent",
    label: "Monthly Rent ($)",
    type: "number",
    placeholder: "1800",
    line: 3,
  },
  {
    name: "monthlyExpenses",
    label: "Monthly Expenses ($)",
    type: "number",
    placeholder: "350",
    line: 4,
    lineColumns: 1,
    span: 1,
  },
];

// ─── Calculations ─────────────────────────────────────────────────────────────

interface BrrrrMetrics {
  totalCapitalIn: number;
  refinanceLoanAmt: number;
  cashPulledOut: number;
  remainingCapital: number;
  capitalRecycledPct: number;
  remainingEquity: number;
  monthlyCashFlow: number;
  cashOnCash: number;
  equityMultiple: number;
}

function calculate(d: BrrrrForm): BrrrrMetrics {
  const totalCapitalIn = d.purchasePrice + d.rehabCost;
  const refinanceLoanAmt = d.arv * (d.refinanceLtv / 100);
  const cashPulledOut = refinanceLoanAmt - d.purchasePrice;
  const remainingCapital = totalCapitalIn - Math.max(cashPulledOut, 0);
  const capitalRecycledPct =
    totalCapitalIn > 0
      ? (Math.max(cashPulledOut, 0) / totalCapitalIn) * 100
      : 0;
  const remainingEquity = d.arv - refinanceLoanAmt;

  const r = d.newLoanRate / 100 / 12;
  const n = 30 * 12;
  const monthlyMortgage =
    r === 0
      ? refinanceLoanAmt / n
      : (refinanceLoanAmt * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const monthlyCashFlow = d.monthlyRent - d.monthlyExpenses - monthlyMortgage;
  const annualCashFlow = monthlyCashFlow * 12;
  const cashOnCash =
    remainingCapital > 0 ? (annualCashFlow / remainingCapital) * 100 : 0;
  const equityMultiple =
    remainingCapital > 0
      ? (remainingEquity + annualCashFlow * 5) / remainingCapital
      : 0;

  return {
    totalCapitalIn,
    refinanceLoanAmt,
    cashPulledOut,
    remainingCapital,
    capitalRecycledPct,
    remainingEquity,
    monthlyCashFlow,
    cashOnCash,
    equityMultiple,
  };
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  highlight,
  sub,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  sub?: string;
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${highlight ? "bg-[var(--color-secondary)] border-[var(--color-secondary)] text-white" : "bg-[var(--color-card-bg)] border-[var(--color-card-border)]"}`}>
      <p
        className={`text-xs font-medium mb-1 ${highlight ? "text-white/80" : "text-[var(--color-placeholder-text)]"}`}>
        {label}
      </p>
      <p
        className={`text-xl font-bold ${highlight ? "text-white" : "text-[var(--color-primary)]"}`}>
        {value}
      </p>
      {sub && (
        <p
          className={`text-xs mt-0.5 ${highlight ? "text-white/70" : "text-[var(--color-placeholder-text)]"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ pct, label }: { pct: number; label: string }) {
  const clamped = Math.min(Math.max(pct, 0), 100);
  return (
    <div>
      <div className='flex justify-between text-xs mb-1'>
        <span className='text-[var(--color-text-primary)] font-medium'>
          {label}
        </span>
        <span className='font-bold text-[var(--color-secondary)]'>
          {pct.toFixed(1)}%
        </span>
      </div>
      <div className='h-2.5 rounded-full bg-[var(--color-section-bg)] overflow-hidden'>
        <div
          className='h-full rounded-full bg-[var(--color-secondary)] transition-all duration-700'
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function BrrrrCalculator() {
  const [result, setResult] = useState<BrrrrMetrics | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { history, saveSnapshot, clearHistory } = useToolHistory<
    BrrrrForm,
    BrrrrMetrics
  >("brrrr");

  function handleSubmit(data: BrrrrForm) {
    const computed = calculate(data);
    setResult(computed);
    saveSnapshot(data, computed);
    setFormOpen(false);
    console.log("BRRRR submit:", data);
  }

  const fmt = (n: number) =>
    "$" + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h2 className='text-[28px] font-semibold text-[var(--color-text-section-title)]'>
            BRRRR Calculator
          </h2>
          <p className='text-sm text-[var(--color-placeholder-text)] mt-1'>
            Model the Buy-Rehab-Rent-Refinance-Repeat strategy with full capital
            recycling analysis.
          </p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className='shrink-0 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition'>
          {result ? "Recalculate" : "Run Analysis"}
        </button>
      </div>

      {/* Results */}
      {result ? (
        <div className='space-y-5'>
          {/* Key Stats Grid */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            <StatCard
              label='Total Capital In'
              value={fmt(result.totalCapitalIn)}
            />
            <StatCard
              label='Refinance Loan Amt'
              value={fmt(result.refinanceLoanAmt)}
            />
            <StatCard
              label='Cash Pulled Out'
              value={
                result.cashPulledOut >= 0
                  ? fmt(result.cashPulledOut)
                  : "-" + fmt(result.cashPulledOut)
              }
            />
            <StatCard
              label='Remaining Capital'
              value={fmt(result.remainingCapital)}
            />
            <StatCard
              label='Remaining Equity'
              value={fmt(result.remainingEquity)}
            />
            <StatCard
              label='Monthly Cash Flow'
              value={
                (result.monthlyCashFlow < 0 ? "-" : "") +
                fmt(result.monthlyCashFlow)
              }
            />
            <StatCard
              label='Cash-on-Cash Return'
              value={formatPercent(result.cashOnCash)}
            />
            <StatCard
              label='Equity Multiple'
              value={result.equityMultiple.toFixed(2) + "x"}
              highlight
            />
          </div>

          {/* Capital Recycled — Core BRRRR Metric */}
          <div className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 shadow-sm'>
            <h3 className='text-sm font-bold text-[var(--color-primary)] mb-4 uppercase tracking-wide'>
              Capital Recycling — Core BRRRR Metric
            </h3>
            <ProgressBar
              pct={result.capitalRecycledPct}
              label='Capital Recycled Back for Next Deal'
            />
            <p className='text-xs text-[var(--color-placeholder-text)] mt-3'>
              {result.capitalRecycledPct >= 100
                ? "✅ Full capital recycled — you pulled out 100%+ of your investment."
                : result.capitalRecycledPct >= 75
                  ? "🟡 Strong recycling — most capital is available for the next deal."
                  : "🔴 Low recycling — significant capital remains tied up in this property."}
            </p>
          </div>
        </div>
      ) : (
        <div className='rounded-xl border-2 border-dashed border-[var(--color-card-border)] p-12 text-center'>
          <div className='text-4xl mb-3'>🏠</div>
          <p className='text-[var(--color-placeholder-text)] text-sm'>
            Enter your BRRRR deal details to model capital recycling.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className='rounded-lg bg-[var(--color-tertiary)] border border-[var(--color-quaternary)] p-4 text-xs text-[var(--color-text-primary)]'>
        <strong>Educational Tool Only.</strong> The BRRRR strategy involves
        significant financial risk. Calculations assume idealized conditions.
        Consult a licensed mortgage professional, CPA, and real estate attorney
        before executing any BRRRR transaction.
      </div>

      <ToolSavePanel history={history} clearHistory={clearHistory} />

      {/* Form Modal */}
      {formOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
          <div className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <UniversalForm<BrrrrForm>
              title='BRRRR Deal Details'
              subtitle='Model your Buy-Rehab-Rent-Refinance-Repeat strategy'
              fields={fields}
              schema={brrrrSchema}
              defaultValues={{ refinanceLtv: 75, newLoanRate: 7.5 }}
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
