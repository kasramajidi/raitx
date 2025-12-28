"use client";

import { SiPaypal, SiDigitalocean } from "react-icons/si";
import { HiOutlineTemplate } from "react-icons/hi";

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: ServiceCard[] = [
  {
    icon: <SiPaypal className="text-4xl sm:text-5xl md:text-6xl text-[#0070BA]" />,
    title: "PayPal To Rial",
    description: "نقد کردن درآمد ارزی",
  },
  {
    icon: <HiOutlineTemplate className="text-4xl sm:text-5xl md:text-6xl text-[#81B441]" />,
    title: "Theme Forest",
    description: "خرید قالب از تم فارست",
  },
  {
    icon: <SiDigitalocean className="text-4xl sm:text-5xl md:text-6xl text-[#0080FF]" />,
    title: "Digital ocean",
    description: "نقد کردن درآمد ارزی",
  },
  {
    icon: <SiPaypal className="text-4xl sm:text-5xl md:text-6xl text-[#0070BA]" />,
    title: "Pay Paypal Account",
    description: "پرداخت پی پال",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            خدمات پرداخت ارزی و پی پال
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            خدمات پرداخت ارزی و پی پال
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group text-center"
            >
              <div className="mb-4 flex items-center justify-center">
                {service.icon}
              </div>
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

