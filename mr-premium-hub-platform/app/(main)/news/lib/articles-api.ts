const API_BASE = "https://mrpremiumhub.org/api.ashx";

export interface ApiArticle {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  image: string;
  date: string;
  comments: number;
  content: string[];
  headings: string[];
  Relatedservice?: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
}

export interface ArticleDetail {
  id: number;
  title: string;
  slug: string;
  category: string;
  comments: number;
  date: string;
  image: string;
  content: string[];
  headings: string[];
  relatedService?: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
}

export async function getArticlesFromApi(): Promise<ApiArticle[]> {
  const res = await fetch(`${API_BASE}?action=Article&_t=${Date.now()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await res.json();
  if (Array.isArray(data)) return data;
  return [];
}

function toArticleDetail(a: ApiArticle): ArticleDetail {
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category ?? "—",
    comments: a.comments ?? 0,
    date: a.date ?? "",
    image: a.image ?? "/Images/gift-card-guide.jpg",
    content: a.content ?? [],
    headings: a.headings ?? [],
    relatedService: a.Relatedservice,
  };
}

export async function getArticleBySlugFromApi(slug: string): Promise<ArticleDetail | null> {
  const list = await getArticlesFromApi();
  const decoded = decodeURIComponent(slug);
  const article = list.find(
    (a) => a.slug === slug || a.slug === decoded || encodeURIComponent(a.slug) === slug
  );
  return article ? toArticleDetail(article) : null;
}

export async function getAllArticleSlugsFromApi(): Promise<string[]> {
  const list = await getArticlesFromApi();
  return list.map((a) => a.slug);
}

export async function getRelatedArticlesFromApi(
  currentSlug: string,
  limit: number = 10
): Promise<ArticleDetail[]> {
  const list = await getArticlesFromApi();
  const decoded = decodeURIComponent(currentSlug);
  return list
    .filter(
      (a) => a.slug !== currentSlug && a.slug !== decoded && encodeURIComponent(a.slug) !== currentSlug
    )
    .slice(0, limit)
    .map(toArticleDetail);
}

export function getUniqueCategoriesFromArticles(articles: ApiArticle[]): string[] {
  const set = new Set<string>();
  for (const a of articles) {
    if (a.category && a.category.trim()) set.add(a.category.trim());
  }
  return Array.from(set).sort();
}
