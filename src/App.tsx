import { useEffect } from "react";
import Lenis from "lenis";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <Showcase />
      <About />
      <Contact />
    </div>
  );
}

export default App;
