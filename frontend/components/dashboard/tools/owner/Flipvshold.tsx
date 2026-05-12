"use client";

import { FieldConfig } from "@/components/universal-form/form.types";
import UniversalForm from "@/components/universal-form/UniversalForm";
import { useState } from "react";
import { z } from "zod";
import { ToolSavePanel, useToolHistory } from "./toolkit";

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  purchasePrice: z.coerce.number().positive("Required"),
  rehabCost: z.coerce.number().min(0),
  arv: z.coerce.number().positive("Required"),
  monthlyRent: z.coerce.number().min(0),
  monthlyExpenses: z.coerce.number().min(0),
  annualAppreciation: z.coerce.number().min(-20).max(50),
  holdingCostsMonthly: z.coerce.number().min(0),
  agentCommissionPct: z.coerce.number().min(0).max(15),
});

type FvHForm = z.infer<typeof schema>;

const fields: FieldConfig<FvHForm>[] = [
  {
    name: "purchasePrice",
    label: "Purchase Price ($)",
    type: "number",
    placeholder: "180000",
    line: 1,
    lineColumns: 2,
  },
  {
    name: "rehabCost",
    label: "Rehab Cost ($)",
    type: "number",
    placeholder: "25000",
    line: 1,
  },
  {
    name: "arv",
    label: "After-Repair Value ($)",
    type: "number",
    placeholder: "250000",
    line: 2,
    lineColumns: 2,
  },
  {
    name: "monthlyRent",
    label: "Monthly Rent ($)",
    type: "number",
    placeholder: "1800",
    line: 2,
  },
  {
    name: "monthlyExpenses",
    label: "Monthly Expenses ($)",
    type: "number",
    placeholder: "400",
    line: 3,
    lineColumns: 2,
  },
  {
    name: "annualAppreciation",
    label: "Annual Appreciation (%)",
    type: "number",
    placeholder: "3",
    line: 3,
  },
  {
    name: "holdingCostsMonthly",
    label: "Monthly Holding Costs ($)",
    type: "number",
    placeholder: "1200",
    line: 4,
    lineColumns: 2,
  },
  {
    name: "agentCommissionPct",
    label: "Agent Commission (%)",
    type: "number",
    placeholder: "6",
    line: 4,
  },
];

// ─── Calculations ─────────────────────────────────────────────────────────────

interface FvHMetrics {
  flipProfit: number;
  holdYear: number[]; // cumulative return per year
  breakevenYear: number | null;
  winner: "FLIP" | "HOLD";
}

