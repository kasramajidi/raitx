"use client";

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

interface CartIconProps {
  cartCount?: number;
}

export default function CartIcon({ cartCount = 0 }: CartIconProps) {
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-200 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
      aria-label="سبد خرید"
    >
      <FiShoppingCart className="text-lg min-[500px]:text-xl sm:text-2xl md:text-2xl" />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] min-[500px]:text-xs font-semibold rounded-full w-4 h-4 min-[500px]:w-5 min-[500px]:h-5 flex items-center justify-center min-w-[16px] min-[500px]:min-w-[20px]">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
}

