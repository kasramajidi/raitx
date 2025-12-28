"use client";

import { HiBuildingOffice, HiPaperAirplane } from "react-icons/hi2";

interface TravelCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const travelServices: TravelCard[] = [
  {
    icon: <HiBuildingOffice className="text-4xl sm:text-5xl md:text-6xl text-gray-700" />,
    title: "پرداخت هتل خارجی",
    description: "",
  },
  {
    icon: <HiPaperAirplane className="text-4xl sm:text-5xl md:text-6xl text-gray-700" />,
    title: "خرید بلیت هواپیما خارجی",
    description: "",
  },
];

export default function TravelPayments() {
  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8 md:mb-12">
          پرداخت مسافرتی
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-3xl mx-auto">
          {travelServices.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group text-center"
            >
              <div className="mb-4 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

