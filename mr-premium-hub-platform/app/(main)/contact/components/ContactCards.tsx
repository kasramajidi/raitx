import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2 md:gap-3 w-full">
      <div className="bg-white rounded-lg md:rounded-xl p-2.5 sm:p-2 md:p-3 shadow-md hover:shadow-lg transition-shadow h-auto min-h-[80px] sm:min-h-0">
        <div className="flex flex-col items-center text-center mb-1 sm:mb-1.5">
          <div className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center mb-1 sm:mb-1.5 shrink-0" style={{ backgroundColor: '#ff5538' }}>
            <HiPhone className="text-white text-xs sm:text-[10px] md:text-xs" />
          </div>
          <h2 className="text-[11px] sm:text-[10px] md:text-xs font-bold text-gray-800 leading-tight">شماره های تماس</h2>
        </div>
        <div className="space-y-0.5 sm:space-y-0.5 text-gray-600 text-[10px] sm:text-[9px] md:text-[10px] text-center mt-1">
          <p className="break-all">۰۹۱۲-۱۲۳۴۵۶#</p>
          <p className="break-all">۰۹۱۲-۹۸۷۶۵۴#</p>
        </div>
      </div>

      <div className="bg-white rounded-lg md:rounded-xl p-2.5 sm:p-2 md:p-3 shadow-md hover:shadow-lg transition-shadow h-auto min-h-[80px] sm:min-h-0">
        <div className="flex flex-col items-center text-center mb-1 sm:mb-1.5">
          <div className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center mb-1 sm:mb-1.5 shrink-0" style={{ backgroundColor: '#ff5538' }}>
            <HiMail className="text-white text-xs sm:text-[10px] md:text-xs" />
          </div>
          <h2 className="text-[11px] sm:text-[10px] md:text-xs font-bold text-gray-800 leading-tight">آدرس ایمیل</h2>
        </div>
        <div className="space-y-0.5 sm:space-y-0.5 text-gray-600 text-[10px] sm:text-[9px] md:text-[10px] text-center mt-1">
          <p className="break-all text-[9px] sm:text-[9px]">yoursite@info.com</p>
          <p className="break-all text-[9px] sm:text-[9px]">yoursite@gmail.com</p>
        </div>
      </div>

      <div className="bg-white rounded-lg md:rounded-xl p-2.5 sm:p-2 md:p-3 shadow-md hover:shadow-lg transition-shadow h-auto min-h-[80px] sm:min-h-0">
        <div className="flex flex-col items-center text-center mb-1 sm:mb-1.5">
          <div className="w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center mb-1 sm:mb-1.5 shrink-0" style={{ backgroundColor: '#ff5538' }}>
            <HiLocationMarker className="text-white text-xs sm:text-[10px] md:text-xs" />
          </div>
          <h2 className="text-[11px] sm:text-[10px] md:text-xs font-bold text-gray-800 leading-tight">نشانی ها</h2>
        </div>
        <div className="space-y-0.5 sm:space-y-0.5 text-gray-600 text-[10px] sm:text-[9px] md:text-[10px] text-center mt-1">
          <p className="break-word leading-tight">یزد ، خیابان خوبان</p>
          <p className="break-word leading-tight">کوچه طراحان سایت</p>
        </div>
      </div>
    </div>
  );
}

