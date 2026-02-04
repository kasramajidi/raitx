"use client";

import React, { useState, useMemo } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminStatsCards from "../components/AdminStatsCards";
import OrdersTable from "./components/OrdersTable";

interface Order {
  id: string;
  customer: string;
  products: string;
  amount: string;
  status: string;
  date: string;
}

const initialOrders: Order[] = [
  {
    id: "#1234",
    customer: "علی احمدی",
    products: "لپ تاپ اپل",
    amount: "25,000,000 تومان",
    status: "در حال پردازش",
    date: "1403/01/15",
  },
  {
    id: "#1235",
    customer: "مریم رضایی",
    products: "گوشی سامسونگ",
    amount: "15,000,000 تومان",
    status: "ارسال شده",
    date: "1403/01/14",
  },
  {
    id: "#1236",
    customer: "حسین محمدی",
    products: "تبلت آیپد",
    amount: "18,000,000 تومان",
    status: "تحویل داده شده",
    date: "1403/01/13",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const orderStats = useMemo(() => {
    const total = orders.length;
    const inProgress = orders.filter((o) => o.status === "در حال پردازش").length;
    const delivered = orders.filter((o) => o.status === "تحویل داده شده").length;
    return [
      { title: "کل سفارشات", value: total, icon: "📦", color: "bg-brand-muted text-brand" },
      { title: "در حال پردازش", value: inProgress, icon: "⏳", color: "bg-amber-50 text-amber-600" },
      { title: "تحویل داده شده", value: delivered, icon: "✅", color: "bg-emerald-50 text-emerald-600" },
    ];
  }, [orders]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            مدیریت سفارشات
          </h1>
          <p className="text-sm text-gray-600">
            مشاهده و مدیریت تمام سفارشات
          </p>
        </div>

        <AdminStatsCards items={orderStats} />

        <div className="bg-white border-b border-gray-200 p-4">
          <input
            type="text"
            placeholder="جستجو در سفارشات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 bg-white border-b border-gray-300 px-3 text-right text-gray-900 focus:outline-none focus:border-[#ff5538] transition-colors text-sm"
          />
        </div>

        <OrdersTable
          orders={filteredOrders}
          onStatusChange={handleStatusChange}
        />
      </div>
    </AdminLayout>
  );
}
