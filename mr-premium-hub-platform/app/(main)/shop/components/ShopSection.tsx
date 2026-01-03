"use client";

import React from "react";
import { useFilters } from "../../context/FilterContext";
import SearchFilter from "./filters/SearchFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import CategoryFilter from "./filters/CategoryFilter";
import BrandFilter from "./filters/BrandFilter";
import ProductGrid from "./ProductGrid";
import { products } from "./productsData";

export default function ShopSection() {
  const { applyFilters, appliedFilters } = useFilters();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        <aside className="lg:col-span-1" aria-label="فیلترهای فروشگاه">
          <div className="space-y-6 sticky top-4">
            <SearchFilter />
            <PriceRangeFilter />
            <CategoryFilter />
            <BrandFilter />
            <button
              type="button"
              onClick={applyFilters}
              aria-label="اعمال فیلترهای انتخاب شده"
              className="w-full bg-[#ff5538] text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium cursor-pointer"
            >
              اعمال فیلترها
            </button>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <ProductGrid products={products} appliedFilters={appliedFilters} />
        </div>
      </div>
    </div>
  );
}
