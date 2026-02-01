"use client";

import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/AdminLayout";
import ArticlesTable from "./components/ArticlesTable";
import ArticleForm, { type ArticleFormData } from "./components/ArticleForm";
import { revalidateNews } from "./actions";
import { getArticles, createArticle, updateArticle, deleteArticle, type ApiArticle } from "./lib/article-api";

const ARTICLE_OVERRIDES_KEY = "mrph-article-overrides";

function getOverrides(): Record<string, ApiArticle> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(ARTICLE_OVERRIDES_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function setOverride(id: number, article: ApiArticle): void {
  const o = getOverrides();
  o[String(id)] = article;
  localStorage.setItem(ARTICLE_OVERRIDES_KEY, JSON.stringify(o));
}

function removeOverride(id: number): void {
  const o = getOverrides();
  delete o[String(id)];
  localStorage.setItem(ARTICLE_OVERRIDES_KEY, JSON.stringify(o));
}

export interface ArticleRow {
  id: string;
  title: string;
  category: string;
  author: string;
  views: number;
  status: string;
  date: string;
}

function mapApiToRow(a: ApiArticle): ArticleRow {
  return {
    id: String(a.id),
    title: a.title ?? "",
    category: a.category ?? "—",
    author: "—",
    views: a.comments ?? 0,
    status: "منتشر شده",
    date: a.date ?? "",
  };
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ApiArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchArticles = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true);
      setFetchError(null);
    }
    try {
      const list = await getArticles();
      const overrides = getOverrides();
      const merged = (Array.isArray(list) ? list : []).map((a) => overrides[String(a.id)] ?? a);
      setArticles(merged);
    } catch (err) {
      if (!silent) setFetchError(err instanceof Error ? err.message : "خطا در دریافت لیست مقالات");
      setArticles((prev) => (silent ? prev : []));
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleAdd = () => {
    setEditingArticle(null);
    setShowForm(true);
  };

  const handleEdit = (row: ArticleRow) => {
    const apiArticle = articles.find((a) => String(a.id) === row.id) ?? null;
    setEditingArticle(apiArticle);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این مقاله اطمینان دارید؟")) return;
    setDeleteError(null);
    setDeletingId(id);
    const slug = articles.find((a) => String(a.id) === id)?.slug;
    try {
      await deleteArticle(Number(id));
      removeOverride(Number(id));
      await fetchArticles(true);
      await revalidateNews(slug ?? undefined);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "خطا در حذف مقاله");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSave = async (formData: ArticleFormData) => {
    if (saving) return;
    setSaving(true);
    try {
      if (editingArticle) {
        const contentArr = formData.content ? formData.content.split("\n").filter(Boolean) : editingArticle.content ?? [];
        const headingsArr = formData.headings?.trim()
          ? formData.headings.trim().split("\n").filter(Boolean)
          : editingArticle.headings ?? [];
        const slugVal = (formData.slug?.trim() || formData.title.replace(/\s+/g, "-")).trim();
        const updated: ApiArticle = {
          ...editingArticle,
          title: formData.title,
          slug: slugVal,
          category: formData.category || null,
          image: formData.image?.trim() || editingArticle.image,
          date: formData.date?.trim() || editingArticle.date,
          content: contentArr,
          headings: headingsArr,
        };
        await updateArticle({ id: editingArticle.id, fullArticle: updated });
        removeOverride(editingArticle.id);
        await new Promise((r) => setTimeout(r, 400));
        await fetchArticles(true);
        const newSlug = updated.slug ?? editingArticle.slug ?? undefined;
        await revalidateNews(newSlug);
        if (editingArticle.slug && editingArticle.slug !== newSlug) {
          await revalidateNews(editingArticle.slug);
        }
      } else {
        const contentLines = formData.content?.trim() ? formData.content.trim().split("\n").filter(Boolean) : [""];
        const headingsLines = formData.headings?.trim() ? formData.headings.trim().split("\n").filter(Boolean) : [];
        const slug = (formData.slug ?? formData.title.replace(/\s+/g, "-")).trim() || formData.title.replace(/\s+/g, "-");
        const dateStr = formData.date?.trim() || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
        const rs = formData.relatedService;
        const relatedService =
          rs && (rs.title || rs.link)
            ? { title: rs.title || "", description: rs.description || "", image: rs.image || "/Images/shop-banner.jpg", link: rs.link || "/shop" }
            : undefined;
        const created = await createArticle({
          title: formData.title,
          slug,
          category: formData.category,
          image: formData.image?.trim() || "/Images/gift-card-guide.jpg",
          date: dateStr,
          comments: 0,
          content: contentLines,
          headings: headingsLines,
          relatedService,
        });
        const newArticle: ApiArticle = {
          id: created.id,
          title: formData.title,
          slug,
          category: formData.category || null,
          image: formData.image?.trim() || "/Images/gift-card-guide.jpg",
          date: dateStr,
          comments: 0,
          content: contentLines,
          headings: headingsLines,
          Relatedservice: relatedService,
        };
        setArticles((prev) => [newArticle, ...prev]);
        setOverride(created.id, newArticle);
        await revalidateNews();
      }
      setShowForm(false);
      setEditingArticle(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "خطا در ذخیره مقاله");
    } finally {
      setSaving(false);
    }
  };

  const rows: ArticleRow[] = articles.map(mapApiToRow);
  const filteredArticles = rows.filter(
    (row) =>
      (row.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              مدیریت مقالات
            </h1>
            <p className="text-sm text-gray-500">
              افزودن مقاله جدید، ویرایش و حذف مقالات موجود
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 bg-[#ff5538] text-white px-6 py-2.5 text-sm font-medium rounded-xl hover:bg-[#ff6b52] hover:shadow-lg hover:shadow-[#ff5538]/25 transition-all duration-200 shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            افزودن مقاله جدید
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="جستجو در لیست مقالات (عنوان یا دسته‌بندی)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 bg-white rounded-xl border border-gray-200 pl-4 pr-12 text-right text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5538]/20 focus:border-[#ff5538] transition-all text-sm shadow-sm"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {deleteError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-700 text-sm">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white text-lg">!</span>
            <div className="flex-1">
              <p className="font-medium mb-0.5">علت خطا در حذف مقاله:</p>
              <p>{deleteError}</p>
              <button
                onClick={() => setDeleteError(null)}
                className="mt-2 text-red-600 hover:underline text-sm"
              >
                بستن
              </button>
            </div>
          </div>
        )}

        {fetchError && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-700 text-sm">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white text-lg">!</span>
            <div className="flex-1">
              <p className="font-medium mb-0.5">علت خطا در دریافت لیست مقالات:</p>
              <p>{fetchError}</p>
              <button
                onClick={() => fetchArticles()}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-medium text-sm transition-colors"
              >
                تلاش مجدد
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 flex items-center justify-center shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-[#ff5538]/30 border-t-[#ff5538] rounded-full animate-spin" />
              <p className="text-sm text-gray-500">در حال بارگذاری لیست مقالات از سرور...</p>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ff5538]/60 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-[#ff5538]/60 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-[#ff5538]/60 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        ) : (
          <ArticlesTable
            articles={filteredArticles}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
            editLoading={saving}
          />
        )}

        {showForm && (
          <ArticleForm
            key={editingArticle ? `edit-${editingArticle.id}` : "add"}
            article={
              editingArticle
                ? {
                    id: String(editingArticle.id),
                    title: editingArticle.title,
                    category: editingArticle.category ?? "",
                    content: editingArticle.content?.join("\n") ?? "",
                    status: "منتشر شده",
                    slug: editingArticle.slug ?? "",
                    image: editingArticle.image ?? "",
                    date: editingArticle.date ?? "",
                    headings: editingArticle.headings?.join("\n") ?? "",
                    relatedService: editingArticle.Relatedservice,
                  }
                : undefined
            }
            onClose={() => {
              setShowForm(false);
              setEditingArticle(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
}
