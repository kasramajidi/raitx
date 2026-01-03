"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "./productsData";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { name, price, originalPrice, image, discount } = product;

  const discountPercentage =
    discount ||
    (originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);

  const handleProductClick = () => {
    router.push(`/shop/product/${product.id}`);
  };

  return (
    <div
      className="cursor-pointer h-full flex flex-col transition-opacity hover:opacity-80"
      onClick={handleProductClick}
    >
      <div className="relative grow mb-4">
        <div className="relative flex items-center justify-center w-full h-48 overflow-hidden bg-white md:h-64">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full md:w-16 md:h-16">
              <svg
                className="w-6 h-6 text-gray-400 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          )}
        </div>
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-[#ff5538] text-white px-2 py-1 text-xs font-medium">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <h3 className="mb-4 text-sm font-medium leading-tight text-right text-gray-900">
        {name}
      </h3>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
        <div className="text-left">
          {originalPrice && originalPrice > price ? (
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(originalPrice)} تومان
              </span>
              <span className="text-base font-semibold text-gray-900">
                {formatPrice(price)} تومان
              </span>
            </div>
          ) : (
            <span className="text-base font-semibold text-gray-900">
              {formatPrice(price)} تومان
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleProductClick();
          }}
          className="bg-[#ff5538] text-white py-2 px-4 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity shrink-0"
        >
          خرید محصول
        </button>
      </div>
    </div>
  );
}
