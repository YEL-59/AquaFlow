import { paymentsService } from "./payments.service.js";

export class PaymentsController {
  // bKash Create Payment
  async createBkash(req, res, next) {
    try {
      const { orderId, amount, customerPhone } = req.body;
      const data = await paymentsService.createBkashPayment({
        orderId,
        amount,
        customerPhone,
      });

      res.status(200).json({
        data,
        message: "bKash payment session initialized successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // bKash Execute Payment
  async executeBkash(req, res, next) {
    try {
      const { paymentID, otp, pin, orderId } = req.body;
      const data = await paymentsService.executeBkashPayment({
        paymentID,
        otp,
        pin,
        orderId,
      });

      res.status(200).json({
        data,
        message: "bKash payment executed successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // bKash Query Status
  async queryBkash(req, res, next) {
    try {
      const { paymentID, trxID } = req.body;
      const data = await paymentsService.queryBkashPayment({
        paymentID,
        trxID,
      });

      res.status(200).json({
        data,
        message: "bKash payment query retrieved",
      });
    } catch (error) {
      next(error);
    }
  }

  // SSLCOMMERZ Init Session
  async initSslcommerz(req, res, next) {
    try {
      const {
        orderId,
        amount,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
      } = req.body;

      const data = await paymentsService.initSslcommerz({
        orderId,
        amount,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress,
      });

      res.status(200).json({
        data,
        message: "SSLCOMMERZ session created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // SSLCOMMERZ Validate Payment
  async validateSslcommerz(req, res, next) {
    try {
      const { tran_id, val_id, card_type, bank_tran_id, orderId } = req.body;
      const data = await paymentsService.validateSslcommerz({
        tran_id,
        val_id,
        card_type,
        bank_tran_id,
        orderId,
      });

      res.status(200).json({
        data,
        message: "SSLCOMMERZ payment validated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // SSLCOMMERZ IPN Webhook
  async handleSslcommerzIpn(req, res, next) {
    try {
      const ipnData = req.body || req.query;
      const data = await paymentsService.handleIpnWebhook(ipnData);

      res.status(200).json({
        data,
        message: "IPN received and processed",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const paymentsController = new PaymentsController();
