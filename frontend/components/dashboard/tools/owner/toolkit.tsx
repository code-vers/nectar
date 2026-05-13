"use client";

import { useMemo, useState } from "react";

export interface ToolSnapshot<TInput, TResult> {
  id: string;
  tool: string;
  createdAt: string;
  input: TInput;
  result: TResult;
}

export const formatCurrency = (value: number) =>
  `$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const formatPercent = (value: number) => `${value.toFixed(2)}%`;

export function useToolHistory<TInput, TResult>(tool: string) {
  const key = `nps-tools-history:${tool}`;
  const [history, setHistory] = useState<ToolSnapshot<TInput, TResult>[]>(
    () => {
      if (typeof window === "undefined") return [];
      try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    },
  );

  const saveSnapshot = (input: TInput, result: TResult) => {
    const snapshot: ToolSnapshot<TInput, TResult> = {
      id: `${Date.now()}`,
      tool,
      createdAt: new Date().toISOString(),
      input,
      result,
    };

    setHistory((prev) => {
      const next = [snapshot, ...prev].slice(0, 20);
      window.localStorage.setItem(key, JSON.stringify(next));
      return next;
    });

    return snapshot;
  };

  const clearHistory = () => {
    setHistory([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  };

  return { history, saveSnapshot, clearHistory };
}

export function ToolSavePanel<TInput, TResult>({
  history,
  clearHistory,
}: {
  history: ToolSnapshot<TInput, TResult>[];
  clearHistory: () => void;
}) {
  const latest = history[0];
  const preview = useMemo(() => {
    if (!latest) return "";
    return JSON.stringify(latest, null, 2);
  }, [latest]);

  return (
    <div>
      {/* <div className='mb-3 flex items-center justify-between'>
        <h4 className='text-sm font-semibold text-[var(--color-primary)]'>
          Saved Output Object
        </h4>
        <button
          type='button'
          onClick={clearHistory}
          className='rounded-md border border-[var(--color-input-border)] px-2 py-1 text-xs text-[var(--color-placeholder-text)] hover:bg-[var(--color-hover-surface)]'>
          Clear
        </button>
      </div> */}

      {/* {latest ? (
        <>
          <p className='mb-2 text-xs text-[var(--color-placeholder-text)]'>
            Last saved: {new Date(latest.createdAt).toLocaleString()}
          </p>
          <pre className='max-h-56 overflow-auto rounded-xl bg-[var(--color-section-bg)] p-3 text-[11px] text-[var(--color-text-primary)]'>
            {preview}
          </pre>
        </>
      ) : (
        <p className='text-xs text-[var(--color-placeholder-text)]'>
          No saved output yet.
        </p>
      )} */}
    </div>
  );
}
