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
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">
          پرداخت هزینه تعیین وقت سفارت و مهاجرت{" "}
          <Link
            href="#"
            className="text-red-600 hover:text-red-700 underline"
          >
            (جزییات بیشتر)
          </Link>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visaServices.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group text-center"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

