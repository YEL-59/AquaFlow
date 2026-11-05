import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Droplets, Phone, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import { Alert } from "../../components/ui/alert";

export function Login() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      await login(identifier, password);
      navigate("/");
    } catch (err) {
      setErrorMsg(
        err.message ||
          (isBn ? "লগইন ব্যর্থ হয়েছে। ফোন নম্বর ও পাসওয়ার্ড সঠিক কিনা যাচাই করুন।" : "Login failed. Please verify credentials.")
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
              {isBn ? "অ্যাকাউন্টে লগইন করুন" : "Welcome to AquaFlow"}
            </CardTitle>
            <CardDescription>
              {isBn
                ? "আপনার ফোন নম্বর বা ইমেইল দিয়ে সহজে লগইন করুন"
                : "Enter your phone number or email to access your orders"}
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
                label={isBn ? "ফোন নম্বর অথবা ইমেইল" : "Phone Number or Email"}
                placeholder={isBn ? "যেমন: 01712345678" : "e.g. +8801712345678 or user@example.com"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />

              <div className="relative">
                <Input
                  label={isBn ? "পাসওয়ার্ড" : "Password"}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                  <span>{isBn ? "আমাকে মনে রাখুন" : "Remember me"}</span>
                </label>
                <span className="text-sky-600 hover:underline cursor-pointer">
                  {isBn ? "পাসওয়ার্ড ভুলে গেছেন?" : "Forgot password?"}
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full justify-center mt-2"
              >
                {isBn ? "লগইন করুন" : "Sign In"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
            <p className="text-xs text-slate-500">
              {isBn ? "নতুন গ্রাহক?" : "Don't have an account?"}{" "}
              <Link to="/auth/register" className="font-semibold text-sky-600 hover:underline">
                {isBn ? "এখনই ফ্রি রেজিস্ট্রেশন করুন" : "Register Free"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
