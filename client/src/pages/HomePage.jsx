import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Homepage = () => {
  const taglineRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const previewRef = useRef(null);
  const featuresRef = useRef(null);

  const isInView = useInView(taglineRef, { once: true, threshold: 0.1 });

  // Floating animation variants
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Staggered animation for features
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-10 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          {/* Tagline */}
          <motion.div
            ref={taglineRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block bg-purple-500/10 text-purple-300 px-4 py-2 rounded-full border border-purple-500/30 text-sm font-semibold mb-8"
          >
            TermsReader vs. Manual Review – See Why Teams Are Making the Switch
          </motion.div>

          {/* Main Title */}
          <motion.h1
            ref={titleRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Unlock Legal Document{" "}
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent">
              Understanding
            </span>{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent relative"
            >
              in Minutes
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            ref={subtitleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Deploy AI-powered analysis, summarization, and insights for any legal document. 
            Learn from every clause and control the levers that drive comprehension, 
            compliance, and confidence at scale.
          </motion.p>

          {/* Buttons */}
          <motion.div
            ref={buttonsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg font-semibold text-lg text-white"
            >
              Book a Demo
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#a78bfa", color: "#a78bfa" }}
              className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-purple-400 hover:text-purple-300 transition-all"
            >
              Read the Docs →
            </motion.button>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl mb-12"
          >
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute top-6 right-6 bg-gray-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30 text-purple-300 text-sm font-semibold"
            >
              AI-Powered Analysis
            </motion.div>

            {/* Preview Image Placeholder */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-96 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">⚖️</div>
                <p className="text-gray-400 text-lg">Document Analysis Interface Preview</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            ref={featuresRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {[
              { text: "No credit card required" },
              { text: "Set up in 5 minutes" },
              { text: "99.9% uptime SLA" },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants} className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                >
                  ✓
                </motion.div>
                <span className="text-gray-300 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Background Elements */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10"
        />
        <motion.div
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -z-10"
        />
        <motion.div
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl -z-10"
        />
      </section>


    </div>
  );
};

export default Homepage;
