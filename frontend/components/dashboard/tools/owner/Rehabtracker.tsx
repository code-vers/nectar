"use client";

import { FieldConfig } from "@/components/universal-form/form.types";
import UniversalForm from "@/components/universal-form/UniversalForm";
import { useState } from "react";
import { z } from "zod";
import { ToolSavePanel, useToolHistory } from "./toolkit";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "Not Started" | "In Progress" | "Complete";
type Category =
  | "Foundation"
  | "Roof"
  | "HVAC"
  | "Electrical"
  | "Plumbing"
  | "Kitchen"
  | "Bathroom"
  | "Flooring"
  | "Paint"
  | "Landscaping"
  | "Other";

interface LineItem {
  id: string;
  category: Category;
  description: string;
  estimated: number;
  actual: number;
  status: Status;
}
interface RehabSnapshotResult {
  items: LineItem[];
  totalEstimated: number;
  totalActual: number;
  totalVariance: number;
  completePct: number;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const lineItemSchema = z.object({
  category: z.string().min(1),
  description: z.string().min(1, "Description required"),
  estimated: z.coerce.number().min(0),
  actual: z.coerce.number().min(0),
  status: z.string().min(1),
});
type LineItemForm = z.infer<typeof lineItemSchema>;

const CATEGORIES: Category[] = [
  "Foundation",
  "Roof",
  "HVAC",
  "Electrical",
  "Plumbing",
  "Kitchen",
  "Bathroom",
  "Flooring",
  "Paint",
  "Landscaping",
  "Other",
];
const STATUSES: Status[] = ["Not Started", "In Progress", "Complete"];

const lineItemFields: FieldConfig<LineItemForm>[] = [
  {
    name: "category",
    label: "Trade Category",
    type: "select",
    options: CATEGORIES.map((c) => ({ label: c, value: c })),
    line: 1,
    lineColumns: 2,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: STATUSES.map((s) => ({ label: s, value: s })),
    line: 1,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "e.g. Replace roof shingles",
    line: 2,
    lineColumns: 1,
    span: 2,
  },
  {
    name: "estimated",
    label: "Estimated Cost ($)",
    type: "number",
    placeholder: "5000",
    line: 3,
    lineColumns: 2,
  },
  {
    name: "actual",
    label: "Actual Cost ($)",
    type: "number",
    placeholder: "0",
    line: 3,
  },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const cfg: Record<Status, string> = {
    "Not Started": "bg-gray-100 text-gray-600 border-gray-200",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
    Complete: "bg-green-50 text-green-700 border-green-200",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg[status]}`}>
      {status}
    </span>
  );
}

// ─── Variance Pill ────────────────────────────────────────────────────────────

function VariancePill({
  estimated,
  actual,
}: {
  estimated: number;
  actual: number;
}) {
  if (actual === 0)
    return (
      <span className='text-xs text-[var(--color-placeholder-text)]'>—</span>
    );
  const variance = actual - estimated;
  const pct = estimated > 0 ? (variance / estimated) * 100 : 0;
  const over = variance > 0;
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${over ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-600 border border-green-200"}`}>
      {over ? "+" : ""}
      {pct.toFixed(1)}%
    </span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function RehabTracker() {
  const [items, setItems] = useState<LineItem[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const { history, saveSnapshot, clearHistory } = useToolHistory<
    { action: string; lineItem?: LineItemForm },
    RehabSnapshotResult
  >("rehab-tracker");

  const totalEstimated = items.reduce((s, i) => s + i.estimated, 0);
  const totalActual = items.reduce((s, i) => s + i.actual, 0);
  const totalVariance = totalActual - totalEstimated;
  const completePct =
    items.length > 0
      ? (items.filter((i) => i.status === "Complete").length / items.length) *
        100
      : 0;
  const fmt = (n: number) =>
    "$" + Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
  const saveRehabState = (
    nextItems: LineItem[],
    action: string,
    lineItem?: LineItemForm,
  ) => {
    const nextEstimated = nextItems.reduce((s, i) => s + i.estimated, 0);
    const nextActual = nextItems.reduce((s, i) => s + i.actual, 0);
    const nextVariance = nextActual - nextEstimated;
    const nextCompletePct =
      nextItems.length > 0
        ? (nextItems.filter((i) => i.status === "Complete").length /
            nextItems.length) *
          100
        : 0;
    saveSnapshot(
      { action, lineItem },
      {
        items: nextItems,
        totalEstimated: nextEstimated,
        totalActual: nextActual,
        totalVariance: nextVariance,
        completePct: nextCompletePct,
      },
    );
  };

  function handleSubmit(data: LineItemForm) {
    if (editId) {
      setItems((prev) => {
        const next = prev.map((i) =>
          i.id === editId
            ? {
                ...i,
                ...data,
                category: data.category as Category,
                status: data.status as Status,
              }
            : i,
        );
        saveRehabState(next, "edit", data);
        return next;
      });
      setEditId(null);
    } else {
      const newItem: LineItem = {
        id: Date.now().toString(),
        category: data.category as Category,
        description: data.description,
        estimated: +data.estimated,
        actual: +data.actual,
        status: data.status as Status,
      };
      setItems((prev) => {
        const next = [...prev, newItem];
        saveRehabState(next, "add", data);
        return next;
      });
    }
    setFormOpen(false);
    console.log("Rehab Tracker submit:", data);
  }

  function removeItem(id: string) {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      saveRehabState(next, "remove");
      return next;
    });
  }

