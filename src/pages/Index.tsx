import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ChatWidget } from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;