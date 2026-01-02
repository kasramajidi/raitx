import Image from "next/image";
import Link from "next/link";

interface FeaturedArticle {
  id: number;
  title: string;
  category: string;
  comments: number;
  image: string;
  link: string;
  slug: string;
}

interface FeaturedArticlesProps {
  articles: FeaturedArticle[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-5 w-full">
        {articles.slice(0, 2).map((article) => (
          <Link
            key={article.id}
            href={`/news/${encodeURIComponent(article.slug)}`}
            className="flex flex-col items-center justify-end py-4 sm:py-5 sm:w-[calc((100%-1rem)/2)] w-full h-[150px] sm:h-[180px] md:h-[200px] rounded-lg bg-gradient-to-br from-orange-300 to-orange-400 text-gray-800 relative overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="absolute inset-0 opacity-20">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-end w-full px-3 sm:px-4">
              <div className="flex gap-x-2 sm:gap-x-3 text-xs sm:text-sm mb-2">
                <div className="flex items-center gap-1">
                  <span>{article.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{article.comments} دیدگاه</span>
                </div>
              </div>
              <span className="text-sm sm:text-base tracking-tighter text-center hover:underline line-clamp-2">
                {article.title}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {articles.slice(2).map((article) => (
          <Link
            key={article.id}
            href={`/news/${encodeURIComponent(article.slug)}`}
            className="flex flex-col items-center justify-end py-4 sm:py-5 sm:w-[32%] w-full h-[150px] sm:h-[180px] md:h-[200px] rounded-lg bg-gradient-to-br from-orange-300 to-orange-400 text-gray-800 relative overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="absolute inset-0 opacity-20">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-end w-full px-3 sm:px-4">
              <div className="flex gap-x-2 sm:gap-x-3 text-xs sm:text-sm mb-2">
                <div className="flex items-center gap-1">
                  <span>{article.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{article.comments} دیدگاه</span>
                </div>
              </div>
              <span className="text-sm sm:text-base tracking-tighter text-center hover:underline line-clamp-2">
                {article.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