  function cycleStatus(id: string) {
    setItems((prev) => {
      const next = prev.map((i) => {
        if (i.id !== id) return i;
        const idx = STATUSES.indexOf(i.status);
        return { ...i, status: STATUSES[(idx + 1) % STATUSES.length] };
      });
      saveRehabState(next, "status_cycle");
      return next;
    });
  }

  const editItem = items.find((i) => i.id === editId);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h2 className='text-[28px] font-semibold text-[var(--color-text-section-title)]'>
            Rehab Budget Tracker
          </h2>
          <p className='text-sm text-[var(--color-placeholder-text)] mt-1'>
            Line-item budget tracking for active rehab projects with variance
            analysis.
          </p>
        </div>
        <button
          onClick={() => {
            setEditId(null);
            setFormOpen(true);
          }}
          className='shrink-0 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition'>
          + Add Line Item
        </button>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        <div className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 shadow-sm'>
          <p className='text-xs text-[var(--color-placeholder-text)] mb-1'>
            Total Budget
          </p>
          <p className='text-xl font-bold text-[var(--color-primary)]'>
            {fmt(totalEstimated)}
          </p>
        </div>
        <div className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 shadow-sm'>
          <p className='text-xs text-[var(--color-placeholder-text)] mb-1'>
            Total Actual
          </p>
          <p className='text-xl font-bold text-[var(--color-primary)]'>
            {fmt(totalActual)}
          </p>
        </div>
        <div
          className={`rounded-xl border p-4 shadow-sm ${totalVariance > 0 ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}>
          <p className='text-xs text-[var(--color-placeholder-text)] mb-1'>
            Variance
          </p>
          <p
            className={`text-xl font-bold ${totalVariance > 0 ? "text-red-600" : "text-green-600"}`}>
            {totalVariance > 0 ? "+" : ""}
            {fmt(totalVariance)}
          </p>
        </div>
        <div className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 shadow-sm'>
          <p className='text-xs text-[var(--color-placeholder-text)] mb-1'>
            % Complete
          </p>
          <p className='text-xl font-bold text-[var(--color-secondary)]'>
            {completePct.toFixed(0)}%
          </p>
          <div className='mt-2 h-1.5 rounded-full bg-[var(--color-section-bg)]'>
            <div
              className='h-full rounded-full bg-[var(--color-secondary)] transition-all duration-500'
              style={{ width: `${completePct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      {items.length > 0 ? (
        <div className='rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] shadow-sm overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-[var(--color-section-bg)] border-b border-[var(--color-divider)]'>
                <tr>
                  {[
                    "Category",
                    "Description",
                    "Status",
                    "Estimated",
                    "Actual",
                    "Variance",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className='px-4 py-3 text-left text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide'>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b border-[var(--color-divider)] last:border-0 hover:bg-[var(--color-hover-surface)] transition ${item.actual > item.estimated && item.actual > 0 ? "bg-red-50/40" : ""}`}>
                    <td className='px-4 py-3'>
                      <span className='px-2 py-0.5 rounded-md bg-[var(--color-sidebar-active)] text-[var(--color-sidebar-active-text)] text-xs font-semibold'>
                        {item.category}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-[var(--color-text-primary)] max-w-[180px] truncate'>
                      {item.description}
                    </td>
                    <td className='px-4 py-3'>
                      <button
                        onClick={() => cycleStatus(item.id)}
                        title='Click to cycle status'>
                        <StatusBadge status={item.status} />
                      </button>
                    </td>
                    <td className='px-4 py-3 font-medium text-[var(--color-text-primary)]'>
                      {fmt(item.estimated)}
                    </td>
                    <td className='px-4 py-3 font-medium text-[var(--color-text-primary)]'>
                      {item.actual > 0 ? fmt(item.actual) : "—"}
                    </td>
                    <td className='px-4 py-3'>
                      <VariancePill
                        estimated={item.estimated}
                        actual={item.actual}
                      />
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => {
                            setEditId(item.id);
                            setFormOpen(true);
                          }}
                          className='text-xs px-2 py-1 rounded-md border border-[var(--color-input-border)] hover:bg-[var(--color-hover-surface)] transition'>
                          Edit
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className='text-xs px-2 py-1 rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition'>
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='rounded-xl border-2 border-dashed border-[var(--color-card-border)] p-12 text-center'>
          <div className='text-4xl mb-3'>📋</div>
          <p className='text-[var(--color-placeholder-text)] text-sm'>
            No line items yet. Add your first trade item to start tracking.
          </p>
        </div>
      )}

      <div className='rounded-lg bg-[var(--color-tertiary)] border border-[var(--color-quaternary)] p-4 text-xs text-[var(--color-text-primary)]'>
        <strong>Educational Tool Only.</strong> Budget tracking reflects only
        data entered by you. NPS does not verify contractor quotes or actual
        costs. Always obtain licensed contractor bids before beginning any rehab
        project.
      </div>

      <ToolSavePanel history={history} clearHistory={clearHistory} />

      {formOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
          <div className='w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <UniversalForm<LineItemForm>
              title={editId ? "Edit Line Item" : "Add Line Item"}
              subtitle='Track estimated vs. actual costs by trade'
              fields={lineItemFields}
              schema={lineItemSchema}
              defaultValues={
                editItem
                  ? {
                      category: editItem.category,
                      description: editItem.description,
                      estimated: editItem.estimated,
                      actual: editItem.actual,
                      status: editItem.status,
                    }
                  : { status: "Not Started" }
              }
              onSubmit={handleSubmit}
              submitText={editId ? "Save Changes" : "Add Item"}
              setOpen={(v) => {
                setFormOpen(v);
                if (!v) setEditId(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
