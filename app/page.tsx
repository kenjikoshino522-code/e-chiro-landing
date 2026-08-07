import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatIsEChiro from "@/components/WhatIsEChiro";
import About from "@/components/About";
import LogoConcept from "@/components/LogoConcept";
import PageLinkBanner from "@/components/PageLinkBanner";
import WhyUs from "@/components/WhyUs";
import ServiceMenu from "@/components/ServiceMenu";
import ReservationFlow from "@/components/ReservationFlow";
import ReservationForm from "@/components/ReservationForm";
import CorporatePlan from "@/components/CorporatePlan";
import PaymentMethod from "@/components/PaymentMethod";
import Voice from "@/components/Voice";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FadeIn>
          <WhatIsEChiro />
        </FadeIn>
        <FadeIn>
          <LogoConcept />
        </FadeIn>
        <FadeIn>
          <About />
        </FadeIn>
        <FadeIn>
          <PageLinkBanner
            eyebrow="COMIC"
            title="漫画でもっと知るe-CHIRO"
            description="e-CHIROのサービスやDr.KENのことを、漫画でわかりやすく紹介しています。"
            href="/manga"
            buttonLabel="漫画を見る →"
            imageSrc="/images/manga/banner-character.png"
            imageAlt="Dr.KENの漫画イラスト"
          />
        </FadeIn>
        <WhyUs />
        <ServiceMenu />
        <ReservationFlow />
        <ReservationForm />
        <FadeIn>
          <Voice />
        </FadeIn>
        <FadeIn>
          <PaymentMethod />
        </FadeIn>
        <FadeIn>
          <CorporatePlan />
        </FadeIn>
        <FadeIn>
          <PageLinkBanner
            eyebrow="MERCHANDISE"
            title="e-CHIROオリジナルグッズ"
            description="刺繍ロゴ入りのオリジナルTシャツも販売中です。"
            href="/tshirts"
            buttonLabel="グッズを見る →"
            imageSrc="/images/tshirts/banner-thumbnail.jpg"
            imageAlt="e-CHIRO オリジナルTシャツ"
          />
        </FadeIn>
        <FadeIn>
          <FinalCta />
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
