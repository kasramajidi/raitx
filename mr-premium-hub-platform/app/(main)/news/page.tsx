import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsPageClient } from "./components";
import { getArticlesFromApi } from "./lib/articles-api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "اخبار و مقالات | مسترپریمیوم هاب",
  description:
    "آخرین اخبار و مقالات در زمینه طراحی سایت، برنامه‌نویسی، سئو و بازاریابی دیجیتال",
  keywords: [
    "اخبار",
    "مقالات",
    "طراحی سایت",
    "برنامه‌نویسی",
    "سئو",
    "بازاریابی دیجیتال",
    "مسترپریمیوم هاب",
  ],
  alternates: {
    canonical: "/news",
  },
};

export default async function NewsPage() {
  const apiArticles = await getArticlesFromApi();
  const articlesForClient = apiArticles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category,
    image: a.image || "/Images/gift-card-guide.jpg",
    date: a.date ?? "",
    comments: a.comments ?? 0,
    content: a.content ?? [],
  }));

  // دسته‌بندی‌ها مستقیماً از مقالات API (داینامیک)
  const categoriesFromArticles = Array.from(
    new Set(
      apiArticles
        .map((a) => a.category)
        .filter((c): c is string => c != null && String(c).trim() !== "")
    )
  ).sort((a, b) => a.localeCompare(b, "fa"));

  return (
    <main className="min-h-screen bg-gray-50 pt-4 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-[#ff5538] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <NewsPageClient articles={articlesForClient} categories={categoriesFromArticles} />
        </Suspense>
      </div>
    </main>
  );
}
