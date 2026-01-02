import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from "../components/data";
import { HiLocationMarker, HiArrowLeft } from "react-icons/hi";
import { FaTelegram, FaWhatsapp, FaTwitter, FaFacebook } from "react-icons/fa";
import TableOfContents from "./components/TableOfContents";
import RelatedArticlesCarousel from "./components/RelatedArticlesCarousel";
import CommentForm from "./components/CommentForm";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: "مقاله یافت نشد",
    };
  }

  return {
    title: article.title,
    description: article.content[0]?.substring(0, 160) || "",
    keywords: [article.category, article.title],
    alternates: {
      canonical: `/news/${encodeURIComponent(article.slug)}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, 10);

  return (
    <main className="min-h-screen bg-gray-50 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <section className="flex flex-col lg:flex-row justify-between gap-x-3">
          <div className="bg-white rounded-xl w-full lg:w-[78%] shadow-cyan-100 p-4 sm:p-6 border border-gray-200">
            <Image
              src={article.image}
              alt={article.title}
              width={10000}
              height={1000}
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-xl object-cover"
            />
            
            <h4 className="mt-3 bg-gradient-to-b from-purple-500 to-blue-500 text-[19px] block text-transparent bg-clip-text font-bold">
              {article.title}
            </h4>
            
            <div className="flex items-center justify-between mt-4 mb-6 border-b border-b-gray-200 pb-4">
              <div className="text-gray-300 flex items-center gap-x-3 text-[12px]">
                <div className="flex items-center">
                  <HiLocationMarker className="text-sm" />
                  <span className="inline-block">{article.date}</span>
                </div>
                <div className="flex items-center">
                  <HiArrowLeft className="rotate-180 text-sm" />
                  <span className="inline-block">{article.comments} دیدگاه</span>
                </div>
              </div>
              <div className="text-xs flex items-center gap-1">
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(`https://yoursite.com/news/${slug}`)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegram className="text-[14px] mx-[2px] text-gray-400 hover:text-[#ff5538] cursor-pointer transition-all" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article.title + ' https://yoursite.com/news/' + slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-[14px] mx-[2px] text-gray-400 hover:text-[#ff5538] cursor-pointer transition-all" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://yoursite.com/news/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-[14px] mx-[2px] text-gray-400 hover:text-[#ff5538] cursor-pointer transition-all" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://yoursite.com/news/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-[14px] mx-[2px] text-gray-400 hover:text-[#ff5538] cursor-pointer transition-all" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              {article.content.slice(0, 3).map((paragraph, index) => (
                <p key={index} className="text-gray-500 leading-6 text-justify text-[13px]">
                  {paragraph}
                </p>
              ))}
            </div>

            {article.headings.map((heading, index) => {
              const contentStartIndex = 3 + (index * 2);
              const headingContent = article.content.slice(contentStartIndex, contentStartIndex + 2);

              return (
                <div key={index} id={`heading-${index}`} className="mt-5">
                  <h3 className="text-[22px] my-5 font-bold">{heading}</h3>
                  {headingContent.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-500 leading-6 text-justify text-[13px] mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="w-full lg:w-[22%]">
            <div className="sticky top-2 space-y-6">
              <TableOfContents headings={article.headings} />
              <RelatedArticlesCarousel articles={relatedArticles} />
            </div>
          </div>
        </section>

        <CommentForm />
      </div>
    </main>
  );
}

