import {
  Hero,
  ServicesSection,
  PaymentMethods,
  TravelPayments,
  ExamRegistration,
  VisaPayments,
} from "@/app/(main)/components/home";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ServicesSection />
      <PaymentMethods />
      <TravelPayments />
      <ExamRegistration />
      <VisaPayments />
    </main>
  );
}

