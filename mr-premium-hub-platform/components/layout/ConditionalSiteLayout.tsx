"use client";

import { usePathname } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { ChatWidgetWrapper } from "@/components/ChatWidget";

export default function ConditionalSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <ChatWidgetWrapper adminAvatars={[]} />
    </>
  );
}
