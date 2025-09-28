import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import GrainedBackground from "./components/GrainedBackground";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentFont, setCurrentFont] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const fonts = [
    { class: "font-thin", family: "Bebas Neue" },
    { class: "font-light", family: "Bebas Neue" },
    { class: "font-normal", family: "Bebas Neue" },
    { class: "font-bold", family: "Bebas Neue" },
    { class: "font-black", family: "Bebas Neue" },
    { class: "font-extralight", family: "Fliege Mono", weight: 200 },
    { class: "font-normal", family: "Kalam" },
    { class: "font-bold", family: "Kalam" },
    { class: "font-normal", family: "Caveat" },
    { class: "font-bold", family: "Caveat" },
    { class: "font-normal", family: "Dancing Script" },
    { class: "font-bold", family: "Dancing Script" },
    { class: "font-normal", family: "Pacifico" },
    { class: "font-normal", family: "Shadows Into Light" },
    { class: "font-normal", family: "Amatic SC" },
    { class: "font-bold", family: "Amatic SC" },
    { class: "font-normal", family: "Indie Flower" },
    { class: "font-normal", family: "Kaushan Script" },
    { class: "font-normal", family: "Lobster" },
    { class: "font-normal", family: "Righteous" },
    { class: "font-normal", family: "Satisfy" },
  ];

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Font cycling for loading
    const interval = setInterval(() => {
      setCurrentFont((prev) => (prev + 1) % fonts.length);
    }, 200);

    // Start animation after 2.5 seconds
    const animationTimer = setTimeout(() => {
      setShowAnimation(true);
    }, 2500);

    // Complete loading after 3 seconds
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      lenis.destroy();
      clearInterval(interval);
      clearTimeout(animationTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      <GrainedBackground />

      {/* Single "The Visuals" text that animates */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        animate={{
          y: showAnimation ? "40vh" : 0,
        }}
        transition={{
          duration: showAnimation ? 2 : 0,
          ease: showAnimation ? "easeInOut" : "linear",
          delay: showAnimation ? 0.5 : 0,
        }}
      >
        <div className="text-white text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold tracking-wider"
            style={{ fontFamily: isLoading ? "Fliege Mono" : "Bebas Neue" }}
            animate={{
              fontSize: showAnimation ? "12rem" : "4rem",
              letterSpacing: showAnimation ? "0.2em" : "0.1em",
              fontWeight: showAnimation ? "900" : "700",
            }}
            transition={{
              duration: showAnimation ? 2 : 0,
              delay: showAnimation ? 0.5 : 0,
              ease: "easeInOut",
            }}
          >
            {isLoading ? (
              <>
                <span className="font-light">The</span>{" "}
                <motion.span
                  className={`${fonts[currentFont].class} transition-all duration-200`}
                  style={{
                    fontFamily: fonts[currentFont].family,
                    fontWeight: fonts[currentFont].weight || "normal",
                  }}
                  key={currentFont}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  V
                </motion.span>
                <span className="font-light">isuals</span>
              </>
            ) : (
              "THE VISUALS"
            )}
          </motion.h1>

          {isLoading && (
            <motion.div
              className="mt-8 text-sm tracking-widest opacity-60"
              style={{ fontFamily: "Fliege Mono" }}
            >
              LOADING...
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default App;
