import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import GrainedBackground from "./components/GrainedBackground";
import mockVideo from "./assets/vecteezy_black-and-white-gradient-grain-background-vintage-noise-loop_37267523.mov";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentFont, setCurrentFont] = useState(0);
  // removed unused showAnimation
  const [animateToCorners, setAnimateToCorners] = useState(false);
  const [startLeftThePx, setStartLeftThePx] = useState<number | null>(null);
  const [startLeftVisualsPx, setStartLeftVisualsPx] = useState<number | null>(
    null
  );

  // refs not needed; compute centered start via measured widths inside effect

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

    // Complete loading after 3 seconds
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      lenis.destroy();
      clearInterval(interval);
      clearTimeout(completeTimer);
    };
  }, []);

  // When loading completes, measure centered inline widths so both spans can start
  // exactly where the loading text was, then animate to corners.
  useEffect(() => {
    if (!isLoading) {
      // Defer to next frame to ensure fonts/styles applied
      requestAnimationFrame(() => {
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "fixed";
        tempContainer.style.top = "-9999px";
        tempContainer.style.left = "-9999px";
        tempContainer.style.fontFamily = "Bebas Neue";
        tempContainer.style.fontWeight = "700";
        tempContainer.style.fontSize = "4rem";
        tempContainer.style.letterSpacing = "0.1em";
        const theSpan = document.createElement("span");
        theSpan.textContent = "THE";
        const visualsSpan = document.createElement("span");
        visualsSpan.textContent = "VISUALS";
        tempContainer.appendChild(theSpan);
        tempContainer.appendChild(visualsSpan);
        document.body.appendChild(tempContainer);
        const theWidth = theSpan.offsetWidth;
        const visualsWidth = visualsSpan.offsetWidth;
        document.body.removeChild(tempContainer);

        const totalWidth = theWidth + visualsWidth;
        const viewportCenterX = window.innerWidth / 2;
        const startLeftThe = viewportCenterX - totalWidth / 2;
        const startLeftVisuals = startLeftThe + theWidth;

        setStartLeftThePx(startLeftThe);
        setStartLeftVisualsPx(startLeftVisuals);

        requestAnimationFrame(() => setAnimateToCorners(true));
      });
    } else {
      setAnimateToCorners(false);
      setStartLeftThePx(null);
      setStartLeftVisualsPx(null);
    }
  }, [isLoading]);

  return (
    <div className="relative bg-black min-h-screen">
      <GrainedBackground />

      {/* Main text container */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="text-white text-center">
          {/* Center video that zooms in on reveal */}
          {!isLoading && (
            <motion.video
              key="mock-video"
              autoPlay
              loop
              muted
              playsInline
              src={mockVideo}
              initial={{ scale: 0.8, opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{
                scale: [0.8, 1.05, 1],
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-0 w-[72vw] max-w-[1150px] rounded-lg shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ aspectRatio: "16 / 9" }}
            />
          )}
          <h1
            className={`text-8xl md:text-9xl font-bold tracking-wider`}
            style={{
              fontFamily: isLoading ? "Fliege Mono" : "Bebas Neue",
              letterSpacing: !isLoading ? "0.1em" : "0.2em",
              fontWeight: !isLoading ? "700" : "900",
            }}
          >
            <span
              className="inline-block"
              style={{
                position: "fixed",
                top: animateToCorners ? "2%" : "50%",
                left: animateToCorners
                  ? "2%"
                  : startLeftThePx !== null
                  ? `${startLeftThePx}px`
                  : "50%",
                transform:
                  animateToCorners || startLeftThePx !== null
                    ? "translate(0, 0)"
                    : "translate(-50%, -50%)",
                transition:
                  "top 2s ease-in-out 0.5s, left 2s ease-in-out 0.5s, transform 2s ease-in-out 0.5s",
              }}
            >
              {isLoading ? (
                <>
                  <span className="font-light">The</span>{" "}
                  <span
                    className={`${fonts[currentFont].class} transition-all duration-200`}
                    style={{
                      fontFamily: fonts[currentFont].family,
                      fontWeight: fonts[currentFont].weight || "normal",
                    }}
                    key={currentFont}
                  >
                    V
                  </span>
                  <span className="font-light">isuals</span>
                </>
              ) : (
                "THE"
              )}
            </span>
            <span
              className="inline-block"
              style={{
                position: "fixed",
                top: animateToCorners ? "98%" : "50%",
                left: animateToCorners
                  ? "98%"
                  : startLeftVisualsPx !== null
                  ? `${startLeftVisualsPx}px`
                  : "50%",
                transform: animateToCorners
                  ? "translate(-100%, -100%)"
                  : "translate(-50%, -50%)",
                transition:
                  "top 2s ease-in-out 0.5s, left 2s ease-in-out 0.5s, transform 2s ease-in-out 0.5s",
              }}
            >
              {isLoading ? "" : "VISUALS"}
            </span>
          </h1>

          {isLoading && (
            <div
              className="mt-8 text-sm tracking-widest opacity-60"
              style={{ fontFamily: "Fliege Mono" }}
            >
              LOADING...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
