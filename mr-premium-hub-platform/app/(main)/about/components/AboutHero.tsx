import Image from "next/image";
import Link from "next/link";
import { HiPlay } from "react-icons/hi";

export default function AboutHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
      <div className="order-2 lg:order-1 relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden flex items-center justify-center">
        <Image
          src="/piic2.png"
          alt="درباره شرکت"
          fill
          className="object-contain object-center"
          quality={100}
          priority
        />
      </div>

      <div className="order-1 lg:order-2 flex flex-col h-full">
        <div className="mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-full">
            <div className="w-1 h-1 rounded-full bg-orange-500"></div>
            <span className="text-[10px] sm:text-xs text-orange-600 font-medium">تجربه دیجیتال</span>
          </div>
        </div>

        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1.5 sm:mb-2 md:mb-3 text-right leading-tight" style={{ color: '#1a3760' }}>
          همه چیز درباره شرکت دیجیتال مارکتینگ
        </h1>

        <div className="text-right text-gray-600 text-[10px] sm:text-xs md:text-sm leading-5 sm:leading-6 md:leading-7 mb-3 sm:mb-4 md:mb-6">
          <p className="text-justify sm:text-right">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها است.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-start sm:items-center">
          <button
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-[#ff5538] text-white rounded-lg text-xs sm:text-sm font-medium transition-opacity hover:opacity-90 cursor-pointer"
          >
            <HiPlay className="text-white text-sm" />
            <span>ویدئو معرفی</span>
          </button>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-[#ff5538] text-[#ff5538] rounded-lg text-xs sm:text-sm font-medium transition-all hover:bg-[#ff5538] hover:text-white cursor-pointer"
          >
            تماس با شرکت
          </Link>
        </div>
      </div>
    </div>
  );
}

