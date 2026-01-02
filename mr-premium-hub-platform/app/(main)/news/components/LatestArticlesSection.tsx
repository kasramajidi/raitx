import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
  slug: string;
}

interface LatestArticlesSectionProps {
  articles: Article[];
}

export default function LatestArticlesSection({ articles }: LatestArticlesSectionProps) {
  return (
    <>
      <section className="flex flex-col items-center justify-center mt-16 sm:mt-20 md:mt-24 lg:mt-28 mb-4 sm:mb-6 md:mb-8">
        <div className="mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-full">
            <div className="w-1 h-1 rounded-full bg-orange-500"></div>
            <span className="text-[10px] sm:text-xs text-orange-600 font-medium">مقالات</span>
          </div>
        </div>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center mb-4 sm:mb-6 md:mb-8" style={{ color: '#1a3760' }}>
          آخرین اخبار سایت
        </h2>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-16 lg:mb-24">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${encodeURIComponent(article.slug)}`}
            className="flex flex-col sm:flex-row hover:cursor-pointer transition-transform duration-300 hover:-translate-y-2 h-full bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden"
          >
            <div className="mt-[-10px] sm:w-[36%] relative h-[150px] sm:h-[180px] md:h-[195px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="rounded-2xl object-cover object-center"
                quality={90}
              />
            </div>
            <div className="sm:w-[65%] p-3 sm:p-4 flex flex-col justify-between">
              <div>
                <p className="text-[10px] sm:text-[11px] text-gray-600 mb-2">{article.date}</p>
                <span className="text-xs sm:text-sm md:text-[15px] my-2 sm:my-3 block line-clamp-2 hover:text-[#ff5538] transition-colors" style={{ color: '#1a3760' }}>
                  {article.title}
                </span>
                <p className="text-[11px] sm:text-xs md:text-[13px] text-gray-400 leading-5 sm:leading-6 line-clamp-2 text-right">
                  {article.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 mt-3 sm:mt-4 text-[10px] sm:text-xs text-[#ff5538] hover:gap-2 transition-all">
                <span>مشاهده بیشتر</span>
                <HiArrowLeft className="text-xs rotate-180" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

