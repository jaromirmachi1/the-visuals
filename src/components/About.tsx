import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "15+", label: "Awards Won" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "5+", label: "Years Experience" },
  ];

  return (
    <section
      id="about"
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20 px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            ABOUT <span className="text-orange-500">US</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We are a premium creative studio that pushes the boundaries of
            visual storytelling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Philosophy
            </h3>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                We believe in the power of bold visuals to transform brands and
                create lasting impressions. Our approach combines cutting-edge
                technology with artistic vision to deliver content that not only
                looks stunning but drives real business results.
              </p>
              <p>
                Every project is an opportunity to push creative boundaries. We
                work with brands that aren't afraid to stand out, creating
                visual experiences that resonate with audiences and leave
                lasting impressions.
              </p>
              <p>
                Our team brings together the best talent in cinematography,
                direction, and post-production to ensure every frame tells a
                story worth remembering.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  Premium Quality
                </h4>
                <p className="text-white/70">
                  Every project delivered with uncompromising attention to
                  detail
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-orange-500 mb-2">
                {stat.number}
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">
            What We Do
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Music Videos",
                description:
                  "Cinematic storytelling that amplifies your sound and vision",
                icon: "🎵",
              },
              {
                title: "Advertising",
                description:
                  "Compelling campaigns that drive engagement and results",
                icon: "📺",
              },
              {
                title: "Brand Films",
                description:
                  "Visual narratives that define and elevate your brand",
                icon: "🎬",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h4>
                <p className="text-white/70">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
