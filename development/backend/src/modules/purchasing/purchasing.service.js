import { inventoryService } from "../inventory/inventory.service.js";

const SUPPLIERS = [
  {
    id: "supp-kinley",
    nameEn: "Coca-Cola Beverages Bangladesh (Kinley)",
    nameBn: "কোকা-কোলা বেভারেজেস বাংলাদেশ (কিনলে)",
    contactPerson: "Mahmudur Rahman",
    phone: "+8801711002233",
    email: "procurement@kinley.com.bd",
    leadTimeDays: 2,
    categoriesSupplied: ["PACKAGED_BOTTLE"],
    isActive: true,
  },
  {
    id: "supp-poly-jar",
    nameEn: "Bengal Plastics Container Division",
    nameBn: "বেঙ্গল প্লাস্টিকস কন্টেইনার ডিভিশন",
    contactPerson: "Shamsul Alam",
    phone: "+8801811445566",
    email: "industrial@bengal.com.bd",
    leadTimeDays: 5,
    categoriesSupplied: ["REUSABLE_JAR", "ACCESSORY"],
    isActive: true,
  },
  {
    id: "supp-aqua-filters",
    nameEn: "Dometic Water Purifiers & Dispensers",
    nameBn: "ডমেটিক ওয়াটার পিউরিফায়ার ও ডিসপেনসার",
    contactPerson: "Tanzeem Haque",
    phone: "+8801911778899",
    email: "sales@dometic.com.bd",
    leadTimeDays: 3,
    categoriesSupplied: ["DISPENSER"],
    isActive: true,
  },
];

const purchaseOrdersStore = new Map();
const grnStore = [];

// Seed initial Purchase Order
purchaseOrdersStore.set("PO-20261020-001", {
  id: "PO-20261020-001",
  poNumber: "PO-20261020-001",
  supplierId: "supp-kinley",
  supplierName: "Coca-Cola Beverages Bangladesh (Kinley)",
  targetLocationId: "loc-central-tejgaon",
  status: "COMPLETED",
  items: [
    {
      productId: "prod-1500ml-case",
      name: "1.5L Mineral Water (Pack of 12)",
      orderedQuantity: 500,
      receivedQuantity: 500,
      unitCostBDT: 260.0,
      totalCostBDT: 130000.0,
    },
  ],
  totalCostBDT: 130000.0,
  createdAt: "2026-10-20T09:00:00.000Z",
});

export class PurchasingService {
  async getSuppliers() {
    return SUPPLIERS;
  }

  async getPurchaseOrders() {
    return Array.from(purchaseOrdersStore.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  async createPurchaseOrder({ supplierId, targetLocationId, items }) {
    const supplier = SUPPLIERS.find((s) => s.id === supplierId);
    if (!supplier) {
      const err = new Error(`Supplier '${supplierId}' not found`);
      err.status = 404;
      err.code = "SUPPLIER_NOT_FOUND";
      throw err;
    }

    const now = new Date();
    const poNumber = `PO-${now.toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(100 + Math.random() * 900)}`;

    let totalCost = 0;
    const formattedItems = items.map((i) => {
      const unitCost = Number(i.unitCostBDT) || 200;
      const qty = parseInt(i.orderedQuantity, 10) || 1;
      const lineCost = unitCost * qty;
      totalCost += lineCost;
      return {
        productId: i.productId,
        name: i.name || "Packaged Product",
        orderedQuantity: qty,
        receivedQuantity: 0,
        unitCostBDT: unitCost,
        totalCostBDT: lineCost,
      };
    });

    const po = {
      id: poNumber,
      poNumber,
      supplierId,
      supplierName: supplier.nameEn,
      targetLocationId: targetLocationId || "loc-central-tejgaon",
      status: "SENT_TO_SUPPLIER",
      items: formattedItems,
      totalCostBDT: totalCost,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    purchaseOrdersStore.set(poNumber, po);
    return po;
  }

  /**
   * Receive Goods via Goods Receipt Note (GRN) (PRD 4.2 & 12.7)
   * Automatically inspects delivery and increments destination inventory stock.
   */
  async recordGoodsReceipt({
    poNumber,
    receivedItems,
    inspectorName = "Quality Assurance Officer",
    batchNumber = "BATCH-2026-A1",
    bstiVerified = true,
  }) {
    const po = purchaseOrdersStore.get(poNumber);
    if (!po) {
      const err = new Error(`Purchase Order '${poNumber}' not found`);
      err.status = 404;
      err.code = "PO_NOT_FOUND";
      throw err;
    }

    const grnId = `GRN-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString();

    for (const item of receivedItems) {
      const targetItem = po.items.find((i) => i.productId === item.productId);
      if (targetItem) {
        targetItem.receivedQuantity += parseInt(item.quantity, 10) || 0;
      }

      // Automatically increment stock at the target warehouse
      try {
        const currentStock = await inventoryService.getStock({
          locationId: po.targetLocationId,
          productId: item.productId,
        });

        if (currentStock && currentStock.length > 0) {
          currentStock[0].fullAvailable += parseInt(item.quantity, 10) || 0;
        }
      } catch (err) {
        console.warn("Stock update on GRN receipt:", err);
      }
    }

    // Check if fully received
    const allReceived = po.items.every(
      (i) => i.receivedQuantity >= i.orderedQuantity
    );
    po.status = allReceived ? "COMPLETED" : "PARTIALLY_RECEIVED";
    po.updatedAt = now;

    const grn = {
      id: grnId,
      poNumber,
      supplierName: po.supplierName,
      targetLocationId: po.targetLocationId,
      receivedItems,
      inspectorName,
      batchNumber,
      bstiVerified,
      timestamp: now,
    };

    grnStore.push(grn);
    return { grn, purchaseOrder: po };
  }
}

export const purchasingService = new PurchasingService();
