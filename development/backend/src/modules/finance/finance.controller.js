import { financeService } from "./finance.service.js";

export class FinanceController {
  async getAccounts(req, res, next) {
    try {
      const accounts = await financeService.getAccounts();
      res.status(200).json({
        data: accounts,
        message: "Chart of accounts retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async postJournal(req, res, next) {
    try {
      const { reference, narration, lines } = req.body;
      const journal = await financeService.postJournal({
        reference,
        narration,
        lines,
      });

      res.status(201).json({
        data: journal,
        message: "Balanced journal entry posted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getJournals(req, res, next) {
    try {
      const { limit } = req.query;
      const journals = await financeService.getJournals({ limit });
      res.status(200).json({
        data: journals,
        count: journals.length,
        message: "Journal entries retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async recordExpense(req, res, next) {
    try {
      const { category, amount, paymentSource, notes } = req.body;
      const expense = await financeService.recordExpense({
        category,
        amount,
        paymentSource,
        notes,
      });

      res.status(201).json({
        data: expense,
        message: "Operational expense recorded successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfitAndLoss(req, res, next) {
    try {
      const pnl = await financeService.getProfitAndLoss();
      res.status(200).json({
        data: pnl,
        message: "Profit & Loss statement generated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const financeController = new FinanceController();
