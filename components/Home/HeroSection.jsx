"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CodeBlock, CodeLine } from "@/components/CodeBlock";
import styles from "./home.module.css";

// Animation variants
const titleVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const subtitleVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: "easeOut",
    },
  },
};

const cardContainerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
      duration: 0.6,
    },
  },
};

const HeroSection = () => {
  return (
    <section
      className={`w-full pt-24 pb-12 relative overflow-hidden ${styles.height}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col my-6 md:my-10 gap-8 md:gap-12">
          <motion.div
            className="flex flex-col items-center gap-5 max-w-5xl mx-auto"
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="text-center text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
              variants={titleVariants}
            >
              <span className="block">ENGINEER FOR KNOWLEDGE,</span>
              <span className="block mt-1">
                NOT JUST INTERVIEWS{" "}
                <motion.span
                  className="inline-block"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  🧠
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              className="text-center text-xl text-white/80 mt-4 max-w-2xl"
              variants={subtitleVariants}
            >
              Dive into the World of Tech:
              <span className="block mt-1">
                JavaScript, Web Dev, AI, and More. 🌐
              </span>
            </motion.p>

            <motion.div className="flex gap-4 mt-6" variants={subtitleVariants}>
              <Link
                href="/explore"
                className="px-8 py-3 text-center bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] rounded-lg font-medium text-white shadow-lg hover:shadow-[#3B82F6]/25 transition-all hover:-translate-y-1"
              >
                Explore Content
              </Link>
              <Link
                href="/courses"
                className="px-8 py-3 text-center bg-transparent border border-[#3B82F6]/50 rounded-lg font-medium text-white/90 hover:text-white hover:border-[#3B82F6]/80 transition-all hover:-translate-y-1"
              >
                View Premium Content
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-2 md:px-0"
            variants={cardContainerVariants}
            initial="initial"
            animate="animate"
          >
            <Link href="/explore" className="max-w-full w-full h-full">
              <CodeBlock
                title="EXPLORE"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#38BDF8]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                }
                gradientFrom="#38BDF8"
                gradientTo="#A78BFA"
                hoverColor="#38BDF8"
              >
                <CodeLine text="Frontend dev" color="text-[#38BDF8]" />
                <CodeLine text="Backend Dev" color="text-[#4ADE80]" />
                <CodeLine text="FullStack Dev" color="text-white" />
                <CodeLine
                  text="Artificial Intelligence"
                  color="text-[#A78BFA]"
                />
                <CodeLine text="Tech news" color="text-[#FB7185]" />
                <CodeLine text="And more..." color="text-[#3B82F6]" />
              </CodeBlock>
            </Link>

            <a
              href="https://www.youtube.com/@xplodivity/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-full w-full h-full"
            >
              <CodeBlock
                title="JOIN US"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#FB7185]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                }
                gradientFrom="#FB7185"
                gradientTo="#FB923C"
                hoverColor="#FB7185"
                isExternal={true}
              >
                <CodeLine text="Big community" color="text-[#38BDF8]" />
                <CodeLine text="Frequent uploads" color="text-[#4ADE80]" />
                <CodeLine text="Tons of tutorials" color="text-white" />
                <CodeLine text="Giveaways" color="text-[#A78BFA]" />
                <CodeLine text="Tech Insights & News" color="text-[#FB923C]" />
                <CodeLine text="And more..." color="text-[#3B82F6]" />
              </CodeBlock>
            </a>

            <Link href="/courses" className="max-w-full w-full h-full">
              <CodeBlock
                title="MEMBER-ONLY CONTENT"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#F59E0B]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                }
                gradientFrom="#F59E0B"
                gradientTo="#4ADE80"
                hoverColor="#F59E0B"
              >
                <CodeLine
                  text="Learn at Your Own Pace"
                  color="text-[#4ADE80]"
                />
                <CodeLine
                  text="Unlock Premium Content – Enroll Today"
                  color="text-[#F59E0B]"
                />
                <CodeLine
                  text="Thorough explanations & code walkthroughs"
                  color="text-white"
                />
                <CodeLine
                  text="No bullshit, No time waste"
                  color="text-[#FB7185]"
                />
                <CodeLine text="And more..." color="text-[#3B82F6]" />
              </CodeBlock>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className={styles.customshape1}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={styles.shapefill}
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
