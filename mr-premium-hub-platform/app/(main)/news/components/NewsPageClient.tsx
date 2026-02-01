"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import NewsBanner from "./NewsBanner";
import FeaturedArticles from "./FeaturedArticles";
import LatestArticlesSection from "./LatestArticlesSection";
import NewsSidebar from "./NewsSidebar";

export interface ArticleForList {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  image: string;
  date: string;
  comments: number;
  content: string[];
}

interface NewsPageClientProps {
  articles: ArticleForList[];
  categories: string[];
}

export default function NewsPageClient({ articles, categories }: NewsPageClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category")?.trim() ?? "";

  const filteredArticles = useMemo(() => {
    if (!categoryParam) return articles;
    return articles.filter((a) => (a.category ?? "").trim() === categoryParam);
  }, [articles, categoryParam]);

  const featuredArticles = useMemo(
    () =>
      filteredArticles.slice(0, 5).map((a) => ({
        id: a.id,
        title: a.title,
        category: a.category ?? "—",
        comments: a.comments ?? 0,
        image: a.image || "/Images/gift-card-guide.jpg",
        link: `/news/${encodeURIComponent(a.slug)}`,
        slug: a.slug,
      })),
    [filteredArticles]
  );

  const latestArticles = useMemo(
    () =>
      filteredArticles.map((a) => ({
        id: a.id,
        title: a.title,
        description: (a.content?.[0] ?? "").substring(0, 150) || a.title,
        date: a.date ?? "",
        image: a.image || "/Images/gift-card-guide.jpg",
        link: `/news/${encodeURIComponent(a.slug)}`,
        slug: a.slug,
      })),
    [filteredArticles]
  );

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-3 order-2 lg:order-2">
          {filteredArticles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {categoryParam ? `مقاله‌ای در دسته «${categoryParam}» یافت نشد.` : "مقاله‌ای یافت نشد."}
            </p>
          ) : (
            <FeaturedArticles articles={featuredArticles} />
          )}
        </div>
        <aside className="lg:col-span-1 order-1 lg:order-1">
          <NewsSidebar categories={categories} selectedCategory={categoryParam || undefined} />
        </aside>
      </div>
      <div className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        {filteredArticles.length > 0 ? (
          <LatestArticlesSection articles={latestArticles} />
        ) : null}
      </div>
      <div className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <NewsBanner />
      </div>
    </>
  );
}
