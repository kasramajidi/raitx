import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../components/servicesData";
import {
  ServiceDetailHeader,
  ServiceDetailContent,
  ServiceForm,
  ServiceBenefits,
  ServiceStats,
  ServiceFAQ,
  RelatedServices,
  SimCardTypes,
  VirtualNumberTypes,
  DomainExtensions,
  DomainTips,
  DomainProviders,
  HostTypes,
  HostTips,
} from "./components";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "خدمت یافت نشد",
      description: "خدمت مورد نظر یافت نشد",
    };
  }

  const title = `${service.label} | مسترپریمیوم هاب`;
  const description =
    service.description.length > 160
      ? service.description.slice(0, 157) + "..."
      : service.description;

  return {
    title,
    description,
    keywords: [
      service.label,
      service.labelEn || "",
      "خدمات پرداخت ارزی",
      "مسترپریمیوم هاب",
    ],
    alternates: {
      canonical: `/currency-payment/${service.id}`,
    },
    openGraph: {
      title,
      description,
      url: `/currency-payment/${service.id}`,
      locale: "fa_IR",
      type: "website",
      siteName: "مسترپریمیوم هاب",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "صفحه اصلی",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "پرداخت ارزی",
        item: `${baseUrl}/currency-payment`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.label,
        item: `${baseUrl}/currency-payment/${service.id}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 md:pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <ServiceDetailHeader service={service} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <ServiceDetailContent service={service} />
            <ServiceBenefits service={service} />
            <ServiceStats service={service} />
            {service.id === "international-sim" && <SimCardTypes />}
            {service.id === "virtual-number" && <VirtualNumberTypes />}
            {service.id === "domain" && (
              <>
                <DomainExtensions />
                <DomainTips />
                <DomainProviders />
              </>
            )}
            {service.id === "host" && (
              <>
                <HostTypes />
                <HostTips />
              </>
            )}
            <ServiceFAQ service={service} />
            <RelatedServices currentService={service} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <ServiceForm service={service} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
