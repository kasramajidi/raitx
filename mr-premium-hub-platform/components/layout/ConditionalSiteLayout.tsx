"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { ChatWidgetWrapper } from "@/components/ChatWidget";
import { getAuthCookie } from "@/app/(main)/auth/lib/cookie";

export default function ConditionalSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getAuthCookie());
  }, [pathname]);

  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      {children}
      <Footer />
      <ChatWidgetWrapper adminAvatars={[]} />
    </>
  );
}
