import { prisma } from "../../config/prisma.js";

// Immutable in-memory container ledger store
const containerLedgerStore = [];

export class ContainersService {
  constructor() {
    // Seed initial demo balances
    if (containerLedgerStore.length === 0) {
      containerLedgerStore.push(
        {
          id: "c-entry-1",
          customerId: "user-demo-1",
          orderId: "ORD-20261015-1102",
          containerType: "JAR_20L",
          eventType: "DELIVERED_FULL",
          quantityChange: 5, // Customer received 5 full jars
          depositAmountChange: 1000.0, // +1000 BDT deposit liability
          hubId: "hub-banani",
          agentId: "staff-rafiq",
          notes: "Initial delivery 5 full jars",
          timestamp: "2026-10-15T10:00:00.000Z",
        },
        {
          id: "c-entry-2",
          customerId: "user-demo-1",
          orderId: "ORD-20261028-4412",
          containerType: "JAR_20L",
          eventType: "RETURNED_EMPTY",
          quantityChange: -2, // Customer returned 2 empty jars
          depositAmountChange: -400.0, // -400 BDT deposit credit
          hubId: "hub-banani",
          agentId: "staff-rafiq",
          notes: "Customer returned 2 intact empty jars during refill",
          timestamp: "2026-10-28T15:20:00.000Z",
        }
      );
    }
  }

  /**
   * Get Customer Container Balance
   * Computes net jars held and current refundable deposit liability
   */
  async getCustomerBalance(customerId) {
    const customerEntries = containerLedgerStore.filter(
      (entry) => entry.customerId === customerId || !customerId
    );

    let jarsHeld = 0;
    let depositHeld = 0;
    let totalJarsReceived = 0;
    let totalJarsReturned = 0;
    let totalJarsDamaged = 0;

    for (const entry of customerEntries) {
      if (entry.eventType === "DELIVERED_FULL") {
        totalJarsReceived += entry.quantityChange;
        jarsHeld += entry.quantityChange;
        depositHeld += entry.depositAmountChange;
      } else if (entry.eventType === "RETURNED_EMPTY") {
        totalJarsReturned += Math.abs(entry.quantityChange);
        jarsHeld += entry.quantityChange; // Negative change reduces held count
        depositHeld += entry.depositAmountChange; // Negative change reduces deposit
      } else if (entry.eventType === "DAMAGED_OR_LOST") {
        totalJarsDamaged += Math.abs(entry.quantityChange);
        jarsHeld += entry.quantityChange;
        // Deposit forfeited
      }
    }

    return {
      customerId: customerId || "user-demo-1",
      containerType: "JAR_20L",
      jarsCurrentlyHeld: Math.max(0, jarsHeld),
      depositLiabilityBDT: Math.max(0, depositHeld),
      totalJarsReceived,
      totalJarsReturned,
      totalJarsDamaged,
      depositPerJarBDT: 200.0,
      currency: "BDT",
    };
  }

  /**
   * Record Jar Return Event (PRD 6.2)
   */
  async recordReturn({
    customerId,
    orderId,
    quantity,
    hubId = "hub-banani",
    agentId = null,
    notes = "Empty jar return collected by delivery agent",
  }) {
    const count = parseInt(quantity, 10);
    if (!count || count <= 0) {
      const err = new Error("Return quantity must be greater than 0");
      err.status = 400;
      err.code = "INVALID_CONTAINER_QUANTITY";
      throw err;
    }

    const depositCredit = count * 200.0;
    const entry = {
      id: `c-entry-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      customerId,
      orderId: orderId || null,
      containerType: "JAR_20L",
      eventType: "RETURNED_EMPTY",
      quantityChange: -count,
      depositAmountChange: -depositCredit,
      hubId,
      agentId,
      notes,
      timestamp: new Date().toISOString(),
    };

    containerLedgerStore.push(entry);
    return entry;
  }

  /**
   * Record Jar Delivery Event (PRD 6.1)
   */
  async recordDelivery({
    customerId,
    orderId,
    quantity,
    hubId = "hub-banani",
    agentId = null,
    notes = "Full jar delivered to customer",
  }) {
    const count = parseInt(quantity, 10);
    if (!count || count <= 0) {
      const err = new Error("Delivery quantity must be greater than 0");
      err.status = 400;
      err.code = "INVALID_CONTAINER_QUANTITY";
      throw err;
    }

    const depositDebit = count * 200.0;
    const entry = {
      id: `c-entry-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      customerId,
      orderId: orderId || null,
      containerType: "JAR_20L",
      eventType: "DELIVERED_FULL",
      quantityChange: count,
      depositAmountChange: depositDebit,
      hubId,
      agentId,
      notes,
      timestamp: new Date().toISOString(),
    };

    containerLedgerStore.push(entry);
    return entry;
  }

  /**
   * Get Immutable Container Ledger Entries with filter
   */
  async getLedger({ customerId, orderId, eventType, limit = 50 }) {
    let entries = [...containerLedgerStore];

    if (customerId) {
      entries = entries.filter((e) => e.customerId === customerId);
    }
    if (orderId) {
      entries = entries.filter((e) => e.orderId === orderId);
    }
    if (eventType) {
      entries = entries.filter((e) => e.eventType === eventType);
    }

    return entries
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, parseInt(limit, 10) || 50);
  }
}

export const containersService = new ContainersService();
