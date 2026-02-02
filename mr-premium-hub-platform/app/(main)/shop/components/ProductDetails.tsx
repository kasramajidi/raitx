"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart, type CartItem } from "../../context/CartContext";
import { WARRANTIES } from "../../cart/Components/constants/productConstants";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductFeatures from "./ProductFeatures";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import { products } from "./productsData";
import type { ShopProduct } from "../lib/shop-api";
import type { Product } from "./productsData";

type ProductLike = Product | ShopProduct;

interface ProductDetailsProps {
  initialProduct?: ProductLike | null;
}

export default function ProductDetails({ initialProduct }: ProductDetailsProps) {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const id = params?.id ? parseInt(params.id as string, 10) : null;
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedWarranty, setSelectedWarranty] = useState("");

  const product =
    initialProduct ??
    (id ? (products.find((p) => p.id === id) as ProductLike | undefined) : null) ??
    null;
  const productImages = product && product.image ? [product.image] : [];

  const isGiftCard = product?.productType === "gift_card";
  const isService = product?.productType === "service";
  const hasDenominations = isGiftCard && product?.denominations && product.denominations.length > 0;

  const warrantyPrice = !isGiftCard && !isService && selectedWarranty
    ? WARRANTIES.find((w) => w.id === selectedWarranty)?.price || 0
    : 0;
  const denominationPrice = hasDenominations && selectedWarranty
    ? product!.denominations!.find((d) => d.id === selectedWarranty)?.price ?? product!.price
    : product?.price ?? 0;
  const finalPrice = product
    ? isGiftCard
      ? (hasDenominations ? denominationPrice : product.price) * 1
      : (product.price + warrantyPrice) * 1
    : 0;

  const canAddToCart = product && (
    isService
      ? true
      : isGiftCard
        ? !hasDenominations || !!selectedWarranty
        : !!selectedColor && !!selectedWarranty
  );

  const handleAddToCart = () => {
    if (!product || !canAddToCart) return;
    const cartItem: CartItem = {
      product: product,
      quantity: 1,
      selectedColor: selectedColor,
      selectedWarranty: selectedWarranty,
      finalPrice: finalPrice,
    };
    addToCart(cartItem);
    router.push("/cart");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            محصول یافت نشد
          </h2>
          <button
            onClick={() => router.push("/shop")}
            className="bg-[#ff5538] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            بازگشت به فروشگاه
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <nav className="mb-4" aria-label="مسیر صفحه">
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <Link
              href="/"
              className="text-[#ff5538] hover:opacity-80 transition-opacity cursor-pointer"
            >
              خانه
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/shop"
              className="text-[#ff5538] hover:opacity-80 transition-opacity cursor-pointer"
            >
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </nav>

        <div className="w-full bg-white rounded-2xl p-4 sm:p-6 mt-8 shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
            <div className="order-1 lg:order-2 min-h-[280px] lg:min-h-[320px] flex items-center justify-center">
              <ProductImageGallery product={product} images={productImages} />
            </div>
            <div className="order-2 lg:order-1">
              <ProductInfo
                product={product}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedWarranty={selectedWarranty}
                setSelectedWarranty={setSelectedWarranty}
                finalPrice={finalPrice}
                handleAddToCart={handleAddToCart}
              />
            </div>
            <div className="order-3 lg:order-3">
              <ProductFeatures product={product} />
            </div>
          </div>
        </div>
        <ProductTabs product={product} />
        <div className="mt-16">
          <RelatedProducts
            currentProductId={product.id}
            category={product.category}
          />
        </div>
      </div>
    </div>
  );
}
