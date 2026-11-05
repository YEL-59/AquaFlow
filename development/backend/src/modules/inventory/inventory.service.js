import { prisma } from "../../config/prisma.js";

const LOCATIONS = [
  {
    id: "loc-central-tejgaon",
    nameEn: "Central Processing Plant & Warehouse (Tejgaon)",
    nameBn: "কেন্দ্রীয় প্রক্রিয়াকরণ প্ল্যান্ট ও গুদাম (তেজগাঁও)",
    type: "CENTRAL_WAREHOUSE",
    address: "Tejgaon Industrial Area, Dhaka",
    capacityJars: 5000,
    isActive: true,
  },
  {
    id: "loc-hub-gulshan-banani",
    nameEn: "Gulshan-Banani Neighborhood Hub",
    nameBn: "গুলশান-বনানী নেইবারহুড হাব",
    type: "MICRO_HUB",
    address: "Road 11, Block D, Banani, Dhaka",
    capacityJars: 1200,
    isActive: true,
  },
  {
    id: "loc-hub-dhanmondi",
    nameEn: "Dhanmondi-Kalabagan Neighborhood Hub",
    nameBn: "ধানমন্ডি-কলাবাগান নেইবারহুড হাব",
    type: "MICRO_HUB",
    address: "Road 27 (Old), Dhanmondi, Dhaka",
    capacityJars: 900,
    isActive: true,
  },
  {
    id: "loc-hub-uttara",
    nameEn: "Uttara Sector 7 Micro-Hub",
    nameBn: "উত্তরা সেক্টর ৭ মাইক্রো-হাব",
    type: "MICRO_HUB",
    address: "Sector 7, Uttara, Dhaka",
    capacityJars: 1000,
    isActive: true,
  },
  {
    id: "loc-van-01-gulshan",
    nameEn: "Delivery Van 01 (Gulshan-Banani Fleet)",
    nameBn: "ডেলিভারি ভ্যান ০১ (গুলশান-বনানী ফ্লিট)",
    type: "DELIVERY_VEHICLE",
    address: "Mobile Vehicle Fleet #DH-11-8901",
    capacityJars: 80,
    isActive: true,
  },
];

const INITIAL_STOCK = [
  {
    locationId: "loc-hub-gulshan-banani",
    productId: "prod-20l-jar",
    fullAvailable: 420,
    reserved: 35,
    emptyAwaitingWash: 85,
    damaged: 2,
  },
  {
    locationId: "loc-hub-gulshan-banani",
    productId: "prod-1500ml-case",
    fullAvailable: 150,
    reserved: 12,
    emptyAwaitingWash: 0,
    damaged: 0,
  },
  {
    locationId: "loc-hub-dhanmondi",
    productId: "prod-20l-jar",
    fullAvailable: 310,
    reserved: 20,
    emptyAwaitingWash: 60,
    damaged: 1,
  },
  {
    locationId: "loc-central-tejgaon",
    productId: "prod-20l-jar",
    fullAvailable: 2800,
    reserved: 150,
    emptyAwaitingWash: 650,
    damaged: 14,
  },
];

const movementLedgerStore = [];

export class InventoryService {
  constructor() {
    this.stockStore = [...INITIAL_STOCK];
  }

  async getLocations() {
    return LOCATIONS;
  }

  async getStock({ locationId, productId }) {
    let results = [...this.stockStore];
    if (locationId) {
      results = results.filter((s) => s.locationId === locationId);
    }
    if (productId) {
      results = results.filter((s) => s.productId === productId);
    }
    return results;
  }

  /**
   * Transfer inventory between locations (e.g. Central Warehouse -> Micro Hub)
   */
  async transferStock({
    sourceLocationId,
    destinationLocationId,
    productId,
    quantity,
    stockType = "FULL_AVAILABLE",
    referenceNote = "Hub replenishment transfer",
  }) {
    const qty = parseInt(quantity, 10);
    if (!qty || qty <= 0) {
      const err = new Error("Transfer quantity must be greater than 0");
      err.status = 400;
      err.code = "INVALID_TRANSFER_QUANTITY";
      throw err;
    }

    const sourceStock = this.stockStore.find(
      (s) => s.locationId === sourceLocationId && s.productId === productId
    );

    if (!sourceStock || sourceStock.fullAvailable < qty) {
      const err = new Error(
        `Insufficient available stock at source location (available: ${
          sourceStock ? sourceStock.fullAvailable : 0
        }, requested: ${qty})`
      );
      err.status = 400;
      err.code = "INSUFFICIENT_STOCK";
      throw err;
    }

    // Deduct from source
    sourceStock.fullAvailable -= qty;

    // Add to destination
    let destStock = this.stockStore.find(
      (s) => s.locationId === destinationLocationId && s.productId === productId
    );
    if (!destStock) {
      destStock = {
        locationId: destinationLocationId,
        productId,
        fullAvailable: 0,
        reserved: 0,
        emptyAwaitingWash: 0,
        damaged: 0,
      };
      this.stockStore.push(destStock);
    }
    destStock.fullAvailable += qty;

    // Record immutable movement entry
    const movement = {
      id: `mov-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      sourceLocationId,
      destinationLocationId,
      productId,
      quantity: qty,
      stockType,
      referenceNote,
      timestamp: new Date().toISOString(),
    };
    movementLedgerStore.push(movement);

    return {
      movement,
      sourceLocationStock: sourceStock,
      destinationLocationStock: destStock,
    };
  }

  async getMovements({ locationId, limit = 50 }) {
    let list = [...movementLedgerStore];
    if (locationId) {
      list = list.filter(
        (m) =>
          m.sourceLocationId === locationId ||
          m.destinationLocationId === locationId
      );
    }
    return list.slice(0, parseInt(limit, 10) || 50);
  }
}

export const inventoryService = new InventoryService();
