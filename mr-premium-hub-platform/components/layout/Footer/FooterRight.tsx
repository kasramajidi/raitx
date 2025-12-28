"use client";

import Image from "next/image";

export default function FooterRight() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-32 h-12 md:w-40 md:h-16">
        <Image
          src="/Images/Logo/logo stock copy 2.png"
          alt="لوگو شرکت"
          fill
          className="object-contain"
        />
      </div>

      <div className="text-center space-y-1 hidden md:block">
        {[1, 2, 3, 4].map((item) => (
          <p
            key={item}
            className="text-xs md:text-sm text-gray-400 leading-relaxed"
          >
            لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم
          </p>
        ))}
      </div>
    </div>
  );
}

