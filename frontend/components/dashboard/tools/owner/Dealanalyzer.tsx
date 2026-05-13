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

// ─── Types ───────────────────────────────────────────────────────────────────

interface PropertyInputs {
  purchasePrice: number;
  downPaymentPct: number;
  interestRate: number;
  loanTermYears: number;
  monthlyRent: number;
  vacancyRate: number;
  monthlyExpenses: number;
  annualAppreciation: number;
}

interface PropertyMetrics {
  monthlyMortgage: number;
  noi: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashInvested: number;
  cashOnCash: number;
  capRate: number;
  grm: number;
  equity5yr: number;
}

// ─── Zod Schema ──────────────────────────────────────────────────────────────

const propertySchema = z.object({
  purchasePrice: z.coerce.number().positive("Required"),
  downPaymentPct: z.coerce.number().min(0).max(100),
  interestRate: z.coerce.number().min(0).max(30),
  loanTermYears: z.coerce.number().positive(),
  monthlyRent: z.coerce.number().min(0),
  vacancyRate: z.coerce.number().min(0).max(100),
  monthlyExpenses: z.coerce.number().min(0),
  annualAppreciation: z.coerce.number().min(-100),
});

type PropertyForm = z.infer<typeof propertySchema>;

// ─── Field Config ─────────────────────────────────────────────────────────────

const fields: FieldConfig<PropertyForm>[] = [
  {
    name: "purchasePrice",
    label: "Purchase Price ($)",
    type: "number",
    placeholder: "250000",
    line: 1,
    lineColumns: 2,
  },
  {
    name: "downPaymentPct",
    label: "Down Payment (%)",
    type: "number",
    placeholder: "20",
    line: 1,
  },
  {
    name: "interestRate",
    label: "Interest Rate (%)",
    type: "number",
    placeholder: "7.5",
    line: 2,
    lineColumns: 2,
  },
  {
    name: "loanTermYears",
    label: "Loan Term (years)",
    type: "number",
    placeholder: "30",
    line: 2,
  },
  {
    name: "monthlyRent",
    label: "Monthly Rent ($)",
    type: "number",
    placeholder: "2000",
    line: 3,
    lineColumns: 2,
  },
  {
    name: "vacancyRate",
    label: "Vacancy Rate (%)",
    type: "number",
    placeholder: "5",
    line: 3,
  },
  {
    name: "monthlyExpenses",
    label: "Monthly Expenses ($)",
    type: "number",
    placeholder: "400",
    line: 4,
    lineColumns: 2,
  },
  {
    name: "annualAppreciation",
    label: "Annual Appreciation (%)",
    type: "number",
    placeholder: "3",
    line: 4,
  },
];

// ─── Calculations ─────────────────────────────────────────────────────────────

