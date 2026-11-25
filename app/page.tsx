import { Contact } from "@/components/Contact";
import { Deliveries } from "@/components/Deliveries";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Method } from "@/components/Method";
import { Results } from "@/components/Results";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Results />
        <Deliveries />
        <Method />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
