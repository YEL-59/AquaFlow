import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Droplets, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import { Alert } from "../../components/ui/alert";

export function Register() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      await register({
        name,
        phone,
        email: email || undefined,
        password,
        preferredLanguage: isBn ? "bn" : "en",
      });
      navigate("/");
    } catch (err) {
      setErrorMsg(
        err.message ||
          (isBn ? "রেজিস্ট্রেশন সম্পন্ন করা সম্ভব হয়নি। আবার চেষ্টা করুন।" : "Registration failed. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md">
        <Card className="glass-card shadow-2xl p-6 sm:p-8 rounded-3xl border border-white/60 dark:border-slate-800">
          <CardHeader className="text-center pb-6">
            <div className="h-12 w-12 mx-auto rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/30 mb-3">
              <Droplets className="h-6 w-6 fill-white/20 stroke-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {isBn ? "নতুন কাস্টমার একাউন্ট তৈরি করুন" : "Create Your Account"}
            </CardTitle>
            <CardDescription>
              {isBn
                ? "সহজে বিশুদ্ধ পানি অর্ডার এবং জার ট্র্যাকিং করতে যুক্ত হোন"
                : "Join AquaFlow for fast scheduled water delivery & jar tracking"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {errorMsg && (
              <div className="mb-4">
                <Alert tone="destructive" icon={AlertCircle}>
                  {errorMsg}
                </Alert>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={isBn ? "আপনার পূর্ণ নাম" : "Full Name"}
                placeholder={isBn ? "যেমন: মোহাম্মদ রহিম" : "e.g. John Doe"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label={isBn ? "মোবাইল ফোন নম্বর" : "Mobile Phone Number"}
                placeholder={isBn ? "01XXXXXXXXX" : "01XXXXXXXXX or +8801XXXXXXXXX"}
                helperText={isBn ? "ডেলিভারি কনফার্মেশনের জন্য ব্যবহৃত হবে" : "Used for delivery confirmations and OTP"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <Input
                label={isBn ? "ইমেইল ঠিকানা (ঐচ্ছিক)" : "Email Address (Optional)"}
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label={isBn ? "পাসওয়ার্ড" : "Password"}
                type="password"
                placeholder={isBn ? "কমপক্ষে ৬ অক্ষর" : "Minimum 6 characters"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full justify-center"
                >
                  {isBn ? "একাউন্ট তৈরি করুন" : "Create Account"}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="justify-center border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
            <p className="text-xs text-slate-500">
              {isBn ? "ইতিমধ্যে একাউন্ট আছে?" : "Already have an account?"}{" "}
              <Link to="/auth/login" className="font-semibold text-sky-600 hover:underline">
                {isBn ? "এখানে লগইন করুন" : "Sign in here"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
