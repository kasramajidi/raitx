"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Info, Plus } from "lucide-react";
import {
  fetchWalletBalance,
  fetchRecentOrders,
  fetchRecentSupportTickets,
  type OrderItem,
  type SupportTicket,
} from "../lib/my-account-api";

export default function DashboardMain() {
  const router = useRouter();
  const [wallet, setWallet] = useState<{ total?: number; available?: number; blocked?: number }>({});
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingSupport, setLoadingSupport] = useState(true);

  useEffect(() => {
    fetchWalletBalance().then((w) => {
      setWallet(w);
      setLoadingWallet(false);
    });
  }, []);
  useEffect(() => {
    fetchRecentOrders(10).then((list) => {
      setOrders(list);
      setLoadingOrders(false);
    });
  }, []);
  useEffect(() => {
    fetchRecentSupportTickets().then((list) => {
      setSupportTickets(list);
      setLoadingSupport(false);
    });
  }, []);

  const formatRial = (n: number) => new Intl.NumberFormat("fa-IR").format(n) + " ریال";
  const totalRial = wallet.total ?? 0;
  const availableRial = wallet.available ?? wallet.total ?? 0;
  const blockedRial = wallet.blocked ?? 0;

  const walletCards = [
    { label: "موجودی بلوکه شده", value: blockedRial, action: null as string | null, href: null as string | null },
    { label: "موجودی در دسترس", value: availableRial, action: "افزایش", href: "/my-account/wallet-increase" },
    { label: "موجودی کیف پول", value: totalRial, action: null as string | null, href: null as string | null },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          کیف پول
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {walletCards.map(({ label, value, action, href }) => (
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
                {loadingWallet ? "—" : formatRial(value)}
              </p>
              {action && href && (
                <button
                  type="button"
                  onClick={() => router.push(href)}
                  className="mt-4 text-sm font-medium text-[#ff5538] hover:underline"
                >
                  {action}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">آخرین درخواست های پشتیبانی</h3>
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5538] text-white hover:bg-[#e6452e]"
              title="درخواست جدید"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-600">وضعیت</th>
                  <th className="px-4 py-3 font-medium text-gray-600">آخرین بروزرسانی</th>
                  <th className="px-4 py-3 font-medium text-gray-600">عنوان پیام</th>
                  <th className="px-4 py-3 font-medium text-gray-600">شماره پیام</th>
                </tr>
              </thead>
              <tbody>
                {loadingSupport ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                      در حال بارگذاری…
                    </td>
                  </tr>
                ) : supportTickets.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                      پیامی ثبت نشده است
                    </td>
                  </tr>
                ) : (
                  supportTickets.map((t) => (
                    <tr key={t.id} className="border-b border-gray-50">
                      <td className="px-4 py-3">{t.status}</td>
                      <td className="px-4 py-3">{t.lastUpdate}</td>
                      <td className="px-4 py-3">{t.title}</td>
                      <td className="px-4 py-3">{t.messageNumber ?? t.id}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">آخرین سفارش ها</h3>
            <button
              type="button"
              onClick={() => router.push("/my-account/orders")}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5538] text-white hover:bg-[#e6452e]"
              title="مشاهده همه"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-600">شماره سفارش</th>
                  <th className="px-4 py-3 font-medium text-gray-600">نوع سفارش</th>
                  <th className="px-4 py-3 font-medium text-gray-600">آخرین بروزرسانی</th>
                  <th className="px-4 py-3 font-medium text-gray-600">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {loadingOrders ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                      در حال بارگذاری…
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                      سفارشی ثبت نشده است
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b border-gray-50 cursor-pointer hover:bg-gray-50/50"
                      onClick={() => router.push("/my-account/orders")}
                    >
                      <td className="px-4 py-3">{o.orderNumber}</td>
                      <td className="px-4 py-3">{o.orderType}</td>
                      <td className="px-4 py-3">{o.lastUpdate}</td>
                      <td className="px-4 py-3">{o.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
