"use client";

import { HiBuildingOffice, HiPaperAirplane } from "react-icons/hi2";

interface TravelCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const travelServices: TravelCard[] = [
  {
    icon: <HiBuildingOffice className="text-5xl md:text-6xl text-gray-700" />,
    title: "پرداخت هتل خارجی",
    description: "",
  },
  {
    icon: <HiPaperAirplane className="text-5xl md:text-6xl text-gray-700" />,
    title: "خرید بلیت هواپیما خارجی",
    description: "",
  },
];

export default function TravelPayments() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">
          پرداخت مسافرتی
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          {travelServices.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group text-center"
            >
              <div className="mb-4 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

