import { prisma } from "../../config/prisma.js";

// Standard Dhaka catalog products with BDT pricing and deposit requirements
let SEED_PRODUCTS = [
  {
    id: "prod-20l-jar",
    slug: "aqua-pure-20l-jar",
    nameEn: "AquaFlow 20L Pure Reusable Jar",
    nameBn: "অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার",
    descriptionEn: "7-stage purified drinking water in food-grade, sanitized 20-litre reusable polycarbonate jar. Laboratory tested TDS 120-150.",
    descriptionBn: "৭ স্তরে পরিশোধিত স্বাস্থ্যকর খাবার পানি। খাদ্য-উপযোগী জীবাণুমুক্ত ২০ লিটার পুনর্ব্যবহারযোগ্য পলিকার্বোনেট জার।",
    category: "REUSABLE_JAR",
    price: 80.0,
    depositAmount: 200.0,
    isSubscriptionEligible: true,
    requiresContainerDeposit: true,
    volumeLitres: 20.0,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    stockCount: 450,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "prod-1500ml-case",
    slug: "kinley-1500ml-case-12",
    nameEn: "1.5L Mineral Water (Pack of 12)",
    nameBn: "১.৫ লিটার মিনারেল ওয়াটার (১২টি বোতলের কেস)",
    descriptionEn: "Natural mineral water packaged for family dining, outdoor events, and office meeting rooms. 12 bottles per case.",
    descriptionBn: "পারিবারিক ডাইনিং এবং অফিস মিটিংয়ের জন্য আদর্শ খনিজ পানি। প্রতি কেসে ১২টি বোতল।",
    category: "PACKAGED_BOTTLE",
    price: 360.0,
    depositAmount: 0.0,
    isSubscriptionEligible: true,
    requiresContainerDeposit: false,
    volumeLitres: 18.0,
    image: "https://images.unsplash.com/photo-1559839914-ba2ac5e7e0e7?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    stockCount: 220,
    rating: 4.8,
    reviewCount: 145,
  },
  {
    id: "prod-500ml-case",
    slug: "aqua-500ml-case-24",
    nameEn: "500ml Personal Water (Pack of 24)",
    nameBn: "৫০০ মিলি পার্সোনাল ওয়াটার (২৪টি বোতলের কেস)",
    descriptionEn: "Handy 500ml bottles convenient for grab-and-go hydration, conferences, seminars, and events.",
    descriptionBn: "সহজে বহনযোগ্য ৫০০ মিলি পানির বোতল। কনফারেন্স ও ব্যক্তিগত ব্যবহারের জন্য আদর্শ।",
    category: "PACKAGED_BOTTLE",
    price: 480.0,
    depositAmount: 0.0,
    isSubscriptionEligible: true,
    requiresContainerDeposit: false,
    volumeLitres: 12.0,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    stockCount: 180,
    rating: 4.7,
    reviewCount: 98,
  },
  {
    id: "prod-dispenser-electric",
    slug: "hot-cold-standing-dispenser",
    nameEn: "AquaFlow Hot & Cold Water Dispenser",
    nameBn: "অ্যাকোয়াফ্লো হট ও কোল্ড ওয়াটার ডিসপেনসার",
    descriptionEn: "Floor standing compressor cooled water dispenser with instant boiling & chilled taps. Child safety lock included.",
    descriptionBn: "আধুনিক কম্প্রেসর কুলিংযুক্ত ফ্লোর স্ট্যান্ডিং ডিসপেনসার। তাৎক্ষণিক গরম ও ঠাণ্ডা পানি এবং চাইল্ড লক সুবিধা।",
    category: "DISPENSER",
    price: 12500.0,
    depositAmount: 0.0,
    isSubscriptionEligible: false,
    requiresContainerDeposit: false,
    volumeLitres: 0.0,
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    stockCount: 35,
    rating: 4.9,
    reviewCount: 52,
  },
  {
    id: "prod-dispenser-manual",
    slug: "manual-hand-press-pump",
    nameEn: "Ergonomic Manual 20L Jar Hand Pump",
    nameBn: "ম্যানুয়াল ২০ লিটার জার হ্যান্ড পাম্প",
    descriptionEn: "BPA-free durable suction pump with dust-cap spout. Quick to install on any standard 20L water jar.",
    descriptionBn: "বিপিএ-মুক্ত দীর্ঘস্থায়ী হ্যান্ড পাম্প। ২০ লিটার জারের মুখে সহজেই স্থাপনযোগ্য।",
    category: "ACCESSORY",
    price: 350.0,
    depositAmount: 0.0,
    isSubscriptionEligible: false,
    requiresContainerDeposit: false,
    volumeLitres: 0.0,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    stockCount: 200,
    rating: 4.6,
    reviewCount: 84,
  },
  {
    id: "prod-dispenser-tabletop",
    slug: "tabletop-ceramic-cradle",
    nameEn: "Tabletop Ceramic Dispenser with Wood Stand",
    nameBn: "টেবিলটপ সিরামিক ডিসপেনসার ও কাঠের স্ট্যান্ড",
    descriptionEn: "Eco-friendly, electricity-free ambient water dispenser with polished natural wooden stand and stainless steel valve.",
    descriptionBn: "বিদ্যুৎবিহীন পরিবেশবান্ধব সিরামিক ডিসপেনসার ও প্রাকৃতিক কাঠের সুন্দর স্ট্যান্ড।",
    category: "DISPENSER",
    price: 2400.0,
    depositAmount: 0.0,
    isSubscriptionEligible: false,
    requiresContainerDeposit: false,
    volumeLitres: 0.0,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    inStock: true,
    stockCount: 45,
    rating: 4.8,
    reviewCount: 38,
  },
];

