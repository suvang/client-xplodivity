"use client";

import { motion } from "framer-motion";
import HeroSection from "@components/Home/HeroSection";
import LatestContent from "@components/Home/LatestContent";
import Navbar from "@/components/Nav";

// Animation variants for initial page load
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  return (
    <motion.div
      className="bg-[#121521] min-h-screen text-white overflow-x-hidden"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute h-16 w-16 rounded-full bg-[#3B82F6]/10"
          style={{ top: "20%", left: "10%" }}
          animate={{
            y: [0, -15, 0, 15, 0],
            x: [0, 15, 30, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute h-24 w-24 rounded-full bg-[#3B82F6]/5"
          style={{ top: "60%", left: "5%" }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 20, 40, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute h-32 w-32 rounded-full bg-[#3B82F6]/5"
          style={{ top: "80%", left: "15%" }}
          animate={{
            y: [0, -25, 0, 25, 0],
            x: [0, 25, 50, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute h-20 w-20 rounded-full bg-[#3B82F6]/10"
          style={{ top: "30%", right: "5%" }}
          animate={{
            y: [0, -15, 0, 15, 0],
            x: [0, -15, -30, -15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute h-28 w-28 rounded-full bg-[#3B82F6]/5"
          style={{ top: "65%", right: "10%" }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, -20, -40, -20, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <Navbar />
      <HeroSection />
      <LatestContent />
    </motion.div>
  );
};

export default Home;
