"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import AdminStatsCards from "../components/AdminStatsCards";
import ArticleCommentsTable from "./components/ArticleCommentsTable";
import {
  getArticleComments,
  getArticlesForFilter,
  deleteArticleComment,
  type ArticleCommentItem,
  type ArticleOption,
} from "./lib/article-comments-api";

export default function ArticleCommentsPage() {
  const [comments, setComments] = useState<ArticleCommentItem[]>([]);
  const [articles, setArticles] = useState<ArticleOption[]>([]);
  const [idarticleFilter, setIdarticleFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      const list = await getArticlesForFilter();
      setArticles(list);
    } catch {
      setArticles([]);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const filter = idarticleFilter.trim() ? idarticleFilter : undefined;
      const list = await getArticleComments(filter);
      setComments(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا در دریافت نظرات");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [idarticleFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const uniqueArticles = new Set(comments.map((c) => String(c.idarticle))).size;
  const articleCommentStats = [
    { title: "کل نظرات مقالات", value: comments.length, icon: "📄", color: "bg-blue-50 text-blue-600" },
    { title: "مقالات دارای نظر", value: uniqueArticles, icon: "📝", color: "bg-emerald-50 text-emerald-600" },
    { title: "مقالات در فیلتر", value: articles.length, icon: "📋", color: "bg-violet-50 text-violet-600" },
  ];

  const handleDelete = async (
    idarticle: number | string,
    id: number | string
  ) => {
    setDeletingId(`${idarticle}-${id}`);
    setError(null);
    setSuccessMessage(null);
    try {
      await deleteArticleComment(idarticle, id);
      setComments((prev) =>
        prev.filter(
          (c) =>
            String(c.id) !== String(id) ||
            String(c.idarticle) !== String(idarticle)
        )
      );
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
            کامنت مقاله‌ها
          </h1>
          <p className="text-sm text-gray-600">
            نمایش نظرات مقالات؛ حذف نظر از اینجا
          </p>
        </div>

        <AdminStatsCards items={articleCommentStats} />

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-gray-700">
            مقاله (idarticle):
          </label>
          <select
            value={idarticleFilter}
            onChange={(e) => setIdarticleFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-w-[180px] bg-white"
          >
            <option value="">همه مقالات</option>
            {articles.map((p) => (
              <option key={String(p.id)} value={String(p.id)}>
                {p.title} ({p.id})
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
          <ArticleCommentsTable
            comments={comments}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </div>
    </AdminLayout>
  );
}
