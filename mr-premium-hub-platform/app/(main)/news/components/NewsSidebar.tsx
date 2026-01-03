"use client";

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
    <aside className="lg:w-[190px] xl:w-[210px] w-full bg-white shadow-sm rounded-lg p-3 sm:p-4 md:p-5 h-fit border border-gray-200">
      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-3 sm:mb-4 text-right hidden sm:block">
        دسته‌بندی‌ها
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-0">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center gap-x-2 mb-0 sm:mb-3 md:mb-4 last:mb-0">
            <span className="block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ff5538' }}></span>
            <span
              onClick={(e) => e.preventDefault()}
              className="text-gray-600 hover:text-[#ff5538] transition-colors text-[11px] xs:text-xs sm:text-sm md:text-base line-clamp-1 cursor-not-allowed opacity-60"
            >
              {category}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}

