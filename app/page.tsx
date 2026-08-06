import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatIsEChiro from "@/components/WhatIsEChiro";
import About from "@/components/About";
import LogoConcept from "@/components/LogoConcept";
import WhyUs from "@/components/WhyUs";
import ServiceMenu from "@/components/ServiceMenu";
import ReservationFlow from "@/components/ReservationFlow";
import ReservationForm from "@/components/ReservationForm";
import CorporatePlan from "@/components/CorporatePlan";
import PaymentMethod from "@/components/PaymentMethod";
import Voice from "@/components/Voice";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatIsEChiro />
        <About />
        <LogoConcept />
        <WhyUs />
        <ServiceMenu />
        <ReservationFlow />
        <ReservationForm />
        <Voice />
        <PaymentMethod />
        <CorporatePlan />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
