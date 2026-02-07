"use client";

import Link from "next/link";
import { HiBuildingOffice, HiPaperAirplane } from "react-icons/hi2";

interface TravelCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const travelServices: TravelCard[] = [
  {
    icon: (
      <HiBuildingOffice className="text-4xl sm:text-5xl md:text-6xl text-gray-700" />
    ),
    title: "پرداخت هتل خارجی",
    description: "رزرو و پرداخت هتل با کارت ارزی",
    href: "/services",
  },
  {
    icon: (
      <HiPaperAirplane className="text-4xl sm:text-5xl md:text-6xl text-gray-700" />
    ),
    title: "خرید بلیت هواپیما",
    description: "خرید بلیت هواپیما با پرداخت ارزی",
    href: "/services",
  },
];

export default function TravelPayments() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 text-center mb-8 md:mb-12">
          پرداخت مسافرتی
        </h2>
        <p className="text-sm text-gray-600 text-center max-w-2xl mx-auto mb-8">
          پرداخت هتل و بلیت هواپیما با کارت ارزی از طریق مستر پریمیوم هاب؛ امن و با بهترین نرخ.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {travelServices.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="bg-white p-6 transition-opacity hover:opacity-80 cursor-pointer text-center block rounded-lg shadow-sm hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {service.title}
              </h3>
              <p className="text-xs text-gray-600">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
