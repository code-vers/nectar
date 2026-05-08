// TODO: Deal Analyzer

interface DealProperty {
  id: string;
  name: string;

  purchasePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;

  monthlyRent: number;
  vacancyRate: number;
  monthlyExpenses: number;
  annualAppreciation: number;

  // Calculated fields (will be auto calculated)
  loanAmount?: number;
  monthlyMortgage?: number;
  noi?: number;
  cashFlowMonthly?: number;
  cashOnCashReturn?: number;
  capRate?: number;
  grm?: number;
  equityYear5?: number;
  equityYear10?: number;
}

// System ki ki korte hobe?

// Prottek property er hisab alada alada calculate korte hobe.
// Standard Mortgage Amortization formula use kore Monthly Payment ber korte hobe.
// NOI, Cash Flow, Cash-on-Cash, Cap Rate, GRM — sob calculate.
// 5 & 10 Year Projection (appreciation + equity build-up).
// Side-by-side Table e sob result dekhabo (best UI e).
// Highlight kora (best Cash-on-Cash, best Cap Rate etc.)

//BRRRR Deal

interface BRRRRDeal {
  purchasePrice: number;
  rehabCost: number;
  arv: number; // After Repair Value
  refinanceLtv: number; // e.g., 75%
  refinanceInterestRate: number;
  loanTermYears: number;

  monthlyRent: number;
  vacancyRate: number;
  monthlyExpenses: number;

  // Calculated fields
  totalCashInvested: number;
  refinanceLoanAmount: number;
  cashOutAtRefinance: number; // Important
  remainingEquity: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
  capitalRecycledPercent: number; // Core metric
  equityMultiple: number;
}

// // System ki ki korte hobe? (Main Logic)

// Total Cash Invested = Purchase Price + Rehab Cost + Closing Cost - (any initial loan if exists)
// Refinance Loan Amount = ARV × Refinance LTV%
// Cash Pulled Out = Refinance Loan Amount - Remaining Loan Balance (if any)
// Remaining Equity = ARV - Refinance Loan Amount
// Monthly Mortgage (new refinance loan er)
// Monthly Cash Flow
// Cash-on-Cash Return (on remaining capital)
// Capital Recycled % = (Cash Out / Total Cash Invested) × 100   ← Eita sobcheye important
// Nice summary + explanation text (educational purpose e)

interface FlipProperty {
  id: string;
  name?: string; // Optional: "Gulshan Project", "Mirpur House" etc.

  // Basic Inputs
  purchasePrice: number;
  arv: number; // After Repair Value
  holdingPeriodMonths: number; // 3, 6, 9, 12 etc.

  // Financing
  interestRate: number; // Annual interest rate (%)
  isCashPurchase: boolean; // True if no loan

  // Itemized Rehab Costs
  rehabCosts: {
    foundation: number;
    roof: number;
    hvac: number;
    electrical: number;
    plumbing: number;
    kitchen: number;
    bathrooms: number;
    flooring: number;
    paint: number;
    landscaping: number;
    contingency: number; // 10-20% extra usually
    other: number;
  };

  // Selling Costs
  agentCommissionPercent: number; // Usually 5-6%
  closingCostsPercent: number; // 1-2%
  stagingCost: number;
}

interface FlipCalculationResult extends FlipProperty {
  // Calculated Values
  totalRehabCost: number;
  totalProjectCost: number; // Purchase + Rehab + Holding + Selling
  totalHoldingCost: number;
  totalSellingCost: number;

  grossProfit: number;
  netProfit: number;

  roi: number; // Return on Investment %
  annualizedRoi: number;

  maximumAllowableOffer: number; // 70% Rule
  goNoGo: 'GO' | 'CAUTION' | 'NO_GO';
  goNoGoMessage: string;

  // Breakdowns
  totalCostPerMonth: number;
}
