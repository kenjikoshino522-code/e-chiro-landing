import Image from "next/image";

export default function PaymentMethod() {
  return (
    <section className="bg-neutral-50 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-brand-blue">PAYMENT METHOD</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            決済方法
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
          <Image
            src="/images/menu/menu-04-payment.jpg"
            alt="Payment Method: Suica, PASMOなど交通系電子マネー、QUICPay, iD, PayPay, Apple Pay、各種クレジットカードに対応"
            width={2000}
            height={1125}
            className="w-full"
            sizes="(min-width: 1024px) 960px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
