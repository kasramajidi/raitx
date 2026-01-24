"use client";

import { Service } from "../../components/servicesData";
import { HiUsers, HiCheckCircle, HiStar, HiClock, HiGlobe } from "react-icons/hi";

interface ServiceStatsProps {
  service: Service;
}

const stats = [
  {
    icon: <HiUsers className="text-xl sm:text-2xl" />,
    value: "5,000+",
    label: "مشتری راضی",
    color: "text-[#ff5538]",
    bgColor: "bg-[#ff5538]/10",
  },
  {
    icon: <HiCheckCircle className="text-xl sm:text-2xl" />,
    value: "98%",
    label: "رضایت مشتری",
    color: "text-white",
    bgColor: "bg-white/20",
  },
  {
    icon: <HiStar className="text-xl sm:text-2xl" />,
    value: "4.9",
    label: "امتیاز کاربران",
    color: "text-[#ff5538]",
    bgColor: "bg-[#ff5538]/10",
  },
];

const simSpecs = [
  {
    icon: <HiClock className="text-xl sm:text-2xl" />,
    value: "۲ تا ۴ روز کاری",
    label: "مدت زمان تحویل",
    color: "text-[#1a3760]",
    bgColor: "bg-[#1a3760]/10",
  },
  {
    icon: <HiGlobe className="text-xl sm:text-2xl" />,
    value: "پوشش چندکشوری",
    label: "پوشش سرویس",
    color: "text-[#ff5538]",
    bgColor: "bg-[#ff5538]/10",
  },
  {
    icon: <HiCheckCircle className="text-xl sm:text-2xl" />,
    value: "قابل سفارش",
    label: "وضعیت",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

export default function ServiceStats({ service }: ServiceStatsProps) {
  const isInternationalSim = service.id === "international-sim";
  const items = isInternationalSim ? simSpecs : stats;

  return (
    <div
      className={`rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 mb-6 ${
        isInternationalSim
          ? "bg-white shadow-sm text-gray-900"
          : "bg-gradient-to-br from-[#1a3760] to-[#2a4a7a] shadow-lg text-white"
      }`}
    >
      <h2
        className={`text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 text-right ${
          isInternationalSim ? "text-gray-900" : "text-white"
        }`}
      >
        {isInternationalSim ? "مشخصات سرویس" : `آمار و ارقام ${service.label}`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {items.map((stat, index) => (
          <div
            key={index}
            className={`rounded-lg p-3 sm:p-4 text-center transition-all duration-200 ${
              isInternationalSim
                ? "bg-gray-50 border border-gray-100"
                : "bg-white/10 backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            <div className={`${stat.bgColor} ${stat.color} w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div
              className={`font-bold mb-1 ${
                isInternationalSim
                  ? "text-sm sm:text-base md:text-lg text-gray-900"
                  : "text-lg sm:text-xl md:text-2xl"
              }`}
            >
              {stat.value}
            </div>
            <div
              className={`text-[10px] sm:text-xs ${
                isInternationalSim ? "text-gray-600" : "text-white/90"
              }`}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

