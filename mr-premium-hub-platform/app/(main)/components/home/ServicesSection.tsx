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
    icon: <SiPaypal className="text-5xl md:text-6xl text-[#0070BA]" />,
    title: "PayPal To Rial",
    description: "نقد کردن درآمد ارزی",
  },
  {
    icon: <HiOutlineTemplate className="text-5xl md:text-6xl text-[#81B441]" />,
    title: "Theme Forest",
    description: "خرید قالب از تم فارست",
  },
  {
    icon: <SiDigitalocean className="text-5xl md:text-6xl text-[#0080FF]" />,
    title: "Digital ocean",
    description: "نقد کردن درآمد ارزی",
  },
  {
    icon: <SiPaypal className="text-5xl md:text-6xl text-[#0070BA]" />,
    title: "Pay Paypal Account",
    description: "پرداخت پی پال",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            خدمات پرداخت ارزی و پی پال
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            خدمات پرداخت ارزی و پی پال
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group text-center"
            >
              <div className="mb-4 flex items-center justify-center">
                {service.icon}
              </div>
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

