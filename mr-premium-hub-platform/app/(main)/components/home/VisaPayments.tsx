"use client";

import Link from "next/link";

interface VisaCard {
  title: string;
  description: string;
}

const visaServices: VisaCard[] = [
  {
    title: "MY CIC",
    description: "سفارت کانادا",
  },
  {
    title: "AUSTRALIA",
    description: "سفارت استرالیا",
  },
  {
    title: "MRV FEE",
    description: "سفارت آمریکا",
  },
  {
    title: "SEVIS FEE",
    description: "سویس فی",
  },
  {
    title: "SEVIS FEE",
    description: "سویس فی",
  },
  {
    title: "UK VISA",
    description: "سفارت انگلستان",
  },
];

export default function VisaPayments() {
  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8 md:mb-12 px-2">
          پرداخت هزینه تعیین وقت سفارت و مهاجرت{" "}
          <Link
            href="#"
            className="text-red-600 hover:text-red-700 underline text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
          >
            (جزییات بیشتر)
          </Link>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {visaServices.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group text-center"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

