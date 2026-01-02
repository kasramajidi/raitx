import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi";

const articles = [
  {
    id: 1,
    title: "طراحی گرافیکی با هوش مصنوعی",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله است.",
    date: "۱۷ مهر ۱۴۰۲",
    image: "/Images/tp-best-mens-hairstyles.jpg",
  },
  {
    id: 2,
    title: "در طراحی سایت باید به چه نکاتی توجه کنیم ؟",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله است.",
    date: "۱۷ مهر ۱۴۰۲",
    image: "/Images/tp-best-mens-hairstyles.jpg",
  },
  {
    id: 3,
    title: "زبانهای برنامه نویسی تحت وب",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله است.",
    date: "۱۷ مهر ۱۴۰۲",
    image: "/Images/tp-best-mens-hairstyles.jpg",
  },
  {
    id: 4,
    title: "معرفی پنج ایده جدید برای طراحی Ui, Ux",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله است.",
    date: "۱۷ مهر ۱۴۰۲",
    image: "/Images/tp-best-mens-hairstyles.jpg",
  },
];

export default function ArticlesSection() {
  return (
    <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-28">
      <div className="flex flex-col items-center mb-4 sm:mb-6 md:mb-8">
        <div className="mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-full">
            <div className="w-1 h-1 rounded-full bg-orange-500"></div>
            <span className="text-[10px] sm:text-xs text-orange-600 font-medium">ما یک آژانس تبلیغاتی هستیم!</span>
          </div>
        </div>

        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center" style={{ color: '#1a3760' }}>
          آخرین مقالات به روز دنیا در حوزه دیجیتال مارکتینگ
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex h-full">
            <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-0 w-full">
              <div className="p-2 sm:p-3 md:p-4 flex flex-col justify-between order-2 md:order-2">
                <div>
                  <h3 className="text-xs sm:text-sm md:text-base font-bold mb-1.5 sm:mb-2 text-right" style={{ color: '#1a3760' }}>
                    {article.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 text-right leading-5">
                    {article.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[9px] sm:text-[10px] text-gray-500">{article.date}</span>
                  <button className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#ff5538] text-white rounded-lg text-[9px] sm:text-[10px] font-medium transition-opacity hover:opacity-90 cursor-pointer">
                    <HiArrowLeft className="text-xs" />
                    <span>ادامه مطلب</span>
                  </button>
                </div>
              </div>
              <div className="relative w-full h-[150px] sm:h-[180px] md:h-full overflow-hidden order-1 md:order-1">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover object-center"
                  quality={90}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

