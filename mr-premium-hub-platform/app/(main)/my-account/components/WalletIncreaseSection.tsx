"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Info, Plus } from "lucide-react";
import {
  requestWalletPaymentLink,
  getLoginPhoneFromStorage,
  fetchUserProfileFallback,
  fetchWalletBalance,
  type WalletBalance,
} from "../lib/my-account-api";

const formatRial = (n: number) => new Intl.NumberFormat("fa-IR").format(n) + " ریال";

export default function WalletIncreaseSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState<"gateway" | "bank">("gateway");
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState("");
  const [wallet, setWallet] = useState<WalletBalance>({});
  const [walletLoading, setWalletLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const loadWallet = () => {
    setWalletLoading(true);
    fetchWalletBalance()
      .then(setWallet)
      .finally(() => setWalletLoading(false));
  };

  useEffect(() => {
    loadWallet();
  }, []);

  useEffect(() => {
    const success = searchParams.get("payment") === "success";
    if (success) {
      setPaymentSuccess(true);
      loadWallet();
      router.replace("/my-account/wallet-increase", { scroll: false });
    }
  }, [searchParams, router]);

  useEffect(() => {
    fetchUserProfileFallback().then((profile) => {
      if (profile?.name?.trim()) setFullName((prev) => prev || profile.name!.trim());
    });
  }, []);

  const normalizeAmount = (raw: string) => {
    const fa = "۰۱۲۳۴۵۶۷۸۹";
    const en = raw.replace(/[۰-۹]/g, (d) => String(fa.indexOf(d)));
    return en.replace(/\D/g, "");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayError("");
    const value = normalizeAmount(amount);
    const amountNum = value ? Number(value) : 0;
    if (!value || amountNum <= 0) {
      setPayError("مبلغ را وارد کنید.");
      return;
    }
    const phone = getLoginPhoneFromStorage();
    if (!phone?.trim()) {
      setPayError("لطفاً ابتدا وارد حساب شوید.");
      return;
    }
    if (!fullName.trim()) {
      setPayError("نام و نام خانوادگی را وارد کنید.");
      return;
    }
    if (cardNumber.replace(/\D/g, "").length < 16) {
      setPayError("شماره کارت را به صورت ۱۶ رقم وارد کنید.");
      return;
    }
    setPayLoading(true);
    try {
      const paymentUrl = await requestWalletPaymentLink({
        phone: phone.trim(),
        money: amountNum,
        cardNumber: cardNumber.trim(),
        name: fullName.trim(),
      });
      if (paymentUrl) window.location.href = paymentUrl;
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "دریافت لینک پرداخت ناموفق بود.");
    } finally {
      setPayLoading(false);
    }
  };

  const totalRial = wallet.total ?? 0;
  const availableRial = wallet.available ?? wallet.total ?? 0;
  const blockedRial = wallet.blocked ?? 0;

  const walletCards = [
    { label: "موجودی کیف پول", value: totalRial, btn: true, icon: Plus, href: "/my-account/wallet-increase", text: "افزایش" },
    { label: "موجودی در دسترس", value: availableRial, btn: false, icon: null, href: null, text: null, disabled: false },
    { label: "موجودی بلوکه شده", value: blockedRial, btn: false, icon: null, href: null, text: null, disabled: false },
  ];

  return (
    <div className="w-full space-y-6">
      {paymentSuccess && (
        <div className="rounded-lg bg-green-50 border border-green-200 py-3 px-4 text-sm text-green-800">
          پرداخت با موفقیت انجام شد. موجودی کیف پول به‌روزرسانی شد.
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-gray-600">موجودی‌ها از API خوانده می‌شوند.</span>
        <button
          type="button"
          onClick={() => loadWallet()}
          disabled={walletLoading}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {walletLoading ? "در حال بارگذاری…" : "بروزرسانی موجودی"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {walletCards.map(({ label, value, btn, icon: Icon, href, text, disabled }) => (
          <div
            key={label}
            className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">{label}</span>
              <button type="button" className="text-gray-400 hover:text-gray-600" title="اطلاعات">
                <Info size={14} />
              </button>
            </div>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {walletLoading ? "—" : formatRial(value)}
            </p>
            {btn && text && (
              <button
                type="button"
                onClick={() => href && router.push(href)}
                disabled={disabled}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {Icon && (
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
                    <Icon size={14} />
                  </span>
                )}
                {text}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">افزایش اعتبار</h3>
        <p className="mt-1 text-sm text-gray-500">روش پرداخت خود را انتخاب کنید:</p>
        <div className="mt-4 flex gap-4 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setPaymentMethod("bank")}
            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
              paymentMethod === "bank"
                ? "border-brand text-brand"
                : "-mb-px border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            واریز به حساب بانکی
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("gateway")}
            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
              paymentMethod === "gateway"
                ? "border-brand text-brand"
                : "-mb-px border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            افزایش موجودی از طریق درگاه
          </button>
        </div>

        {paymentMethod === "gateway" && (
          <form onSubmit={handlePay} className="mt-6 max-w-md space-y-4">
            <div>
              <label htmlFor="credit-name" className="block text-sm font-medium text-gray-700">
                نام و نام خانوادگی صاحب کارت
              </label>
              <input
                id="credit-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="نام و نام خانوادگی"
                className="mt-1.5 w-full rounded-lg border border-gray-200 py-2.5 px-4 text-right focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </div>
            <div>
              <label htmlFor="credit-card" className="block text-sm font-medium text-gray-700">
                شماره کارت (۱۶ رقم)
              </label>
              <input
                id="credit-card"
                type="text"
                inputMode="numeric"
                maxLength={19}
                dir="ltr"
                value={cardNumber}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                  setCardNumber(v.replace(/(\d{4})/g, "$1 ").trim());
                }}
                placeholder="6104 3374 8300 8486"
                className="mt-1.5 w-full rounded-lg border border-gray-200 py-2.5 px-4 text-left font-mono focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </div>
            <div>
              <label htmlFor="credit-amount" className="block text-sm font-medium text-gray-700">
                مبلغ افزایش اعتبار
              </label>
              <div className="mt-1.5 flex overflow-hidden rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-brand focus-within:border-brand">
                <input
                  id="credit-amount"
                  type="text"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const v = raw.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/\D/g, "");
                    setAmount(v ? new Intl.NumberFormat("fa-IR").format(Number(v)) : "");
                  }}
                  className="min-w-0 flex-1 border-0 bg-white py-2.5 px-4 text-left focus:ring-0"
                  placeholder="0"
                />
                <span className="flex items-center border-r border-gray-200 bg-gray-50 px-4 text-sm text-gray-600">
                  ریال
                </span>
              </div>
            </div>
            {payError && (
              <p className="text-sm text-red-600 bg-red-50 py-2 px-3 rounded-lg">{payError}</p>
            )}
            <button
              type="submit"
              disabled={payLoading}
              className="rounded-lg bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-hover disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {payLoading ? "در حال انتقال به درگاه…" : "پرداخت"}
            </button>
          </form>
        )}

        {paymentMethod === "bank" && (
          <p className="mt-4 text-sm text-gray-500">
            اطلاعات واریز به حساب بانکی به زودی در این بخش قرار می‌گیرد.
          </p>
        )}
      </div>
    </div>
  );
}
