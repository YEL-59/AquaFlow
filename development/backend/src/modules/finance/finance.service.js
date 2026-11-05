// Standard Chart of Accounts (PRD Section 10.1)
const CHART_OF_ACCOUNTS = [
  { code: "1010", nameEn: "Cash in Transit (Rider Pouches)", type: "ASSET", balance: 14850.0 },
  { code: "1020", nameEn: "Main Bank & bKash Merchant Account", type: "ASSET", balance: 450000.0 },
  { code: "1030", nameEn: "Water & Inventory Asset", type: "ASSET", balance: 125000.0 },
  { code: "2010", nameEn: "Customer Container Deposit Liability", type: "LIABILITY", balance: 368000.0 },
  { code: "2020", nameEn: "Accounts Payable (Suppliers)", type: "LIABILITY", balance: 85000.0 },
  { code: "4010", nameEn: "Water Sales Revenue", type: "REVENUE", balance: 320000.0 },
  { code: "4020", nameEn: "Delivery Fee Income", type: "REVENUE", balance: 34500.0 },
  { code: "5010", nameEn: "Cost of Goods Sold (COGS)", type: "EXPENSE", balance: 145000.0 },
  { code: "5020", nameEn: "Van Fuel & Delivery Fleet Maintenance", type: "EXPENSE", balance: 22000.0 },
  { code: "5030", nameEn: "7-Stage Plant Sanitization Consumables", type: "EXPENSE", balance: 18500.0 },
];

const journalEntriesStore = [];
const expensesStore = [];

// Seed initial balanced journal
journalEntriesStore.push({
  id: "JRN-20261104-001",
  reference: "SHIFT-SETTLE-BANANI-01",
  narration: "Daily delivery cash pouch settlement from Banani Hub Fleet",
  timestamp: "2026-11-04T09:00:00.000Z",
  totalDebit: 4850.0,
  totalCredit: 4850.0,
  lines: [
    { accountCode: "1020", accountName: "Main Bank Account", debit: 4850.0, credit: 0.0 },
    { accountCode: "1010", accountName: "Cash in Transit", debit: 0.0, credit: 4850.0 },
  ],
});

export class FinanceService {
  async getAccounts() {
    return CHART_OF_ACCOUNTS;
  }

  /**
   * Post balanced double-entry journal (PRD 10.2)
   * Strictly enforces sum(debits) === sum(credits).
   */
  async postJournal({ reference, narration, lines }) {
    if (!lines || !Array.isArray(lines) || lines.length < 2) {
      const err = new Error("Journal entry must have at least two line items (debit & credit)");
      err.status = 400;
      err.code = "INVALID_JOURNAL_LINES";
      throw err;
    }

    let totalDebit = 0;
    let totalCredit = 0;

    for (const line of lines) {
      totalDebit += Number(line.debit) || 0;
      totalCredit += Number(line.credit) || 0;
    }

    // Strict balanced check (difference must be 0)
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      const err = new Error(
        `Unbalanced Journal Entry! Total Debits (${totalDebit.toFixed(2)}) must equal Total Credits (${totalCredit.toFixed(2)})`
      );
      err.status = 400;
      err.code = "UNBALANCED_JOURNAL_ENTRY";
      throw err;
    }

    const journal = {
      id: `JRN-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      reference: reference || "GENERAL_LEDGER",
      narration: narration || "Standard transaction entry",
      timestamp: new Date().toISOString(),
      totalDebit,
      totalCredit,
      lines,
    };

    journalEntriesStore.push(journal);
    return journal;
  }

  async getJournals({ limit = 50 }) {
    return [...journalEntriesStore]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, parseInt(limit, 10) || 50);
  }

  /**
   * Record Operational Expense (PRD 10.3)
   */
  async recordExpense({ category, amount, paymentSource = "1020", notes, receiptUrl = null }) {
    const cost = Number(amount);
    if (!cost || cost <= 0) {
      const err = new Error("Expense amount must be greater than 0");
      err.status = 400;
      err.code = "INVALID_EXPENSE_AMOUNT";
      throw err;
    }

    const expenseAccountCode = category === "FUEL" ? "5020" : "5030";

    // Auto-create balanced journal entry
    const journal = await this.postJournal({
      reference: `EXP-${Date.now()}`,
      narration: notes || `Operational expense for ${category}`,
      lines: [
        { accountCode: expenseAccountCode, accountName: "Operational Expense", debit: cost, credit: 0.0 },
        { accountCode: paymentSource, accountName: "Cash / Bank Source", debit: 0.0, credit: cost },
      ],
    });

    const expenseRecord = {
      id: `EXP-${Date.now()}`,
      category,
      amount: cost,
      notes,
      journalId: journal.id,
      timestamp: new Date().toISOString(),
    };

    expensesStore.push(expenseRecord);
    return expenseRecord;
  }

  /**
   * Generate Profit & Loss Statement (PRD 10.4)
   */
  async getProfitAndLoss() {
    const totalWaterSales = 320000.0;
    const totalDeliveryFees = 34500.0;
    const totalRevenue = totalWaterSales + totalDeliveryFees;

    const cogs = 145000.0;
    const grossProfit = totalRevenue - cogs;

    const fleetFuelExpense = 22000.0;
    const plantSanitizationExpense = 18500.0;
    const totalOperatingExpenses = fleetFuelExpense + plantSanitizationExpense;

    const netOperatingIncome = grossProfit - totalOperatingExpenses;

    return {
      period: "Current Operating Month (Dhaka)",
      currency: "BDT",
      currencySymbol: "৳",
      revenue: {
        waterSales: totalWaterSales,
        deliveryFees: totalDeliveryFees,
        totalRevenue,
      },
      costOfGoodsSold: {
        rawBottlingAndSuppliers: cogs,
      },
      grossProfit,
      operatingExpenses: {
        fleetFuelAndVehicleMaintenance: fleetFuelExpense,
        sanitizationAndFiltration: plantSanitizationExpense,
        totalOperatingExpenses,
      },
      netOperatingIncome,
      netProfitMarginPercent: ((netOperatingIncome / totalRevenue) * 100).toFixed(1) + "%",
    };
  }
}

export const financeService = new FinanceService();
