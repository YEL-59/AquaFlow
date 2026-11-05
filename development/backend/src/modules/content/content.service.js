// AquaFlow — CMS & Site Content Service
// Manages website copy, announcements, contact hotline, and trust standards

let SITE_CONTENT = {
  hero: {
    headlineEn: "READY TO GET HYDRATED?",
    headlineBn: "পানির বিশুদ্ধতায় অতুলনীয়?",
    subtitleEn: "Experience the purest mineral-balanced water in Dhaka. Express 1-2 hour delivery right to your door with hermetically sealed, medical-grade sanitized bottles.",
    subtitleBn: "ঢাকায় ঘরে ঘরে পৌঁছে দিচ্ছি ল্যাব-পরীক্ষিত শতভাগ বিশুদ্ধ খাবার পানি। অর্ডার করার ১-২ ঘণ্টার মধ্যেই এক্সপ্রেস ডেলিভারি।",
    ctaTextEn: "Order Now",
    ctaTextBn: "অর্ডার করুন",
    badgeEn: "Pure Drinking Water",
    badgeBn: "বিশুদ্ধ খাবার পানি",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  announcement: {
    enabled: true,
    badgeText: "SPECIAL PROMO",
    textEn: "⚡ Fast 1-2 Hour Delivery across Gulshan, Banani, Dhanmondi, Uttara & Mirpur! Free Jar Delivery on Subscriptions.",
    textBn: "⚡ গুলশান, বনানী, ধানমন্ডি, উত্তরা ও মিরপুরে ১-২ ঘণ্টার এক্সপ্রেস ডেলিভারি! সাবস্ক্রিপশনে ফ্রি ডেলিভারি।",
  },
  contact: {
    hotline: "+880 9612-278235",
    hotlineDisplay: "+880 9612-AQUA",
    email: "support@aquaflow.com.bd",
    addressEn: "Gulshan Avenue, Dhaka-1212, Bangladesh",
    addressBn: "গুলশান এভিনিউ, ঢাকা-১২১২, বাংলাদেশ",
    hoursEn: "7:00 AM – 10:00 PM (Everyday)",
    hoursBn: "সকাল ৭:০০ - রাত ১০:০০ (প্রতিদিন)",
  },
  standards: {
    bstiLicense: "BDS 1240:2021",
    tdsRange: "120 - 150 PPM",
    phRange: "7.2 - 7.6 pH",
    filtrationStages: "7-Stage Medical-Grade Reverse Osmosis",
  },
};

export class ContentService {
  async getContent() {
    return SITE_CONTENT;
  }

  async updateContent(payload) {
    if (!payload || typeof payload !== "object") {
      const err = new Error("Invalid content payload");
      err.status = 400;
      throw err;
    }

    SITE_CONTENT = {
      hero: { ...SITE_CONTENT.hero, ...(payload.hero || {}) },
      announcement: { ...SITE_CONTENT.announcement, ...(payload.announcement || {}) },
      contact: { ...SITE_CONTENT.contact, ...(payload.contact || {}) },
      standards: { ...SITE_CONTENT.standards, ...(payload.standards || {}) },
    };

    return SITE_CONTENT;
  }
}

export const contentService = new ContentService();
