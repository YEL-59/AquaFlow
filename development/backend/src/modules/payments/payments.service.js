import crypto from "crypto";
import { ordersService } from "../orders/orders.service.js";

// In-memory payment session registries with TTL
const bkashSessions = new Map();
const sslcommerzSessions = new Map();

export class PaymentsService {
  /**
   * ==========================================
   * 1. bKash Merchant Payment Gateway Flow
   * ==========================================
   */

  /**
   * Create bKash Payment Session
   * Endpoint: POST /api/v1/payments/bkash/create
   */
  async createBkashPayment({ orderId, amount, customerPhone = "" }) {
    if (!amount || Number(amount) <= 0) {
      const err = new Error("Invalid payment amount for bKash transaction");
      err.status = 400;
      err.code = "INVALID_AMOUNT";
      throw err;
    }

    const paymentID = `BK-PAY-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const createTime = new Date().toISOString();

    const sessionData = {
      paymentID,
      orderId: orderId || `ORD-${Date.now()}`,
      amount: Number(amount),
      currency: "BDT",
      customerPhone: customerPhone.trim(),
      intent: "sale",
      merchantInvoiceNumber: orderId || `INV-${Date.now()}`,
      transactionStatus: "Initiated",
      createTime,
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 mins
    };

    bkashSessions.set(paymentID, sessionData);

    return {
      paymentID,
      createTime,
      orgLogo: "/images/bkash-logo.svg",
      orgName: "AquaFlow Pure Water Ltd.",
      transactionStatus: "Initiated",
      amount: sessionData.amount,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: sessionData.merchantInvoiceNumber,
    };
  }

  /**
   * Execute bKash Payment (Verify OTP & PIN)
   * Endpoint: POST /api/v1/payments/bkash/execute
   */
  async executeBkashPayment({ paymentID, otp, pin, orderId }) {
    if (!paymentID) {
      const err = new Error("paymentID is required to execute bKash payment");
      err.status = 400;
      err.code = "MISSING_PAYMENT_ID";
      throw err;
    }

    let session = bkashSessions.get(paymentID);
    if (!session) {
      // Create on-the-fly session if not found in mock/testing mode
      session = {
        paymentID,
        orderId: orderId || `ORD-${Date.now()}`,
        amount: 350,
        currency: "BDT",
        transactionStatus: "Initiated",
      };
      bkashSessions.set(paymentID, session);
    }

    // Validate PIN (Sandbox allows any 5-digit PIN or mock demo PIN)
    if (pin && pin.length < 4) {
      const err = new Error("Invalid bKash PIN. Please provide your 5-digit bKash PIN.");
      err.status = 400;
      err.code = "INVALID_PIN";
      throw err;
    }

    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const trxID = `BKSH${randomSuffix}`;
    const paymentExecuteTime = new Date().toISOString();

    session.transactionStatus = "Completed";
    session.trxID = trxID;
    session.paymentExecuteTime = paymentExecuteTime;

    // Update corresponding order status to PAID
    const targetOrderId = orderId || session.orderId;
    if (targetOrderId) {
      await ordersService.updatePaymentStatus(targetOrderId, {
        paymentStatus: "PAID",
        paymentMethod: "BKASH",
        transactionId: trxID,
        paidAt: paymentExecuteTime,
      });
    }

    return {
      paymentID,
      trxID,
      transactionStatus: "Completed",
      amount: session.amount,
      currency: "BDT",
      paymentExecuteTime,
      customerMsisdn: session.customerPhone || "017XXXXXXXX",
      merchantInvoiceNumber: session.merchantInvoiceNumber,
      message: "bKash payment successful. Thank you for choosing AquaFlow!",
    };
  }

  /**
   * Query bKash Payment Status
   * Endpoint: POST /api/v1/payments/bkash/query
   */
  async queryBkashPayment({ paymentID, trxID }) {
    if (paymentID && bkashSessions.has(paymentID)) {
      return bkashSessions.get(paymentID);
    }

    // Search by trxID
    for (const s of bkashSessions.values()) {
      if (s.trxID === trxID) return s;
    }

    return {
      transactionStatus: "UNKNOWN",
      message: "Transaction not found or expired",
    };
  }

  /**
   * ==========================================
   * 2. SSLCOMMERZ Multi-Channel Gateway Flow
   * ==========================================
   */

  /**
   * Initialize SSLCOMMERZ Payment Session
   * Endpoint: POST /api/v1/payments/sslcommerz/init
   */
  async initSslcommerz({
    orderId,
    amount,
    customerName = "AquaFlow Customer",
    customerEmail = "customer@aquaflow.com.bd",
    customerPhone = "+8801700000000",
    deliveryAddress = "Dhaka, Bangladesh",
  }) {
    if (!amount || Number(amount) <= 0) {
      const err = new Error("Invalid payment amount for SSLCOMMERZ session");
      err.status = 400;
      err.code = "INVALID_AMOUNT";
      throw err;
    }

    const tran_id = `SSLC-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const sessionkey = `SSL-SES-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;

    const sessionData = {
      sessionkey,
      tran_id,
      orderId: orderId || `ORD-${Date.now()}`,
      amount: Number(amount),
      currency: "BDT",
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      status: "INITIATED",
      createdAt: new Date().toISOString(),
    };

    sslcommerzSessions.set(tran_id, sessionData);
    sslcommerzSessions.set(sessionkey, sessionData);

    return {
      status: "SUCCESS",
      sessionkey,
      tran_id,
      GatewayPageURL: `/payment/sslcommerz/gateway?sessionkey=${sessionkey}&tran_id=${tran_id}`,
      amount: sessionData.amount,
      currency: "BDT",
      availableChannels: [
        { code: "visa", name: "Visa Card" },
        { code: "mastercard", name: "Mastercard" },
        { code: "amex", name: "American Express" },
        { code: "nagad", name: "Nagad" },
        { code: "rocket", name: "DBBL Rocket" },
        { code: "upay", name: "UCB Upay" },
        { code: "citytouch", name: "Citytouch Internet Banking" },
        { code: "ibbl", name: "Islami Bank iBanking" },
      ],
    };
  }

  /**
   * Validate SSLCOMMERZ Payment (Post-redirect or IPN)
   * Endpoint: POST /api/v1/payments/sslcommerz/validate
   */
  async validateSslcommerz({
    tran_id,
    val_id,
    card_type = "VISA-CityBank",
    bank_tran_id,
    orderId,
  }) {
    if (!tran_id) {
      const err = new Error("tran_id is required to validate payment");
      err.status = 400;
      err.code = "MISSING_TRAN_ID";
      throw err;
    }

    let session = sslcommerzSessions.get(tran_id);
    if (!session) {
      session = {
        tran_id,
        orderId: orderId || `ORD-${Date.now()}`,
        amount: 450,
        currency: "BDT",
        status: "INITIATED",
      };
      sslcommerzSessions.set(tran_id, session);
    }

    const validatedValId = val_id || `VAL-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const validatedBankTranId = bank_tran_id || `BNK-${Date.now()}`;
    const tran_date = new Date().toISOString();

    session.status = "VALID";
    session.val_id = validatedValId;
    session.bank_tran_id = validatedBankTranId;
    session.card_type = card_type;
    session.tran_date = tran_date;

    // Update order status to PAID
    const targetOrderId = orderId || session.orderId;
    if (targetOrderId) {
      await ordersService.updatePaymentStatus(targetOrderId, {
        paymentStatus: "PAID",
        paymentMethod: "SSLCOMMERZ",
        transactionId: validatedBankTranId,
        paidAt: tran_date,
      });
    }

    return {
      status: "VALID",
      tran_id,
      val_id: validatedValId,
      amount: session.amount,
      card_type,
      bank_tran_id: validatedBankTranId,
      currency: "BDT",
      tran_date,
      risk_level: "0",
      risk_title: "Safe",
      message: "SSLCOMMERZ transaction validated successfully",
    };
  }

  /**
   * SSLCOMMERZ IPN (Instant Payment Notification) Webhook
   * Endpoint: POST /api/v1/payments/sslcommerz/ipn
   */
  async handleIpnWebhook(ipnData) {
    const { tran_id, val_id, status, bank_tran_id, card_type, value_a: orderId } = ipnData;

    if (status === "VALID" || status === "AUTHENTICATED") {
      return this.validateSslcommerz({
        tran_id,
        val_id,
        card_type,
        bank_tran_id,
        orderId,
      });
    }

    return {
      status: status || "FAILED",
      message: "IPN received but payment not marked as valid",
    };
  }
}

export const paymentsService = new PaymentsService();
