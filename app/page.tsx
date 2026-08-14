import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TickerBanner from "@/components/TickerBanner";
import WhatIsEChiro from "@/components/WhatIsEChiro";
import TrustSection from "@/components/TrustSection";
import BuiltForGamers from "@/components/BuiltForGamers";
import Voice from "@/components/Voice";
import AboutChiro from "@/components/AboutChiro";
import ChiroVsSeitai from "@/components/ChiroVsSeitai";
import About from "@/components/About";
import PageLinkBanner from "@/components/PageLinkBanner";
import WhyUs from "@/components/WhyUs";
import ServiceMenu from "@/components/ServiceMenu";
import ReservationFlow from "@/components/ReservationFlow";
import ReservationForm from "@/components/ReservationForm";
import PaymentMethod from "@/components/PaymentMethod";
import CorporatePlan from "@/components/CorporatePlan";
import LogoConcept from "@/components/LogoConcept";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TickerBanner />
        <WhatIsEChiro />
        <TrustSection />
        <BuiltForGamers />
        <Voice />
        <AboutChiro />
        <ChiroVsSeitai />
        <About />
        <PageLinkBanner
          eyebrow="COMIC"
          title="漫画でもっと知るe-CHIRO"
          description="e-CHIROのサービスやDr.KENのことを、漫画でわかりやすく紹介しています。"
          href="/manga"
          buttonLabel="漫画を見る →"
          imageSrc="/images/manga/banner-character.png"
          imageAlt="Dr.KENの漫画イラスト"
        />
        <WhyUs />
        <ServiceMenu />
        <ReservationFlow />
        <ReservationForm />
        <PaymentMethod />
        <CorporatePlan />
        <LogoConcept />
        <PageLinkBanner
          eyebrow="MERCHANDISE"
          title="e-CHIROオリジナルグッズ"
          description="刺繍ロゴ入りのオリジナルTシャツも販売中です。"
          href="/tshirts"
          buttonLabel="グッズを見る →"
          imageSrc="/images/tshirts/banner-thumbnail.jpg"
          imageAlt="e-CHIRO オリジナルTシャツ"
        />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