const CATEGORIES = [
  { id: "ALL", nameEn: "All Products", nameBn: "সব পণ্য" },
  { id: "REUSABLE_JAR", nameEn: "20L Reusable Jars", nameBn: "২০ লিটার জার" },
  { id: "PACKAGED_BOTTLE", nameEn: "Packaged Bottles", nameBn: "বোতলজাত পানি" },
  { id: "DISPENSER", nameEn: "Dispensers", nameBn: "ডিসপেনসার" },
  { id: "ACCESSORY", nameEn: "Pumps & Accessories", nameBn: "আনুষাঙ্গিক পণ্য" },
];

export class CatalogService {
  /**
   * Get list of categories
   */
  async getCategories() {
    return CATEGORIES;
  }

  /**
   * Get all active products with optional category and search filtering
   */
  async getProducts({ category, search, subscriptionOnly }) {
    // If DB has products and DATABASE_URL is available, query it; otherwise use seed products
    try {
      if (process.env.DATABASE_URL && prisma && prisma.product) {
        const where = { isActive: true };
        if (category && category !== "ALL") {
          where.category = category;
        }
        if (subscriptionOnly === "true" || subscriptionOnly === true) {
          where.isSubscriptionEligible = true;
        }

        const dbProducts = await prisma.product.findMany({
          where,
          include: {
            variants: true,
          },
          orderBy: { createdAt: "asc" },
        });

        if (dbProducts && dbProducts.length > 0) {
          return dbProducts.map((p) => ({
            id: p.id,
            slug: p.slug,
            nameEn: p.nameEn,
            nameBn: p.nameBn,
            descriptionEn: p.descriptionEn,
            descriptionBn: p.descriptionBn,
            category: p.category,
            price: Number(p.basePrice),
            depositAmount: Number(p.depositAmount || 0),
            isSubscriptionEligible: p.isSubscriptionEligible,
            requiresContainerDeposit: p.requiresContainerDeposit,
            volumeLitres: Number(p.volumeLitres || 0),
            image: p.imageUrl || "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
            inStock: true,
            stockCount: 100,
            rating: 4.9,
            reviewCount: 120,
          }));
        }
      }
    } catch {
      // Fallback to in-memory seeds if DB table not yet migrated
    }

    let results = [...SEED_PRODUCTS];

    if (category && category !== "ALL") {
      results = results.filter((p) => p.category === category);
    }

    if (subscriptionOnly === "true" || subscriptionOnly === true) {
      results = results.filter((p) => p.isSubscriptionEligible);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(q) ||
          p.nameBn.includes(q) ||
          p.descriptionEn.toLowerCase().includes(q) ||
          p.descriptionBn.includes(q)
      );
    }

