import { prisma } from "../../config/prisma.js";

// Fallback Dhaka zones for instant dev availability
const DEFAULT_DHAKA_ZONES = [
  { code: "GULSHAN", nameEn: "Gulshan (1 & 2)", nameBn: "গুলশান (১ ও ২)", deliveryFee: "50.00", minimumOrderAmount: "150.00", defaultLeadTimeHours: 2 },
  { code: "BANANI", nameEn: "Banani & DOHS", nameBn: "বনানী ও ডিওএইচএস", deliveryFee: "50.00", minimumOrderAmount: "150.00", defaultLeadTimeHours: 2 },
  { code: "DHANMONDI", nameEn: "Dhanmondi", nameBn: "ধানমন্ডি", deliveryFee: "60.00", minimumOrderAmount: "200.00", defaultLeadTimeHours: 3 },
  { code: "UTTARA", nameEn: "Uttara (Sectors 1-14)", nameBn: "উত্তরা (সেক্টর ১-১৪)", deliveryFee: "60.00", minimumOrderAmount: "200.00", defaultLeadTimeHours: 3 },
  { code: "BASHUNDHARA", nameEn: "Bashundhara R/A", nameBn: "বসুন্ধরা আ/এ", deliveryFee: "50.00", minimumOrderAmount: "150.00", defaultLeadTimeHours: 2 },
  { code: "MIRPUR", nameEn: "Mirpur (1, 2, 10, 11)", nameBn: "মিরপুর (১, ২, ১০, ১১)", deliveryFee: "70.00", minimumOrderAmount: "200.00", defaultLeadTimeHours: 3 },
  { code: "MOHAMMADPUR", nameEn: "Mohammadpur", nameBn: "মোহাম্মদপুর", deliveryFee: "70.00", minimumOrderAmount: "200.00", defaultLeadTimeHours: 3 },
];

export class ZonesService {
  static async getAllZones() {
    try {
      const zones = await prisma.deliveryZone.findMany({
        where: { status: "ACTIVE" },
        include: { deliverySlots: { where: { isActive: true } } },
      });

      if (zones.length > 0) return zones;
    } catch (e) {
      // Fallback to default in-memory list if DB not seeded
    }
    return DEFAULT_DHAKA_ZONES;
  }

  static async checkCoverage({ neighborhood }) {
    const query = neighborhood.toLowerCase().trim();
    const zones = await this.getAllZones();

    const matchedZone = zones.find(
      (z) =>
        z.nameEn.toLowerCase().includes(query) ||
        z.nameBn.includes(query) ||
        z.code.toLowerCase().includes(query)
    );

    if (matchedZone) {
      return {
        serviceable: true,
        zone: {
          id: matchedZone.id || matchedZone.code,
          code: matchedZone.code,
          nameEn: matchedZone.nameEn,
          nameBn: matchedZone.nameBn,
          deliveryFee: matchedZone.deliveryFee,
          minimumOrderAmount: matchedZone.minimumOrderAmount,
          leadTime: `${matchedZone.defaultLeadTimeHours || 2} Hours`,
        },
        availableSlots: [
          { startTime: "08:00", endTime: "11:00", label: "Morning Window (8:00 AM - 11:00 AM)" },
          { startTime: "11:00", endTime: "14:00", label: "Noon Window (11:00 AM - 2:00 PM)" },
          { startTime: "15:00", endTime: "18:00", label: "Afternoon Window (3:00 PM - 6:00 PM)" },
          { startTime: "18:00", endTime: "21:00", label: "Evening Window (6:00 PM - 9:00 PM)" },
        ],
      };
    }

    return {
      serviceable: false,
      message: "Delivery is currently expanding to this neighborhood soon.",
    };
  }
}

export const zonesService = ZonesService;

