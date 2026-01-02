import type { Metadata } from "next";
import {
  AboutHero,
  StatsSection,
  TeamSection,
  TestimonialsSection,
  ArticlesSection,
} from "./components";

export const metadata: Metadata = {
  title: "درباره ما",
  description: "همه چیز درباره مسترپریمیوم هاب - تجربه دیجیتال مارکتینگ",
  keywords: [
    "درباره ما",
    "شرکت",
    "دیجیتال مارکتینگ",
    "مسترپریمیوم هاب",
  ],
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <AboutHero />
        <StatsSection />
        <TeamSection />
        <TestimonialsSection />
        <ArticlesSection />
      </div>
    </main>
  );
}

