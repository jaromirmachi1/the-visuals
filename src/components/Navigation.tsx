import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);

      // Update active section based on scroll position
      const sections = ["home", "work", "about", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home", number: "01" },
    { id: "work", label: "Work", number: "02" },
    { id: "about", label: "About", number: "03" },
    { id: "contact", label: "Contact", number: "04" },
  ];

  return (
    <>
      {/* Advanced Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 w-full h-0.5 z-50"
        style={{ opacity: navOpacity }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600"
          style={{ width: progress }}
        />
      </motion.div>

      {/* Logo */}
      <motion.div
        className="fixed top-8 left-8 z-40"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="text-2xl font-black text-white"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-orange-500">THE</span>VISUALS
        </motion.div>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.nav
        className="hidden lg:block fixed top-8 right-8 z-40"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="flex items-center space-x-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/5">
                <motion.span
                  className="text-orange-500 text-xs font-bold"
                  animate={{
                    opacity: activeSection === item.id ? 1 : 0.5,
                    scale: activeSection === item.id ? 1.1 : 1,
                  }}
                >
                  {item.number}
                </motion.span>
                <motion.span
                  className="text-white/80 text-sm font-medium tracking-wider uppercase"
                  animate={{
                    color:
                      activeSection === item.id
                        ? "#ff6a00"
                        : "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {item.label}
                </motion.span>
              </div>

              {/* Active indicator */}
              {activeSection === item.id && (
                <motion.div
                  className="absolute inset-0 bg-orange-500/20 rounded-full"
                  layoutId="activeNav"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        className="lg:hidden fixed top-8 right-8 z-50 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div
          className="w-6 h-6 flex flex-col justify-center space-y-1"
          animate={{ rotate: isMenuOpen ? 45 : 0 }}
        >
          <motion.div
            className="w-full h-0.5 bg-orange-500"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 6 : 0,
            }}
          />
          <motion.div
            className="w-full h-0.5 bg-orange-500"
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
          />
          <motion.div
            className="w-full h-0.5 bg-orange-500"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -6 : 0,
            }}
          />
        </motion.div>
      </motion.button>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-12">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-4xl font-bold text-white hover:text-orange-500 transition-colors duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 50,
              }}
              transition={{
                duration: 0.5,
                delay: isMenuOpen ? index * 0.1 : 0,
              }}
              whileHover={{ scale: 1.1 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 border border-orange-500/50 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: 0,
          y: 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          left: 0,
          top: 0,
        }}
      />
    </>
  );
};

export default Navigation;
