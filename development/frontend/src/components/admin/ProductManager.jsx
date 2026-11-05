import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Droplets,
  DollarSign,
  Layers,
  Image as ImageIcon,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { formatBDT } from "../../lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { api } from "../../services/api";

const PRESET_IMAGES = [
  { label: "20L Pure Reusable Jar", url: "/images/hero-bottle.jpg" },
  { label: "1.5L Mineral Water Case", url: "https://images.unsplash.com/photo-1559839914-ba2ac5e7e0e7?auto=format&fit=crop&w=600&q=80" },
  { label: "500ml Bottled Water Case", url: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80" },
  { label: "Hot & Cold Dispenser", url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80" },
  { label: "Manual Hand Pump", url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80" },
  { label: "Tabletop Ceramic Cradle", url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80" },
];

export function ProductManager() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form state for Add/Edit
  const [formData, setFormData] = useState({
    id: "",
    nameEn: "",
    nameBn: "",
    category: "REUSABLE_JAR",
    price: 80,
    depositAmount: 0,
    stockCount: 100,
    volumeLitres: 20,
    inStock: true,
    isSubscriptionEligible: true,
    requiresContainerDeposit: false,
    descriptionEn: "",
    descriptionBn: "",
    image: "/images/hero-bottle.jpg",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prodsRes, catsRes] = await Promise.all([
        api.get("/products"),
        api.get("/categories"),
      ]);
      setProducts(prodsRes.data || []);
      setCategories(catsRes.data || []);
    } catch (err) {
      console.warn("Could not load products from API:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      id: `prod-${Date.now().toString(36)}`,
      nameEn: "",
      nameBn: "",
      category: "REUSABLE_JAR",
      price: 80,
      depositAmount: 200,
      stockCount: 250,
      volumeLitres: 20,
      inStock: true,
      isSubscriptionEligible: true,
      requiresContainerDeposit: true,
      descriptionEn: "Pure 7-stage purified water delivered to your doorstep in Dhaka.",
      descriptionBn: "৭ স্তরে পরিশোধিত স্বাস্থ্যকর খাবার পানি।",
      image: "/images/hero-bottle.jpg",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      nameEn: product.nameEn || "",
      nameBn: product.nameBn || "",
      category: product.category || "REUSABLE_JAR",
      price: product.price ?? 80,
      depositAmount: product.depositAmount ?? 0,
      stockCount: product.stockCount ?? 100,
      volumeLitres: product.volumeLitres ?? 0,
      inStock: product.inStock !== false,
      isSubscriptionEligible: Boolean(product.isSubscriptionEligible),
      requiresContainerDeposit: Boolean(product.requiresContainerDeposit),
      descriptionEn: product.descriptionEn || "",
      descriptionBn: product.descriptionBn || "",
      image: product.image || "/images/hero-bottle.jpg",
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingProduct) {
        // Update product
        const res = await api.put(`/products/${editingProduct.id}`, formData);
        const updated = res.data || { ...editingProduct, ...formData };
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updated : p))
        );
        showToast(`✓ Updated "${formData.nameEn}" successfully!`);
      } else {
        // Create product
        const res = await api.post("/products", formData);
        const created = res.data || { ...formData, id: `prod-${Date.now()}` };
        setProducts((prev) => [created, ...prev]);
        showToast(`✓ Created new product "${formData.nameEn}"!`);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save product error:", err);
      // Fallback local state update
      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...formData } : p))
        );
        showToast(`✓ Updated locally: "${formData.nameEn}"`);
      } else {
        setProducts((prev) => [formData, ...prev]);
        showToast(`✓ Added locally: "${formData.nameEn}"`);
      }
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStock = async (product) => {
    const updatedStatus = !product.inStock;
    try {
      await api.put(`/products/${product.id}`, { inStock: updatedStatus });
    } catch (e) {
      // Ignore network fail, update UI
    }
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, inStock: updatedStatus } : p))
    );
    showToast(`✓ Status updated for "${product.nameEn}"`);
  };

  const handleDeleteProduct = async (id, nameEn) => {
    if (!window.confirm(`Are you sure you want to delete "${nameEn}"?`)) return;
    try {
      await api.delete(`/products/${id}`);
    } catch (e) {}
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`✓ Deleted product "${nameEn}"`);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "ALL" && p.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        p.nameEn.toLowerCase().includes(q) ||
        p.nameBn.includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.id && p.id.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalProductsCount = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const jarProductsCount = products.filter((p) => p.category === "REUSABLE_JAR").length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action & Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-md">
          <div className="text-slate-400 text-xs font-semibold">Total Catalog Items</div>
          <div className="text-2xl font-black text-white mt-1">{totalProductsCount} Products</div>
          <div className="text-xs text-sky-400 mt-0.5">Fully manageable via API</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-md">
          <div className="text-slate-400 text-xs font-semibold">Active & In Stock</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{inStockCount} In Stock</div>
          <div className="text-xs text-slate-400 mt-0.5">{totalProductsCount - inStockCount} Out of Stock</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-md">
          <div className="text-slate-400 text-xs font-semibold">20L Jar Lineups</div>
          <div className="text-2xl font-black text-cyan-400 mt-1">{jarProductsCount} Lines</div>
          <div className="text-xs text-cyan-300 mt-0.5">Deposit & refill tracking enabled</div>
        </div>
      </div>

      {/* Control Bar: Search, Category Filter, and Add Product Button */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">All Categories</option>
            <option value="REUSABLE_JAR">20L Reusable Jars</option>
            <option value="PACKAGED_BOTTLE">Packaged Bottles (Case)</option>
            <option value="DISPENSER">Water Dispensers</option>
            <option value="ACCESSORY">Pumps & Accessories</option>
          </select>
        </div>

        {/* Add Product Button */}
        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-700 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price (BDT)</th>
                <th className="py-3.5 px-4">Jar Deposit</th>
                <th className="py-3.5 px-4">Stock & Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-700/30 transition">
                  {/* Thumbnail & Title */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image || "/images/hero-bottle.jpg"}
                        alt={p.nameEn}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-white text-sm truncate max-w-xs">{p.nameEn}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">{p.nameBn}</div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">ID: {p.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900 text-sky-400 border border-slate-700">
                      {p.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-black text-emerald-400 text-sm">
                    {formatBDT(p.price, "en")}
                  </td>

                  {/* Deposit */}
                  <td className="py-3.5 px-4 text-slate-300">
                    {p.depositAmount > 0 ? (
                      <span className="text-cyan-400 font-bold">
                        {formatBDT(p.depositAmount, "en")} (Refundable)
                      </span>
                    ) : (
                      <span className="text-slate-500">None</span>
                    )}
                  </td>

                  {/* Stock & Status Toggle */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleStock(p)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition flex items-center gap-1 ${
                          p.inStock
                            ? "bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900/60"
                            : "bg-red-950/80 text-red-300 border-red-800 hover:bg-red-900/60"
                        }`}
                        title="Click to toggle In Stock / Out of Stock"
                      >
                        {p.inStock ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>In Stock ({p.stockCount || 100})</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-red-400" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 rounded-lg bg-sky-950/80 text-sky-300 border border-sky-800 hover:bg-sky-900 transition"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.nameEn)}
                        className="p-1.5 rounded-lg bg-red-950/80 text-red-300 border border-red-800 hover:bg-red-900 transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {editingProduct ? `Edit Product: ${editingProduct.nameEn}` : "Add New Drinking Water Product"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Set prices, deposit requirements, stock levels, and descriptions.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              {/* Product Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="e.g. AquaFlow 20L Pure Reusable Jar"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Product Name (Bangla) *</label>
                  <input
                    type="text"
                    required
                    value={formData.nameBn}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    placeholder="যেমন: অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Category & Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="REUSABLE_JAR">20L Reusable Jar</option>
                    <option value="PACKAGED_BOTTLE">Packaged Bottles (Case)</option>
                    <option value="DISPENSER">Water Dispenser</option>
                    <option value="ACCESSORY">Pump & Accessory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Volume (Litres)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.volumeLitres}
                    onChange={(e) => setFormData({ ...formData, volumeLitres: e.target.value })}
                    placeholder="20"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Price, Deposit & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Price (৳ BDT) *</label>
                  <input
                    type="number"
                    required
                    step="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 font-bold text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Jar Deposit (৳ BDT)</label>
                  <input
                    type="number"
                    step="1"
                    value={formData.depositAmount}
                    onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-cyan-400 font-bold text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Available Stock Count</label>
                  <input
                    type="number"
                    step="1"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/hero-bottle.jpg or https://..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 mb-2"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] text-slate-400 mr-1 self-center">Presets:</span>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img.label}
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-sky-950 text-[10px] text-sky-300 border border-slate-700"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-200">Active / In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSubscriptionEligible}
                    onChange={(e) => setFormData({ ...formData, isSubscriptionEligible: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-200">Subscription Eligible</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresContainerDeposit}
                    onChange={(e) => setFormData({ ...formData, requiresContainerDeposit: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="font-semibold text-slate-200">Requires Jar Deposit</span>
                </label>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Description (English)</label>
                  <textarea
                    rows={3}
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Description (Bangla)</label>
                  <textarea
                    rows={3}
                    value={formData.descriptionBn}
                    onChange={(e) => setFormData({ ...formData, descriptionBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border-slate-700 text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold px-6"
                >
                  {isSubmitting ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManager;
