import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
// import { GithubSection } from "@/components/GithubSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid bg-[size:72px_72px] opacity-[0.06]" />
      <Header />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      {/* <GithubSection /> */}
      <Contact />
      <Footer />
    </main>
  );
}
