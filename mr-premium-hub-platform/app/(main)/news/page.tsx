import type { Metadata } from "next";
import {
  NewsBanner,
  FeaturedArticles,
  LatestArticlesSection,
  NewsSidebar,
} from "./components";
import { featuredArticles, latestArticles } from "./components/data";

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

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-4 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-3 order-2 lg:order-2">
            <FeaturedArticles articles={featuredArticles} />
          </div>
          <aside className="lg:col-span-1 order-1 lg:order-1">
            <NewsSidebar />
          </aside>
        </div>
        <div className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
          <LatestArticlesSection articles={latestArticles} />
        </div>
        <div className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-10">
          <NewsBanner />
        </div>
      </div>
    </main>
  );
}
