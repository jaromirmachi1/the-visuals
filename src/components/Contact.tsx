import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="min-h-screen bg-black py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            GET IN <span className="text-orange-500">TOUCH</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Ready to create something extraordinary? Let's discuss your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Talk</h3>
              <p className="text-white/70 leading-relaxed mb-8">
                We work with brands that aren't afraid to push boundaries. If
                you're ready to create something that stands out, we're ready to
                help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-white/70">hello@thevisuals.studio</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Location</p>
                  <p className="text-white/70">Los Angeles, CA</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Response Time</p>
                  <p className="text-white/70">Within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                    focusedField === "name"
                      ? "border-orange-500 shadow-lg shadow-orange-500/25"
                      : "border-white/20 hover:border-white/40"
                  }`}
                  placeholder="Your Name"
                  required
                />
                <motion.div
                  className="absolute -top-2 left-4 px-2 bg-black text-orange-500 text-sm font-medium"
                  animate={{
                    opacity: focusedField === "name" || formData.name ? 1 : 0,
                    y: focusedField === "name" || formData.name ? -8 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Name
                </motion.div>
              </div>

              <div className="relative">
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-all duration-300 ${
                    focusedField === "email"
                      ? "border-orange-500 shadow-lg shadow-orange-500/25"
                      : "border-white/20 hover:border-white/40"
                  }`}
                  placeholder="Your Email"
                  required
                />
                <motion.div
                  className="absolute -top-2 left-4 px-2 bg-black text-orange-500 text-sm font-medium"
                  animate={{
                    opacity: focusedField === "email" || formData.email ? 1 : 0,
                    y: focusedField === "email" || formData.email ? -8 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Email
                </motion.div>
              </div>

              <div className="relative">
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className={`w-full bg-transparent border-2 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-all duration-300 resize-none ${
                    focusedField === "message"
                      ? "border-orange-500 shadow-lg shadow-orange-500/25"
                      : "border-white/20 hover:border-white/40"
                  }`}
                  placeholder="Tell us about your project"
                  required
                />
                <motion.div
                  className="absolute -top-2 left-4 px-2 bg-black text-orange-500 text-sm font-medium"
                  animate={{
                    opacity:
                      focusedField === "message" || formData.message ? 1 : 0,
                    y: focusedField === "message" || formData.message ? -8 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Message
                </motion.div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
