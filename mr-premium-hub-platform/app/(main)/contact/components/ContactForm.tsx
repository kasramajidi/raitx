export default function ContactForm() {
  return (
    <div className="order-1 lg:order-1 flex flex-col min-h-[350px] sm:min-h-[300px] md:h-[350px]">
      <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-3 sm:mb-4 text-right">
        سوالی دارید؟ بپرسید
      </h2>
      <form className="bg-white rounded-lg md:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm space-y-2.5 sm:space-y-3 flex-1 flex flex-col [&_input:focus]:border-[#ff5538] [&_textarea:focus]:border-[#ff5538]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <input
              type="text"
              placeholder="نام"
              required
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="آدرس ایمیل"
              required
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <input
              type="text"
              placeholder="موضوع پیام"
              required
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="شماره تماس"
              required
              className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent text-right"
            />
          </div>
        </div>
        <div className="flex-1 min-h-[100px] sm:min-h-[120px]">
          <textarea
            placeholder="پیام"
            required
            className="w-full h-full px-3 py-2 text-xs sm:text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ff5538] focus:border-transparent resize-none text-right"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full text-white text-xs sm:text-sm font-medium py-2 sm:py-2.5 px-4 sm:px-5 rounded-lg transition-opacity hover:opacity-90 mt-2 sm:mt-0"
          style={{ backgroundColor: '#ff5538' }}
        >
          ارسال
        </button>
      </form>
    </div>
  );
}

