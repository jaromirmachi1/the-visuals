import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const Showcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.6, 1],
    [0, 0.6, 1, 0.3]
  );

  // Premium project data
  const projects = [
    {
      id: 1,
      title: "NIKE",
      subtitle: "Just Do It",
      category: "Advertising",
      thumbnail:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=800&fit=crop&q=80",
      client: "Nike",
      year: "2024",
      description:
        "Revolutionary campaign that redefined athletic storytelling",
      color: "#ff6a00",
    },
    {
      id: 2,
      title: "DRAKE",
      subtitle: "God's Plan",
      category: "Music Video",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop&q=80",
      client: "Drake",
      year: "2024",
      description: "Cinematic masterpiece that captured the essence of success",
      color: "#ff6a00",
    },
    {
      id: 3,
      title: "APPLE",
      subtitle: "Think Different",
      category: "Brand Film",
      thumbnail:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=800&fit=crop&q=80",
      client: "Apple",
      year: "2024",
      description: "Timeless narrative that celebrates human innovation",
      color: "#ff6a00",
    },
    {
      id: 4,
      title: "TESLA",
      subtitle: "Future of Mobility",
      category: "Automotive",
      thumbnail:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&h=800&fit=crop&q=80",
      client: "Tesla",
      year: "2024",
      description: "Visionary storytelling that accelerates the future",
      color: "#ff6a00",
    },
    {
      id: 5,
      title: "SPOTIFY",
      subtitle: "Music for Everyone",
      category: "Streaming",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop&q=80",
      client: "Spotify",
      year: "2024",
      description: "Universal language of music brought to life",
      color: "#ff6a00",
    },
    {
      id: 6,
      title: "ADIDAS",
      subtitle: "Impossible is Nothing",
      category: "Sports",
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&q=80",
      client: "Adidas",
      year: "2024",
      description: "Pushing boundaries of what's possible in sport",
      color: "#ff6a00",
    },
  ];

  return (
    <section
      id="work"
      ref={ref}
      className="min-h-screen bg-black pt-20 pb-32 px-8 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-24"
        >
          <motion.div
            className="inline-block mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-orange-500 text-sm font-medium tracking-[0.3em] uppercase">
              Selected Works
            </span>
          </motion.div>

          <motion.h2
            className="text-8xl md:text-9xl lg:text-[12rem] font-black text-white mb-8 leading-[0.8] tracking-tight"
            style={{ y, opacity }}
          >
            <span className="block">CREATIVE</span>
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600"
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 40px rgba(255, 106, 0, 0.5)",
              }}
            >
              EXCELLENCE
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Where bold vision meets exceptional execution. Each project is a
            testament to our commitment to pushing creative boundaries.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-white/10">
                {/* Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <motion.img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Play Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Category Badge */}
                  <motion.div
                    className="absolute top-6 left-6 px-4 py-2 bg-orange-500/90 backdrop-blur-sm rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-sm font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Year */}
                  <motion.div
                    className="absolute top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-sm font-medium">
                      {project.year}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <motion.h3
                        className="text-3xl font-black text-white mb-2"
                        whileHover={{ color: "#ff6a00" }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-orange-500 text-lg font-medium">
                        {project.subtitle}
                      </p>
                    </div>
                    <motion.div
                      className="w-12 h-12 border border-orange-500/50 rounded-full flex items-center justify-center"
                      whileHover={{
                        backgroundColor: "rgba(255, 106, 0, 0.1)",
                        scale: 1.1,
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <p className="text-white/70 text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm font-medium">
                      {project.client}
                    </span>
                    <motion.span
                      className="text-orange-500 text-sm font-semibold uppercase tracking-wider"
                      whileHover={{ scale: 1.05 }}
                    >
                      View Project →
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.button
            className="group relative px-12 py-6 border-2 border-orange-500 text-orange-500 font-semibold rounded-full overflow-hidden"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 106, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">VIEW ALL PROJECTS</span>
            <motion.div
              className="absolute inset-0 bg-orange-500/10"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
