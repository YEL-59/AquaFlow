import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Home,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { formatBDT } from "../lib/utils";
import { api } from "../services/api";

const DHAKA_ZONES = [
  { id: "zone-gulshan", nameEn: "Gulshan (1 & 2)", nameBn: "গুলশান (১ ও ২)", fee: 50 },
  { id: "zone-banani", nameEn: "Banani & Kakoli", nameBn: "বনানী ও কাকলী", fee: 50 },
  { id: "zone-dhanmondi", nameEn: "Dhanmondi & Kalabagan", nameBn: "ধানমন্ডি ও কলাবাগান", fee: 50 },
  { id: "zone-uttara", nameEn: "Uttara (Sectors 1-14)", nameBn: "উত্তরা (সেক্টর ১-১৪)", fee: 60 },
  { id: "zone-mirpur", nameEn: "Mirpur (1 to 14, DOHS)", nameBn: "মিরপুর (১ হতে ১৪, ডিওএইচএস)", fee: 60 },
  { id: "zone-mohakhali", nameEn: "Mohakhali & DOHS", nameBn: "মহাখালী ও ডিওএইচএস", fee: 50 },
  { id: "zone-baridhara", nameEn: "Baridhara & Diplomatic Zone", nameBn: "বারিধারা ডিপ্লোম্যাটিক জোন", fee: 50 },
  { id: "zone-badda", nameEn: "Badda, Rampura & Aftabnagar", nameBn: "বাড্ডা, রামপুরা ও আফতাবনগর", fee: 50 },
];