function calculate(inputs: PropertyInputs): PropertyMetrics {
  const loanAmount = inputs.purchasePrice * (1 - inputs.downPaymentPct / 100);
  const r = inputs.interestRate / 100 / 12;
  const n = inputs.loanTermYears * 12;
  const monthlyMortgage =
    r === 0
      ? loanAmount / n
      : (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

  const effectiveRent = inputs.monthlyRent * (1 - inputs.vacancyRate / 100);
  const noi = (effectiveRent - inputs.monthlyExpenses) * 12;
  const monthlyCashFlow =
    effectiveRent - inputs.monthlyExpenses - monthlyMortgage;
  const annualCashFlow = monthlyCashFlow * 12;
  const totalCashInvested =
    inputs.purchasePrice * (inputs.downPaymentPct / 100);
  const cashOnCash =
    totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;
  const capRate =
    inputs.purchasePrice > 0 ? (noi / inputs.purchasePrice) * 100 : 0;
  const grm =
    inputs.monthlyRent > 0
      ? inputs.purchasePrice / (inputs.monthlyRent * 12)
      : 0;

  let valueIn5Years = inputs.purchasePrice;
  for (let i = 0; i < 5; i++) valueIn5Years *= 1 + inputs.annualAppreciation / 100;

  const paymentsMade = 5 * 12;
  const balanceAfter5Years =
    r === 0
      ? Math.max(loanAmount - loanAmount * (paymentsMade / n), 0)
      : loanAmount * Math.pow(1 + r, paymentsMade) -
        monthlyMortgage * ((Math.pow(1 + r, paymentsMade) - 1) / r);
  const equity5yr = valueIn5Years - Math.max(balanceAfter5Years, 0);

  return {
    monthlyMortgage,
    noi,
    monthlyCashFlow,
    annualCashFlow,
    totalCashInvested,
    cashOnCash,
    capRate,
    grm,
    equity5yr,
  };
}

// ─── Metric Card ─────────────────────────────────────────────────────────────

function MetricRow({
  label,
  values,
}: {
  label: string;
  values: (string | null)[];
}) {
  return (
    <div className='grid grid-cols-4 gap-2 py-2 border-b border-[var(--color-divider)] last:border-0'>
      <div className='text-xs font-medium text-[var(--color-text-primary)] col-span-1'>
        {label}
      </div>
      {values.map((v, i) => (
        <div
          key={i}
          className={`text-xs font-semibold text-center col-span-1 ${v === null ? "text-[var(--color-placeholder-text)]" : v?.startsWith("-") ? "text-[var(--color-error)]" : "text-[var(--color-secondary)]"}`}>
          {v ?? "—"}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const EMPTY: PropertyInputs = {
  purchasePrice: 0,
  downPaymentPct: 20,
  interestRate: 7.5,
  loanTermYears: 30,
  monthlyRent: 0,
  vacancyRate: 5,
  monthlyExpenses: 0,
  annualAppreciation: 3,
};

export default function DealAnalyzer() {
  const [properties, setProperties] = useState<(PropertyInputs | null)[]>([
    null,
    null,
    null,
  ]);
  const [openForm, setOpenForm] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { history, saveSnapshot, clearHistory } = useToolHistory<
    PropertyInputs[],
    (PropertyMetrics | null)[]
  >("deal-analyzer");

  const metrics = properties.map((p) => (p ? calculate(p) : null));
  const fmt = (n: number, prefix = "$") =>
    `${prefix}${Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  const fmtPct = (n: number) => formatPercent(n);

  function handleSubmit(data: PropertyForm) {
    if (openForm === null) return;
    const updated = [...properties];
    updated[openForm] = {
      purchasePrice: +data.purchasePrice,
      downPaymentPct: +data.downPaymentPct,
      interestRate: +data.interestRate,
      loanTermYears: +data.loanTermYears,
      monthlyRent: +data.monthlyRent,
      vacancyRate: +data.vacancyRate,
      monthlyExpenses: +data.monthlyExpenses,
      annualAppreciation: +data.annualAppreciation,
    };
    setProperties(updated);
    saveSnapshot(
      updated.map((item) => item ?? EMPTY),
      updated.map((item) => (item ? calculate(item) : null)),
    );
    setFormOpen(false);
    setOpenForm(null);
    console.log("Deal Analyzer submit:", data);
  }

  const labels = ["Property A", "Property B", "Property C"];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h2 className='text-[28px] font-semibold text-[var(--color-text-section-title)]'>
          Deal Analyzer
        </h2>
        <p className='text-sm text-[var(--color-placeholder-text)] mt-1'>
          Side-by-side comparison of up to 3 investment properties across 12
          financial metrics.
        </p>
      </div>

      {/* Property Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {properties.map((p, i) => (
          <div
            key={i}
            className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 shadow-sm'>
            <div className='flex items-center justify-between mb-3'>
              <span className='text-sm font-semibold text-[var(--color-primary)]'>
                {labels[i]}
              </span>
              <button
                onClick={() => {
                  setOpenForm(i);
                  setFormOpen(true);
                }}
                className='text-xs px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition'>
                {p ? "Edit" : "+ Add"}
              </button>
            </div>
            {p ? (
              <div className='space-y-1 text-xs text-[var(--color-text-primary)]'>
                <p>
                  Purchase:{" "}
                  <span className='font-semibold'>
                    ${p.purchasePrice.toLocaleString()}
                  </span>
                </p>
                <p>
                  Rent:{" "}
                  <span className='font-semibold'>
                    ${p.monthlyRent.toLocaleString()}/mo
                  </span>
                </p>
                <p>
                  Rate: <span className='font-semibold'>{p.interestRate}%</span>
                </p>
              </div>
            ) : (
              <p className='text-xs text-[var(--color-placeholder-text)]'>
                No data entered
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {metrics.some(Boolean) && (
        <div className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 shadow-sm overflow-x-auto'>
          <h3 className='text-base font-semibold text-[var(--color-text-section-title)] mb-4'>
            Metrics Comparison
          </h3>
          <div className='grid grid-cols-4 gap-2 pb-2 mb-2 border-b-2 border-[var(--color-primary)]'>
            <div className='text-xs font-bold text-[var(--color-primary)]'>
              Metric
            </div>
            {labels.map((l, i) => (
              <div
                key={i}
                className='text-xs font-bold text-center text-[var(--color-primary)]'>
                {l}
              </div>
            ))}
          </div>
          {[
            {
              label: "Monthly Mortgage",
              fn: (m: PropertyMetrics) => fmt(m.monthlyMortgage),
            },
            {
              label: "Net Operating Income",
              fn: (m: PropertyMetrics) => fmt(m.noi),
            },
            {
              label: "Monthly Cash Flow",
              fn: (m: PropertyMetrics) =>
                (m.monthlyCashFlow < 0 ? "-" : "") + fmt(m.monthlyCashFlow),
            },
            {
              label: "Annual Cash Flow",
              fn: (m: PropertyMetrics) =>
                (m.annualCashFlow < 0 ? "-" : "") + fmt(m.annualCashFlow),
            },
            {
              label: "Cash Invested",
              fn: (m: PropertyMetrics) => fmt(m.totalCashInvested),
            },
            {
              label: "Cash-on-Cash Return",
              fn: (m: PropertyMetrics) => fmtPct(m.cashOnCash),
            },
            {
              label: "Cap Rate",
              fn: (m: PropertyMetrics) => fmtPct(m.capRate),
            },
            {
              label: "Gross Rent Multiplier",
              fn: (m: PropertyMetrics) => m.grm.toFixed(1) + "x",
            },
            {
              label: "5-Year Equity",
              fn: (m: PropertyMetrics) => fmt(m.equity5yr),
            },
          ].map(({ label, fn }) => (
            <MetricRow
              key={label}
              label={label}
              values={metrics.map((m) => (m ? fn(m) : null))}
            />
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className='rounded-lg bg-[var(--color-tertiary)] border border-[var(--color-quaternary)] p-4 text-xs text-[var(--color-text-primary)]'>
        <strong>Educational Tool Only.</strong> Results are for educational
        analysis only. They do not constitute financial, tax, or investment
        advice. Consult a licensed financial advisor, CPA, and real estate
        attorney before making any investment decision.
      </div>

      <ToolSavePanel history={history} clearHistory={clearHistory} />

      {/* Form Modal */}
      {formOpen && openForm !== null && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
          <div className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <UniversalForm<PropertyForm>
              title={`${labels[openForm]} — Property Details`}
              subtitle='Enter property details to calculate financial metrics'
              fields={fields}
              schema={propertySchema}
              defaultValues={
                properties[openForm]
                  ? {
                      purchasePrice: properties[openForm]!.purchasePrice,
                      downPaymentPct: properties[openForm]!.downPaymentPct,
                      interestRate: properties[openForm]!.interestRate,
                      loanTermYears: properties[openForm]!.loanTermYears,
                      monthlyRent: properties[openForm]!.monthlyRent,
                      vacancyRate: properties[openForm]!.vacancyRate,
                      monthlyExpenses: properties[openForm]!.monthlyExpenses,
                      annualAppreciation:
                        properties[openForm]!.annualAppreciation,
                    }
                  : {
                      downPaymentPct: 20,
                      interestRate: 7.5,
                      loanTermYears: 30,
                      vacancyRate: 5,
                      annualAppreciation: 3,
                    }
              }
              onSubmit={handleSubmit}
              submitText='Calculate'
              setOpen={(v) => {
                setFormOpen(v);
                if (!v) setOpenForm(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
