import { ordersService } from "../orders/orders.service.js";

// In-memory subscription store
const subscriptionStore = new Map();

// Seed initial active subscription for testing
subscriptionStore.set("sub-demo-101", {
  id: "sub-demo-101",
  userId: "user-demo-1",
  productId: "prod-20l-jar",
  productNameEn: "AquaFlow 20L Pure Reusable Jar",
  productNameBn: "অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার",
  quantityPerDelivery: 2,
  cadence: "CUSTOM_DAYS",
  customDays: ["SUNDAY", "TUESDAY", "THURSDAY"],
  preferredSlot: "MORNING",
  deliveryZoneId: "zone-banani",
  deliveryAddress: "House 14, Road 11, Block D, Banani",
  deliveryFloor: "4th Floor (Lift)",
  contactPhone: "+8801712345678",
  paymentMethod: "CASH_ON_DELIVERY",
  status: "ACTIVE",
  nextDeliveryDate: "2026-11-06",
  pauseStartDate: null,
  pauseEndDate: null,
  createdAt: "2026-10-01T08:00:00.000Z",
});

export class SubscriptionsService {
  /**
   * Create Recurring Subscription (PRD 8.1)
   */
  async createSubscription({
    userId,
    productId,
    quantityPerDelivery = 1,
    cadence = "WEEKLY",
    customDays = [],
    preferredSlot = "MORNING",
    deliveryZoneId = "zone-gulshan",
    deliveryAddress,
    deliveryFloor = null,
    contactPhone,
    paymentMethod = "CASH_ON_DELIVERY",
  }) {
    if (!deliveryAddress || !contactPhone) {
      const err = new Error("Delivery address and contact phone are required");
      err.status = 400;
      err.code = "MISSING_DELIVERY_DETAILS";
      throw err;
    }

    const subId = `sub_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();

    // Default next delivery is tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextDeliveryDate = tomorrow.toISOString().slice(0, 10);

    const subscription = {
      id: subId,
      userId: userId || "guest_customer",
      productId,
      productNameEn: "AquaFlow 20L Pure Reusable Jar",
      productNameBn: "অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার",
      quantityPerDelivery: parseInt(quantityPerDelivery, 10) || 1,
      cadence,
      customDays: customDays || [],
      preferredSlot,
      deliveryZoneId,
      deliveryAddress,
      deliveryFloor,
      contactPhone,
      paymentMethod,
      status: "ACTIVE",
      nextDeliveryDate,
      pauseStartDate: null,
      pauseEndDate: null,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    subscriptionStore.set(subId, subscription);
    return subscription;
  }

  async getSubscriptionById(subId) {
    const sub = subscriptionStore.get(subId);
    if (!sub) {
      const err = new Error(`Subscription '${subId}' not found`);
      err.status = 404;
      err.code = "SUBSCRIPTION_NOT_FOUND";
      throw err;
    }
    return sub;
  }

  async getUserSubscriptions(userId) {
    const list = [];
    for (const sub of subscriptionStore.values()) {
      if (sub.userId === userId || !userId) {
        list.push(sub);
      }
    }
    return list;
  }

  /**
   * Pause subscription until resumption date (PRD 8.4)
   */
  async pauseSubscription(subId, { pauseStartDate, pauseEndDate, reason = null }) {
    const sub = await this.getSubscriptionById(subId);
    sub.status = "PAUSED";
    sub.pauseStartDate = pauseStartDate || new Date().toISOString().slice(0, 10);
    sub.pauseEndDate = pauseEndDate || null;
    sub.pauseReason = reason;
    sub.updatedAt = new Date().toISOString();
    return sub;
  }

  /**
   * Resume active subscription (PRD 8.4)
   */
  async resumeSubscription(subId) {
    const sub = await this.getSubscriptionById(subId);
    sub.status = "ACTIVE";
    sub.pauseStartDate = null;
    sub.pauseEndDate = null;
    sub.updatedAt = new Date().toISOString();
    return sub;
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subId, reason = "Customer request") {
    const sub = await this.getSubscriptionById(subId);
    sub.status = "CANCELLED";
    sub.cancelReason = reason;
    sub.updatedAt = new Date().toISOString();
    return sub;
  }

  /**
   * Daily Recurring Worker: Generates next day's orders for active subscriptions (PRD 8.3)
   * Runs daily at 21:00 (Asia/Dhaka) with idempotent cycle keys.
   */
  async runDailyGenerationWorker(targetDateStr) {
    const targetDate = targetDateStr || new Date().toISOString().slice(0, 10);
    const generatedOrders = [];

    for (const sub of subscriptionStore.values()) {
      if (sub.status !== "ACTIVE") continue;

      // Check if paused
      if (sub.pauseStartDate && targetDate >= sub.pauseStartDate) {
        if (!sub.pauseEndDate || targetDate <= sub.pauseEndDate) {
          continue; // Currently within pause window
        }
      }

      const cycleKey = `SUB-CYCLE-${sub.id}-${targetDate.replace(/-/g, "")}`;

      try {
        const order = await ordersService.createOrder({
          userId: sub.userId,
          items: [{ productId: sub.productId, quantity: sub.quantityPerDelivery }],
          zoneId: sub.deliveryZoneId,
          emptyJarsToReturn: sub.quantityPerDelivery, // Recurring customer exchanges equal empty jars
          deliveryAddress: sub.deliveryAddress,
          deliveryFloor: sub.deliveryFloor,
          contactPhone: sub.contactPhone,
          deliverySlot: sub.preferredSlot,
          paymentMethod: sub.paymentMethod,
          idempotencyKey: cycleKey,
        });

        generatedOrders.push({
          subscriptionId: sub.id,
          cycleKey,
          orderId: order.id,
          orderNumber: order.orderNumber,
        });
      } catch (err) {
        console.warn(`Failed to generate recurring order for sub ${sub.id}:`, err);
      }
    }

    return {
      workerTargetDate: targetDate,
      processedCount: generatedOrders.length,
      orders: generatedOrders,
      status: "COMPLETED",
    };
  }
}

export const subscriptionsService = new SubscriptionsService();
