import Link from "next/link";
import { FaWhatsapp, FaTelegram, FaYoutube, FaFacebook } from "react-icons/fa";

export default function MapSection() {
  return (
    <div className="order-2 lg:order-2 min-h-[300px] sm:min-h-[300px] md:h-[350px] flex flex-col justify-between gap-3 sm:gap-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 flex-wrap mb-2 sm:mb-3">
        <h2 className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-600 text-right w-full sm:w-auto">
          ما را در شبکه های اجتماعی دنبال کنید
        </h2>
        <div className="flex gap-1.5 flex-wrap">
          <Link
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ff5538' }}
          >
            <FaWhatsapp className="text-white text-xs sm:text-[10px] md:text-xs" />
          </Link>
          <Link
            href="https://t.me/your-channel"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ff5538' }}
          >
            <FaTelegram className="text-white text-xs sm:text-[10px] md:text-xs" />
          </Link>
          <Link
            href="https://youtube.com/your-channel"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ff5538' }}
          >
            <FaYoutube className="text-white text-xs sm:text-[10px] md:text-xs" />
          </Link>
          <Link
            href="https://facebook.com/your-page"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ff5538' }}
          >
            <FaFacebook className="text-white text-xs sm:text-[10px] md:text-xs" />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm flex-1 min-h-[200px] sm:min-h-[250px] md:min-h-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280303808788!2d53.68854631525847!3d35.68919738019432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3efb69198ad00001%3A0x2c0e5b1b5c5c5c5c!2sTehran%2C%20Iran!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-0"
        ></iframe>
      </div>
    </div>
  );
}

