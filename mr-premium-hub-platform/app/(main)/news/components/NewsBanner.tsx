import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

export default function NewsBanner() {
  return (
    <section className="mt-8 sm:mt-10 md:mt-12">
      <div className="relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ff5538]/10 to-transparent rounded-full -mr-12 -mt-12"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#1a3760]/10 to-transparent rounded-full -ml-10 -mb-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-[#ff5538]/5 to-[#1a3760]/5 rounded-full blur-2xl"></div>
        
        <div className="relative px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-50 to-orange-100 rounded-full mb-3 sm:mb-4 border border-orange-200/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff5538] animate-pulse"></div>
              <span className="text-[10px] sm:text-xs text-[#ff5538] font-semibold">همکاری با ما</span>
            </div>
            
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 leading-tight" style={{ color: '#1a3760' }}>
              آماده شروع پروژه بعدی خود هستید؟
            </h3>
            
            <p className="text-xs sm:text-sm text-gray-600 mb-5 sm:mb-6 max-w-xl mx-auto leading-relaxed">
              با ما تماس بگیرید و از خدمات حرفه‌ای ما بهره‌مند شوید
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#ff5538] to-[#ff7744] text-white rounded-lg text-xs sm:text-sm font-semibold shadow-md shadow-[#ff5538]/20 hover:shadow-lg hover:shadow-[#ff5538]/25 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
              >
                <span>تماس با ما</span>
                <HiArrowLeft className="text-sm rotate-180 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-2 sm:py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg text-xs sm:text-sm font-semibold hover:border-[#1a3760] hover:text-[#1a3760] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>درباره ما</span>
                <HiArrowLeft className="text-sm rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

