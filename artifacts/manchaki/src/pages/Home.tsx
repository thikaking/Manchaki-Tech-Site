import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Courses from "@/components/sections/Courses";
import Fees from "@/components/sections/Fees";
import RoadSafety from "@/components/sections/RoadSafety";
import TrainingProcess from "@/components/sections/TrainingProcess";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Registration from "@/components/sections/Registration";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <WhyChooseUs />
      <Courses />
      <Fees />
      <RoadSafety />
      <TrainingProcess />
      <Gallery />
      <FAQ />
      <Registration />
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
