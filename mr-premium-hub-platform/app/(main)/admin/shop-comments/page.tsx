"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminStatsCards from "../components/AdminStatsCards";
import ShopCommentsTable from "./components/ShopCommentsTable";
import {
  getShopCommentsFromProducts,
  getShopProductsForFilter,
  deleteShopComment,
  type ShopCommentItem,
  type ShopProductOption,
} from "./lib/shop-comments-api";

export default function ShopCommentsPage() {
  const [comments, setComments] = useState<ShopCommentItem[]>([]);
  const [products, setProducts] = useState<ShopProductOption[]>([]);
  const [idshopFilter, setIdshopFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const list = await getShopProductsForFilter();
      setProducts(list);
    } catch {
      setProducts([]);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const filter = idshopFilter.trim() ? idshopFilter : undefined;
      const list = await getShopCommentsFromProducts(filter);
      setComments(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در دریافت نظرات");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [idshopFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const uniqueProducts = new Set(comments.map((c) => String(c.idshop))).size;
  const shopCommentStats = [
    { title: "کل نظرات فروشگاه", value: comments.length, icon: "🛒", color: "bg-blue-50 text-blue-600" },
    { title: "محصولات دارای نظر", value: uniqueProducts, icon: "📦", color: "bg-emerald-50 text-emerald-600" },
    { title: "محصولات در فیلتر", value: products.length, icon: "📋", color: "bg-violet-50 text-violet-600" },
  ];

  const handleDelete = async (idshop: number | string, id: number | string) => {
    setDeletingId(`${idshop}-${id}`);
    setError(null);
    setSuccessMessage(null);
    try {
      await deleteShopComment(idshop, id);
      setComments((prev) => prev.filter((c) => String(c.id) !== String(id) || String(c.idshop) !== String(idshop)));
      setSuccessMessage("نظر حذف شد.");
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در حذف");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            کامنت فروشگاه
          </h1>
          <p className="text-sm text-gray-600">
            نمایش UserComments محصولات؛ حذف نظر از اینجا
          </p>
        </div>

        <AdminStatsCards items={shopCommentStats} />

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-gray-700">محصول (idshop):</label>
          <select
            value={idshopFilter}
            onChange={(e) => setIdshopFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-w-[180px] bg-white"
          >
            <option value="">همه محصولات</option>
            {products.map((p) => (
              <option key={String(p.id)} value={String(p.id)}>
                {p.name} ({p.id})
              </option>
            ))}
          </select>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" />
          </div>
        ) : (
          <ShopCommentsTable
            comments={comments}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </div>
    </AdminLayout>
  );
}