    return results;
  }

  /**
   * Get product by ID or Slug
   */
  async getProductById(idOrSlug) {
    const product = SEED_PRODUCTS.find(
      (p) => p.id === idOrSlug || p.slug === idOrSlug
    );
    if (!product) {
      const err = new Error(`Product with identifier '${idOrSlug}' not found`);
      err.status = 404;
      err.code = "PRODUCT_NOT_FOUND";
      throw err;
    }
    return product;
  }

  /**
   * Create a new product (Admin)
   */
  async createProduct(data) {
    const id = data.id || `prod-${Date.now().toString(36)}`;
    const slug = data.slug || (data.nameEn ? data.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-") : id);
    const newProduct = {
      id,
      slug,
      nameEn: data.nameEn || "New Drinking Water Product",
      nameBn: data.nameBn || data.nameEn || "নতুন পানি পণ্য",
      descriptionEn: data.descriptionEn || "Pure bottled hydration water laboratory tested.",
      descriptionBn: data.descriptionBn || "বিশুদ্ধ খাবার পানি ল্যাব সার্টিফাইড।",
      category: data.category || "PACKAGED_BOTTLE",
      price: parseFloat(data.price) || 50.0,
      depositAmount: parseFloat(data.depositAmount) || 0.0,
      isSubscriptionEligible: Boolean(data.isSubscriptionEligible),
      requiresContainerDeposit: Boolean(data.requiresContainerDeposit),
      volumeLitres: parseFloat(data.volumeLitres) || 1.0,
      image: data.image || "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
      inStock: data.inStock !== undefined ? Boolean(data.inStock) : true,
      stockCount: parseInt(data.stockCount, 10) || 100,
      rating: parseFloat(data.rating) || 5.0,
      reviewCount: parseInt(data.reviewCount, 10) || 1,
    };

    SEED_PRODUCTS.unshift(newProduct);
    return newProduct;
  }

  /**
   * Update an existing product (Admin)
   */
  async updateProduct(id, updateData) {
    const index = SEED_PRODUCTS.findIndex((p) => p.id === id || p.slug === id);
    if (index === -1) {
      const err = new Error(`Product '${id}' not found`);
      err.status = 404;
      err.code = "PRODUCT_NOT_FOUND";
      throw err;
    }

    const current = SEED_PRODUCTS[index];
    const updated = {
      ...current,
      ...updateData,
      price: updateData.price !== undefined ? parseFloat(updateData.price) : current.price,
      depositAmount: updateData.depositAmount !== undefined ? parseFloat(updateData.depositAmount) : current.depositAmount,
      stockCount: updateData.stockCount !== undefined ? parseInt(updateData.stockCount, 10) : current.stockCount,
      volumeLitres: updateData.volumeLitres !== undefined ? parseFloat(updateData.volumeLitres) : current.volumeLitres,
      inStock: updateData.inStock !== undefined ? Boolean(updateData.inStock) : current.inStock,
    };

    SEED_PRODUCTS[index] = updated;
    return updated;
  }

  /**
   * Delete an existing product (Admin)
   */
  async deleteProduct(id) {
    const index = SEED_PRODUCTS.findIndex((p) => p.id === id || p.slug === id);
    if (index === -1) {
      const err = new Error(`Product '${id}' not found`);
      err.status = 404;
      err.code = "PRODUCT_NOT_FOUND";
      throw err;
    }

    const removed = SEED_PRODUCTS.splice(index, 1);
    return { success: true, removed: removed[0] };
  }
}

export const catalogService = new CatalogService();
