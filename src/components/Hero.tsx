import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      setMousePosition({
        x: (clientX / innerWidth) * 100,
        y: (clientY / innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black pb-0"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 106, 0, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 20% 20%, rgba(255, 106, 0, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 106, 0, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)
        `,
      }}
    >
      {/* Advanced particle system */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-orange-500/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3D floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-orange-500/20 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 8}%`,
            }}
            animate={{
              rotateY: [0, 360],
              rotateX: [0, 180],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main content with advanced animations */}
      <motion.div
        className="relative z-10 text-center px-8 max-w-7xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Animated background text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0.03 }}
          animate={{ opacity: 0.05 }}
        >
          <span className="text-[20rem] font-black text-white/10 select-none">
            VISUALS
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.div
            className="inline-block mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              className="text-orange-500 text-sm font-medium tracking-[0.3em] uppercase block mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Creative Studio
            </motion.span>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-9xl lg:text-[12rem] font-black text-white mb-8 leading-[0.8] tracking-tight"
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
          >
            <motion.span
              className="block"
              whileHover={{
                backgroundImage:
                  "linear-gradient(45deg, #ff6a00, #ff8a33, #ff6a00)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transition: { duration: 0.3 },
              }}
            >
              WE CRAFT
            </motion.span>
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600"
              initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 30px rgba(255, 106, 0, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              BOLD VISUALS
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
            >
              FOR BOLD BRANDS
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <motion.p
            className="text-2xl md:text-3xl text-white/80 leading-relaxed font-light"
            whileHover={{ color: "#ff6a00", transition: { duration: 0.3 } }}
          >
            We create{" "}
            <motion.span
              className="text-orange-500 font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              cinematic experiences
            </motion.span>{" "}
            that push the boundaries of visual storytelling and brand
            expression.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <motion.button
            className="group relative px-12 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 106, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">EXPLORE WORK</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.button
            className="group relative px-12 py-6 border-2 border-orange-500 text-orange-500 font-semibold rounded-full overflow-hidden"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 106, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="relative z-10">START PROJECT</span>
            <motion.div
              className="absolute inset-0 bg-orange-500/10"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Advanced scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white/60 text-sm font-medium tracking-wider uppercase">
            Scroll
          </span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-orange-500 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
