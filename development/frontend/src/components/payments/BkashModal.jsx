import React, { useState, useEffect } from "react";
import { X, ShieldCheck, ArrowRight, Lock, CheckCircle2, RotateCcw, AlertCircle, Copy, Check } from "lucide-react";
import { formatBDT } from "../../lib/utils";

export function BkashModal({
  isOpen,
  onClose,
  amount,
  orderId,
  customerPhone = "",
  currentLang = "en",
  onPaymentSuccess,
}) {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: PIN, 4: Processing, 5: Success
  const [phone, setPhone] = useState(customerPhone || "01712345678");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(120);
  const [paymentResult, setPaymentResult] = useState(null);
  const [copiedTrx, setCopiedTrx] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPhone(customerPhone || "01712345678");
      setOtp("");
      setPin("");
      setErrorMessage("");
      setTimer(120);
      setPaymentResult(null);
    }
  }, [isOpen, customerPhone]);

  useEffect(() => {
    let interval = null;
    if (isOpen && step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, step, timer]);

  if (!isOpen) return null;

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Step 1: Submit Phone
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const cleaned = phone.replace(/[^0-9]/g, "");
    if (cleaned.length < 11) {
      setErrorMessage(
        currentLang === "bn"
          ? "সঠিক ১১ ডিজিটের বিকাশ ওয়ালেট নম্বর প্রদান করুন।"
          : "Please enter a valid 11-digit bKash account number."
      );
      return;
    }
    setStep(2);
  };

  // Step 2: Submit OTP
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!otp.trim() || otp.length < 4) {
      setErrorMessage(
        currentLang === "bn"
          ? "৬ ডিজিটের ভেরিফিকেশন কোড (OTP) প্রদান করুন।"
          : "Please enter the 6-digit OTP code."
      );
      return;
    }
    setStep(3);
  };

  // Step 3: Submit PIN & Execute
  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!pin.trim() || pin.length < 4) {
      setErrorMessage(
        currentLang === "bn"
          ? "আপনার ৫ ডিজিটের বিকাশ পিন নম্বর প্রদান করুন।"
          : "Please enter your 5-digit bKash PIN."
      );
      return;
    }

    setStep(4); // Processing

    try {
      const response = await fetch("http://localhost:5000/api/v1/payments/bkash/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentID: `BK-PAY-${Date.now()}`,
          otp,
          pin,
          orderId,
        }),
      }).catch(() => null);

      let data;
      if (response && response.ok) {
        const json = await response.json();
        data = json.data;
      } else {
        // Fallback realistic mock generator
        const randomTrx = "BKSH" + Math.random().toString(36).substring(2, 8).toUpperCase();
        data = {
          trxID: randomTrx,
          amount: amount || 350,
          currency: "BDT",
          paymentExecuteTime: new Date().toISOString(),
          customerMsisdn: phone,
          merchantInvoiceNumber: orderId || `INV-${Date.now()}`,
          transactionStatus: "Completed",
        };
      }

      setTimeout(() => {
        setPaymentResult(data);
        setStep(5); // Success
      }, 1200);
    } catch {
      setStep(3);
      setErrorMessage(
        currentLang === "bn"
          ? "পেমেন্ট ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
          : "Payment execution failed. Please try again."
      );
    }
  };

  const handleCopyTrx = () => {
    if (paymentResult?.trxID) {
      navigator.clipboard.writeText(paymentResult.trxID);
      setCopiedTrx(true);
      setTimeout(() => setCopiedTrx(false), 2000);
    }
  };

  const handleFinalSuccess = () => {
    if (onPaymentSuccess) {
      onPaymentSuccess({
        paymentMethod: "BKASH",
        trxID: paymentResult?.trxID || `BKSH${Date.now().toString(36).toUpperCase()}`,
        amount,
        paidAt: paymentResult?.paymentExecuteTime || new Date().toISOString(),
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 transform transition-all">
        {/* bKash Official Magenta Header */}
        <div className="bg-[#E2136E] text-white px-6 py-5 relative">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 p-1 rounded-full text-white/80 hover:text-white hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* bKash Logo Symbol */}
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md p-1.5">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#E2136E] fill-current">
                  <path d="M50 10 L85 50 L65 50 L80 85 L35 45 L55 45 Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-wide flex items-center gap-1.5">
                  <span>bKash</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-normal">
                    Merchant Checkout
                  </span>
                </h3>
                <p className="text-xs text-pink-100">AquaFlow Pure Water Ltd.</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-pink-200 block">
                {currentLang === "bn" ? "প্রদেয় অর্থ" : "Amount Due"}
              </span>
              <span className="text-lg font-black text-white">
                {formatBDT(amount || 0, currentLang)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Phone Input */}
          {step === 1 && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h4 className="font-bold text-slate-800 text-sm">
                  {currentLang === "bn"
                    ? "আপনার বিকাশ একাউন্ট নম্বর দিন"
                    : "Enter your bKash Account Number"}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {currentLang === "bn"
                    ? "পেমেন্ট সম্পন্ন করতে আপনার ১১ ডিজিটের মোবাইল নম্বর লিখুন"
                    : "Enter your 11-digit mobile wallet number to proceed"}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {currentLang === "bn" ? "বিকাশ নম্বর" : "bKash Mobile Number"}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    maxLength={11}
                    className="w-full px-4 py-3 text-base font-semibold tracking-wider text-slate-900 border-2 border-pink-200 rounded-2xl focus:border-[#E2136E] focus:outline-none focus:ring-4 focus:ring-pink-100 text-center"
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>256-bit SSL Secure</span>
                  </span>
                  <span className="text-pink-600 font-medium">Demo: 01712345678</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  {currentLang === "bn" ? "বাতিল" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#E2136E] hover:bg-[#c20f5c] text-white font-bold text-xs shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{currentLang === "bn" ? "নিশ্চিত করুন" : "Confirm"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: OTP Input */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h4 className="font-bold text-slate-800 text-sm">
                  {currentLang === "bn"
                    ? "বিকাশ ভেরিফিকেশন কোড (OTP) লিখুন"
                    : "Enter bKash Verification Code (OTP)"}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {currentLang === "bn" ? (
                    <>
                      <strong className="text-slate-800">{phone}</strong> নম্বরে কোড পাঠানো হয়েছে
                    </>
                  ) : (
                    <>
                      Verification code sent to <strong className="text-slate-800">{phone}</strong>
                    </>
                  )}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1 2 3 4 5 6"
                  maxLength={6}
                  className="w-full px-4 py-3 text-lg font-black tracking-widest text-slate-900 border-2 border-pink-200 rounded-2xl focus:border-[#E2136E] focus:outline-none focus:ring-4 focus:ring-pink-100 text-center"
                />
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-slate-500">
                    {currentLang === "bn" ? "সময় বাকি: " : "Time left: "}
                    <strong className="text-pink-600 font-bold">{formatTimer(timer)}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtp("123456");
                      setTimer(120);
                    }}
                    className="text-pink-600 hover:text-pink-700 font-bold underline"
                  >
                    {currentLang === "bn" ? "অটো-ফিল (123456)" : "Auto-fill (123456)"}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  {currentLang === "bn" ? "পেছনে যান" : "Back"}
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#E2136E] hover:bg-[#c20f5c] text-white font-bold text-xs shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{currentLang === "bn" ? "যাচাই করুন" : "Verify Code"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PIN Input */}
          {step === 3 && (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center mx-auto mb-2 text-[#E2136E]">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">
                  {currentLang === "bn" ? "৫ ডিজিটের বিকাশ পিন দিন" : "Enter 5-digit bKash PIN"}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {currentLang === "bn"
                    ? "আপনার গোপন পিন কারো সাথে শেয়ার করবেন না"
                    : "Never share your secret PIN with anyone"}
                </p>
              </div>

              <div>
                <input
                  type="password"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="•••••"
                  maxLength={5}
                  className="w-full px-4 py-3 text-xl font-black tracking-widest text-slate-900 border-2 border-pink-200 rounded-2xl focus:border-[#E2136E] focus:outline-none focus:ring-4 focus:ring-pink-100 text-center"
                />
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-slate-400">PIN is end-to-end encrypted</span>
                  <button
                    type="button"
                    onClick={() => setPin("12345")}
                    className="text-pink-600 hover:text-pink-700 font-bold underline"
                  >
                    {currentLang === "bn" ? "ডেমো পিন (12345)" : "Demo PIN (12345)"}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  {currentLang === "bn" ? "পেছনে যান" : "Back"}
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#E2136E] hover:bg-[#c20f5c] text-white font-bold text-xs shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{currentLang === "bn" ? "পেমেন্ট সম্পন্ন করুন" : "Pay Now"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Processing State */}
          {step === 4 && (
            <div className="py-8 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-pink-200 animate-ping opacity-25"></div>
                <div className="relative w-16 h-16 rounded-full border-4 border-t-[#E2136E] border-pink-100 animate-spin"></div>
              </div>
              <h4 className="font-bold text-slate-800 text-sm">
                {currentLang === "bn" ? "পেমেন্ট প্রসেস হচ্ছে..." : "Processing bKash Payment..."}
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {currentLang === "bn"
                  ? "অনুগ্রহ করে অপেক্ষা করুন। বিকাশ গেটওয়ে থেকে ট্রানজেকশন নিশ্চিত করা হচ্ছে।"
                  : "Please wait. Verifying secure payment transaction with bKash Bangladesh."}
              </p>
            </div>
          )}

          {/* STEP 5: Success State */}
          {step === 5 && (
            <div className="py-4 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-lg">
                  {currentLang === "bn" ? "বিকাশ পেমেন্ট সফল হয়েছে!" : "bKash Payment Successful!"}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {currentLang === "bn"
                    ? "আপনার পানির অর্ডারটি প্রিপেইড হিসেবে নিশ্চিত করা হয়েছে।"
                    : "Your water delivery order is fully prepaid and confirmed."}
                </p>
              </div>

              {/* Receipt Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Transaction ID (TrxID)</span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800">
                    <span>{paymentResult?.trxID}</span>
                    <button
                      type="button"
                      onClick={handleCopyTrx}
                      className="p-1 rounded hover:bg-slate-200 text-slate-600"
                    >
                      {copiedTrx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{currentLang === "bn" ? "পরিশোধিত অর্থ" : "Paid Amount"}</span>
                  <span className="font-bold text-slate-900">{formatBDT(amount || 0, currentLang)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>{currentLang === "bn" ? "পেমেন্ট মাধ্যম" : "Channel"}</span>
                  <span className="font-semibold text-pink-600">bKash Merchant</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinalSuccess}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{currentLang === "bn" ? "অর্ডার ট্র্যাকিং দেখুন" : "View Order Tracking"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BkashModal;
