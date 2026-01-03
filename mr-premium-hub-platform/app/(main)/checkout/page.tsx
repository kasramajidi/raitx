"use client";

import React from "react";
import { useCart } from "@/app/(main)/context/CartContext";
import MainContainer from "./ui/MainContainer";
import BreadcrumbBox from "./ui/BreadcrumbBox";
import OrderSummary from "./Components/OrderSummary";
import BillingDetails from "./Components/BillingDetails";
import EmptyCartState from "./Components/EmptyCartState";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <MainContainer>
        <BreadcrumbBox pageName="تسویه حساب" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <BillingDetails />
          <OrderSummary
            items={items}
            getTotalPrice={getTotalPrice}
            formatPrice={formatPrice}
          />
        </div>
      </MainContainer>
    </div>
  );
}
