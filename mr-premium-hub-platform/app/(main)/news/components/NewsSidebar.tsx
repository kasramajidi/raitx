import Link from "next/link";

const categories = [
  "طراحی گرافیک",
  "طراحی سایت",
  "طراحی Ui , Ux",
  "برنامه نویسی",
  "بازاریابی دیجیتال",
  "آموزش سئو",
];

export default function NewsSidebar() {
  return (
    <aside className="lg:w-[190px] w-full bg-white shadow-sm rounded-lg p-3 sm:p-4 h-fit">
      {categories.map((category, index) => (
        <div key={index} className="flex items-center gap-x-2 mb-4 sm:mb-5 md:mb-6 last:mb-0">
          <span className="block w-1 h-1 rounded-full" style={{ backgroundColor: '#ff5538' }}></span>
          <Link href={`/news/category/${category}`} className="text-gray-500 text-xs sm:text-sm hover:text-[#ff5538] transition-colors">
            {category}
          </Link>
        </div>
      ))}
    </aside>
  );
}

