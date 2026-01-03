"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import WelcomeBox from "../components/WelcomeBox";
import DashboardCards from "../components/DashboardCards";
import AccountEmptyState from "../components/AccountEmptyState";
import AddressesSection from "../components/AddressesSection";
import AccountDetailsSection from "../components/AccountDetailsSection";

export default function MyAccountSectionPage() {
  const router = useRouter();
  const params = useParams();
  const section = params?.section as string;
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        router.push("/auth", { scroll: false });
      }
    }
  }, [router]);

  useEffect(() => {
    if (section && ["dashboard", "orders", "downloads", "addresses", "accountDetails"].includes(section)) {
      setActiveSection(section);
    } else if (section) {
      router.push("/my-account", { scroll: false });
    }
  }, [section, router]);

  const handleSectionChange = (newSection: string) => {
    setActiveSection(newSection);
    if (newSection === "dashboard") {
      router.push("/my-account", { scroll: false });
    } else {
      router.push(`/my-account/${newSection}`, { scroll: false });
    }
  };

  if (!mounted) {
    return null;
  }

  let content;
  if (activeSection === "dashboard") {
    content = (
      <div className="flex flex-col gap-8">
        <WelcomeBox />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">دسترسی سریع</h3>
          <DashboardCards />
        </div>
      </div>
    );
  } else if (activeSection === "orders") {
    content = (
      <AccountEmptyState
        message="هیچ سفارشی هنوز ثبت نشده است."
        buttonText="مرور محصولات"
        onButtonClick={() => {
          handleSectionChange("dashboard");
          router.push("/shop", { scroll: false });
        }}
      />
    );
  } else if (activeSection === "downloads") {
    content = (
      <AccountEmptyState
        message="دانلودی برای شما ثبت نشده است."
        buttonText="مشاهده محصولات"
        onButtonClick={() => {
          handleSectionChange("dashboard");
          router.push("/shop", { scroll: false });
        }}
      />
    );
  } else if (activeSection === "addresses") {
    content = <AddressesSection />;
  } else if (activeSection === "accountDetails") {
    content = <AccountDetailsSection />;
  } else {
    content = (
      <AccountEmptyState
        message="این بخش در حال توسعه است و به زودی در دسترس شما قرار خواهد گرفت."
        buttonText="بازگشت به پیشخوان"
        onButtonClick={() => handleSectionChange("dashboard")}
        isComingSoon={true}
      />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 w-full lg:sticky lg:top-8 lg:h-fit">
          <Sidebar active={activeSection} onSectionChange={handleSectionChange} />
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm min-h-[400px]">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

