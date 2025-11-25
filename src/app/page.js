import Navbar from './components/Landing/Navbar';
import Hero from './components/Landing/Hero';
import Features from './components/Landing/Features';
import HowItWorks from './components/Landing/HowItWorks';
import WhyChooseUs from './components/Landing/WhyChooseUs';
import Testimonials from './components/Landing/Testimonials';
import Pricing from './components/Landing/Pricing';
import Contact from './components/Landing/Contact';
import Footer from './components/Landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
