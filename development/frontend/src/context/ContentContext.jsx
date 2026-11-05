import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const DEFAULT_CONTENT = {
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

const ContentContext = createContext({
  content: DEFAULT_CONTENT,
  updateContent: async () => {},
  isLoading: false,
});

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem("aquaflow_site_content");
      return saved ? { ...DEFAULT_CONTENT, ...JSON.parse(saved) } : DEFAULT_CONTENT;
    } catch {
      return DEFAULT_CONTENT;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchContent() {
      try {
        const res = await api.get("/content");
        if (res?.data && isMounted) {
          setContent((prev) => {
            const merged = {
              hero: { ...prev.hero, ...(res.data.hero || {}) },
              announcement: { ...prev.announcement, ...(res.data.announcement || {}) },
              contact: { ...prev.contact, ...(res.data.contact || {}) },
              standards: { ...prev.standards, ...(res.data.standards || {}) },
            };
            try {
              localStorage.setItem("aquaflow_site_content", JSON.stringify(merged));
            } catch (e) {
              // Ignore localStorage quota
            }
            return merged;
          });
        }
      } catch (err) {
        // Fallback to local state if backend unreachable
      }
    }
    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateContent = async (newContent) => {
    setIsLoading(true);
    try {
      setContent((prev) => {
        const merged = {
          hero: { ...prev.hero, ...(newContent.hero || {}) },
          announcement: { ...prev.announcement, ...(newContent.announcement || {}) },
          contact: { ...prev.contact, ...(newContent.contact || {}) },
          standards: { ...prev.standards, ...(newContent.standards || {}) },
        };
        try {
          localStorage.setItem("aquaflow_site_content", JSON.stringify(merged));
        } catch (e) {}
        return merged;
      });

      // Send to backend API
      const res = await api.put("/content", newContent);
      if (res?.data) {
        setContent(res.data);
      }
      return { success: true };
    } catch (err) {
      console.warn("Updated content locally only:", err);
      return { success: true, localOnly: true };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