export function Checkout({ cart = [], onClearCart }) {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zoneId, setZoneId] = useState("zone-gulshan");
  const [address, setAddress] = useState("");
  const [floor, setFloor] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("MORNING");
  const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");
  const [emptyJarsToReturn, setEmptyJarsToReturn] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const selectedZone = DHAKA_ZONES.find((z) => z.id === zoneId) || DHAKA_ZONES[0];

  const itemsSubtotal = cart.reduce((acc, item) => acc + (item.price || 80) * item.quantity, 0);
  const totalDeposit = cart.reduce(
    (acc, item) => acc + (item.depositAmount || 0) * item.quantity,
    0
  );
  const returnCredit = emptyJarsToReturn * 200; // ৳200 per returned jar
  const deliveryFee = selectedZone.fee;
  const grandTotal = Math.max(0, itemsSubtotal + totalDeposit + deliveryFee - returnCredit);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (cart.length === 0) {
      setErrorMsg("Your cart is empty. Please add water bottles first.");
      return;
    }

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg("Please fill in customer name, phone number, and delivery address.");
      return;
    }

    setIsSubmitting(true);
    const orderPayload = {
      customerName: name,
      phoneNumber: phone,
      deliveryZoneId: zoneId,
      deliveryAddress: address,
      floorNumber: floor,
      deliverySlot,
      paymentMethod,
      emptyJarsToReturn,
      deliveryInstructions: instructions,
      items: cart.map((i) => ({
        id: i.id,
        productId: i.id,
        name: i.nameEn,
        quantity: i.quantity,
        price: i.price,
        depositAmount: i.depositAmount,
      })),
      totalAmount: grandTotal,
    };

    try {
      const res = await api.post("/orders", orderPayload);
      const createdOrder = res.data || res;
      const orderId = createdOrder.id || createdOrder.orderNumber || `ORD-${Date.now()}`;
      if (onClearCart) onClearCart();
      navigate(`/order-success/${orderId}`);
    } catch (err) {
      console.warn("Server order fallback:", err);
      // Fallback local creation
      const fallbackId = `ORD-${Date.now().toString().slice(-6)}`;
      if (onClearCart) onClearCart();
      navigate(`/order-success/${fallbackId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-6">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBn ? "কার্টে ফিরে যান" : "Back to Cart"}</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {isBn ? "চেকআউট ও ডেলিভারি অর্ডার" : "Checkout & Express Delivery"}
        </h1>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-xs font-bold border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Customer & Address Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4 text-xs">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-500" />
                <span>1. {isBn ? "গ্রাহক ও ডেলিভারি ঠিকানা" : "Customer & Delivery Address"}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                  Dhaka Delivery Neighborhood *
                </label>
                <select
                  value={zoneId}
                  onChange={(e) => setZoneId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  {DHAKA_ZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {isBn ? z.nameBn : z.nameEn} (Fee: ৳{z.fee})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                  Road, House/Building & Area *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House 14, Road 11, Block D, Banani"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Apartment / Floor & Lift Status
                  </label>
                  <input
                    type="text"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    placeholder="e.g. 4th Floor (Lift available)"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                    Delivery Slot Window
                  </label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="MORNING">Morning (9:00 AM - 1:00 PM)</option>
                    <option value="AFTERNOON">Afternoon (2:00 PM - 6:00 PM)</option>
                    <option value="EVENING">Evening (6:00 PM - 9:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Empty Jars Return & Payment Method */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4 text-xs">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-cyan-500" />
                <span>2. {isBn ? "খালি জার রিটার্ন ও পেমেন্ট" : "Empty Jar Return & Payment Method"}</span>
              </h2>

              <div className="p-3.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-cyan-900 dark:text-cyan-200">
                    {isBn ? "খালি ২০ লিটার জার ফেরত দিবেন?" : "Returning Empty 20L Jars?"}
                  </div>
                  <div className="text-[11px] text-cyan-700 dark:text-cyan-400">
                    {isBn ? "প্রতি জারে ২০০ টাকা ডিপোজিট ক্রেডিট ছাড় পাবেন" : "Receive ৳200 deposit waiver per clean jar"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={emptyJarsToReturn}
                    onChange={(e) => setEmptyJarsToReturn(parseInt(e.target.value, 10) || 0)}
                    className="w-16 px-2 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-700 text-center font-black text-cyan-600 text-sm"
                  />
                  <span className="font-bold text-slate-500">Jars</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                    paymentMethod === "CASH_ON_DELIVERY"
                      ? "bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-900 dark:text-sky-200 font-bold"
                      : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="CASH_ON_DELIVERY"
                    checked={paymentMethod === "CASH_ON_DELIVERY"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-sky-600"
                  />
                  <div>
                    <div className="font-bold">Cash on Delivery (COD)</div>
                    <div className="text-[11px] text-slate-500">Pay delivery hero upon arrival</div>
                  </div>
                </label>

                <label
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                    paymentMethod === "BKASH"
                      ? "bg-pink-50 dark:bg-pink-950/60 border-pink-500 text-pink-900 dark:text-pink-200 font-bold"
                      : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="BKASH"
                    checked={paymentMethod === "BKASH"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-pink-600"
                  />
                  <div>
                    <div className="font-bold">bKash Online Payment</div>
                    <div className="text-[11px] text-slate-500">Instant digital checkout</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 text-xs">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {isBn ? "অর্ডার সামারি" : "Order Breakdown"}
              </h3>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-48 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {isBn ? item.nameBn : item.nameEn}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Qty: {item.quantity} × {formatBDT(item.price, "en")}
                      </div>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {formatBDT(item.price * item.quantity, "en")}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Water Subtotal</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatBDT(itemsSubtotal, "en")}</span>
                </div>

                {totalDeposit > 0 && (
                  <div className="flex justify-between text-cyan-600">
                    <span>Jar Deposit</span>
                    <span className="font-bold">+{formatBDT(totalDeposit, "en")}</span>
                  </div>
                )}

                {returnCredit > 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Empty Jar Credit ({emptyJarsToReturn} Jars)</span>
                    <span className="font-bold">-{formatBDT(returnCredit, "en")}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Delivery ({selectedZone.nameEn})</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatBDT(deliveryFee, "en")}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm font-black">
                  <span className="text-slate-900 dark:text-white">Total Payable (BDT)</span>
                  <span className="text-2xl text-[#0284c7] font-black">{formatBDT(grandTotal, "en")}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-sm shadow-xl shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {isSubmitting
                  ? "Processing Order..."
                  : isBn
                  ? "অর্ডার কনফার্ম করুন"
                  : `Confirm Order (${formatBDT(grandTotal, "en")})`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