function calculate(d: FvHForm): FvHMetrics {
  const sellingCosts = d.arv * (d.agentCommissionPct / 100);
  const flipProfit = d.arv - d.purchasePrice - d.rehabCost - sellingCosts;

  const annualCashFlow =
    (d.monthlyRent - d.monthlyExpenses - d.holdingCostsMonthly) * 12;
  const holdYear: number[] = [];
  let propValue = d.arv; // start from ARV (post-rehab)

  for (let yr = 1; yr <= 5; yr++) {
    propValue *= 1 + d.annualAppreciation / 100;
    const equity = propValue - (d.purchasePrice + d.rehabCost); // simplified no-mortgage hold
    const cumCashFlow = annualCashFlow * yr;
    holdYear.push(equity + cumCashFlow);
  }

  let breakevenYear: number | null = null;
  for (let i = 0; i < holdYear.length; i++) {
    if (holdYear[i] >= flipProfit) {
      breakevenYear = i + 1;
      break;
    }
  }

  const winner: "FLIP" | "HOLD" = holdYear[4] > flipProfit ? "HOLD" : "FLIP";
  return { flipProfit, holdYear, breakevenYear, winner };
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function ComparisonChart({
  flipProfit,
  holdYear,
}: {
  flipProfit: number;
  holdYear: number[];
}) {
  const allValues = [...holdYear, flipProfit];
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(...allValues, 0);
  const range = maxVal - minVal;
  const barH = (v: number) => Math.max(((v - minVal) / range) * 160, 4);

  return (
    <div className='flex items-end gap-2 h-48 pt-4'>
      {/* Flip bar */}
      <div className='flex flex-col items-center gap-1'>
        <span className='text-[10px] font-semibold text-[var(--color-primary)]'>
          ${(flipProfit / 1000).toFixed(1)}k
        </span>
        <div
          className='w-10 rounded-t-md bg-[var(--color-primary)] transition-all duration-700'
          style={{ height: barH(flipProfit) }}
        />
        <span className='text-[10px] text-[var(--color-placeholder-text)]'>
          Flip
        </span>
      </div>
      {/* Separator */}
      <div className='w-px h-full bg-[var(--color-divider)] mx-1' />
      {/* Hold bars */}
      {holdYear.map((v, i) => (
        <div key={i} className='flex flex-col items-center gap-1'>
          <span className='text-[10px] font-semibold text-[var(--color-secondary)]'>
            ${(v / 1000).toFixed(1)}k
          </span>
          <div
            className='w-10 rounded-t-md bg-[var(--color-secondary)] transition-all duration-700'
            style={{ height: barH(v) }}
          />
          <span className='text-[10px] text-[var(--color-placeholder-text)]'>
            Yr{i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function FlipVsHold() {
  const [result, setResult] = useState<FvHMetrics | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { history, saveSnapshot, clearHistory } = useToolHistory<
    FvHForm,
    FvHMetrics
  >("flip-vs-hold");

  function handleSubmit(data: FvHForm) {
    const computed = calculate(data);
    setResult(computed);
    saveSnapshot(data, computed);
    setFormOpen(false);
    console.log("Flip vs Hold submit:", data);
  }

  const fmt = (n: number) =>
    "$" + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h2 className='text-[28px] font-semibold text-[var(--color-text-section-title)]'>
            Flip vs. Hold Comparison
          </h2>
          <p className='text-sm text-[var(--color-placeholder-text)] mt-1'>
            Compare flipping vs. holding as a rental over a 5-year horizon.
          </p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className='shrink-0 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition'>
          {result ? "Recalculate" : "Run Comparison"}
        </button>
      </div>

      {result ? (
        <div className='space-y-4'>
          {/* Winner Banner */}
          <div
            className={`rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${result.winner === "HOLD" ? "bg-[var(--color-secondary)] text-white" : "bg-[var(--color-primary)] text-white"}`}>
            <div>
              <p className='text-xs font-medium opacity-80 uppercase tracking-wide'>
                Recommended Strategy (5-Year Horizon)
              </p>
              <p className='text-3xl font-bold mt-1'>
                {result.winner === "HOLD" ? "🏠 HOLD" : "🔨 FLIP"}
              </p>
              {result.breakevenYear && (
                <p className='text-sm opacity-80 mt-1'>
                  Hold strategy overtakes Flip at Year {result.breakevenYear}
                </p>
              )}
              {!result.breakevenYear && result.winner === "FLIP" && (
                <p className='text-sm opacity-80 mt-1'>
                  Hold never catches up within 5 years
                </p>
              )}
            </div>
            <div className='text-right'>
              <p className='text-xs opacity-70'>Flip Profit</p>
              <p className='text-xl font-bold'>{fmt(result.flipProfit)}</p>
              <p className='text-xs opacity-70 mt-1'>Hold Return (Year 5)</p>
              <p className='text-xl font-bold'>{fmt(result.holdYear[4])}</p>
            </div>
          </div>

          {/* Chart */}
          <div className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 shadow-sm'>
            <h3 className='text-sm font-bold text-[var(--color-primary)] mb-3'>
              Return Comparison
            </h3>
            <div className='flex items-center gap-4 text-xs mb-3'>
              <span className='flex items-center gap-1'>
                <span className='w-3 h-3 rounded-sm bg-[var(--color-primary)] inline-block' />{" "}
                Flip
              </span>
              <span className='flex items-center gap-1'>
                <span className='w-3 h-3 rounded-sm bg-[var(--color-secondary)] inline-block' />{" "}
                Hold (Cumulative)
              </span>
            </div>
            <ComparisonChart
              flipProfit={result.flipProfit}
              holdYear={result.holdYear}
            />
          </div>

          {/* Year by Year */}
          <div className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 shadow-sm overflow-x-auto'>
            <h3 className='text-sm font-bold text-[var(--color-primary)] mb-3'>
              Hold Return — Year by Year
            </h3>
            <div className='grid grid-cols-5 gap-2'>
              {result.holdYear.map((v, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-3 text-center border ${v >= result.flipProfit ? "border-[var(--color-secondary)] bg-green-50" : "border-[var(--color-card-border)]"}`}>
                  <p className='text-xs text-[var(--color-placeholder-text)]'>
                    Year {i + 1}
                  </p>
                  <p className='text-sm font-bold text-[var(--color-primary)]'>
                    {fmt(v)}
                  </p>
                  {v >= result.flipProfit && (
                    <p className='text-[10px] text-[var(--color-secondary)] font-semibold'>
                      ✓ Exceeds Flip
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='rounded-xl border-2 border-dashed border-[var(--color-card-border)] p-12 text-center'>
          <div className='text-4xl mb-3'>⚖️</div>
          <p className='text-[var(--color-placeholder-text)] text-sm'>
            Enter deal details to compare flip vs. hold strategy over 5 years.
          </p>
        </div>
      )}

      <div className='rounded-lg bg-[var(--color-tertiary)] border border-[var(--color-quaternary)] p-4 text-xs text-[var(--color-text-primary)]'>
        <strong>Educational Tool Only.</strong> Long-term projections involve
        significant uncertainty. Appreciation rates, rental income, and expenses
        are not guaranteed. Consult a licensed financial advisor before making
        hold-vs-sell decisions.
      </div>

      <ToolSavePanel history={history} clearHistory={clearHistory} />

      {formOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
          <div className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <UniversalForm<FvHForm>
              title='Flip vs. Hold Details'
              subtitle='Model both strategies over a 5-year horizon'
              fields={fields}
              schema={schema}
              defaultValues={{ annualAppreciation: 3, agentCommissionPct: 6 }}
              onSubmit={handleSubmit}
              submitText='Compare'
              setOpen={setFormOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}
