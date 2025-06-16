import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Clientssays from "@/components/Clientssays"
import Giftguides from "@/components/Giftguides"
import Mediasearch from "@/components/Mediasearch"
import Newsletter from "@/components/Newsletter"
import ProductSection from "@/components/ProductSection";

const page = () => {
  return (
    <main className="bg-[#d2cdc1] dark:bg-neutral-900">
      <Hero />
      <Mediasearch />
      <Giftguides />
      <ProductSection />
      <Faq />
      <Clientssays />
      <Newsletter />
    </main>
  );
}

export default page