"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Animation variants
const sectionVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const LatestContent = () => {
  return (
    <motion.div
      className="mt-16 md:mt-24 container mx-auto px-4 mb-20"
      variants={sectionVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="text-center mb-10">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Latest Content
        </motion.h2>
        <motion.p
          className="text-white/70 mt-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Fresh educational resources to boost your skills
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Latest Article Card */}
        <motion.div
          className="bg-[#1A1E2E]/60 rounded-xl overflow-hidden shadow-lg group"
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          whileHover="hover"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="h-48 overflow-hidden relative">
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/categories/CaShN6mCJB0/2024-08-11T13-13-16.898Z.jpeg`}
              alt="JavaScript code on screen"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#3B82F6]/90 text-white px-3 py-1 rounded-md text-sm font-medium">
              React Js
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-xl mb-2 group-hover:text-[#3B82F6] transition-colors duration-300">
              8 React Js performance optimization techniques YOU HAVE TO KNOW!
            </h3>
            <p className="text-white/70 text-sm mb-4 line-clamp-2">
              Explore the latest JavaScript features that can simplify your code
              and boost your productivity.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/60">10 min read</span>
              <Link
                href="/articles/modern-javascript"
                className="text-[#3B82F6] font-medium text-sm flex items-center gap-1 hover:underline"
              >
                Read Article
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Latest Video Card */}
        <motion.div
          className="bg-[#1A1E2E]/60 rounded-xl overflow-hidden shadow-lg group"
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          whileHover="hover"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="h-48 overflow-hidden relative">
            <img
              src="https://i.ytimg.com/vi/-pYKLWRoSB0/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAcldSDw_DHXj4eL-8OXg4HL3kDNQ"
              alt="React dashboard development"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#FB7185]/90 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              Video
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-[#FB7185]/80 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-xl mb-2 group-hover:text-[#FB7185] transition-colors duration-300">
              What software engineering at scale looks like
            </h3>
            <p className="text-white/70 text-sm mb-4 line-clamp-2">
              An inside look at how large tech companies build, manage, and
              scale complex software systems—covering architecture,
              collaboration, tooling, and processes that power software at
              scale.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/60">04:36 minutes</span>
              <a
                href="https://www.youtube.com/watch?v=-pYKLWRoSB0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FB7185] font-medium text-sm flex items-center gap-1 hover:underline"
              >
                Watch Video
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Latest Course Card */}
        <motion.div
          className="bg-[#1A1E2E]/60 rounded-xl overflow-hidden shadow-lg group"
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          whileHover="hover"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-48 overflow-hidden relative">
            <img
              src="https://d502jbuhuh9wk.cloudfront.net/courses/65883553e4b08ebe75f39885/65883553e4b08ebe75f39885_scaled_cover.jpg?v=5"
              alt="Frontend machine coding projects"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#F59E0B]/90 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z"
                  clipRule="evenodd"
                />
              </svg>
              Premium
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-xl mb-2 group-hover:text-[#F59E0B] transition-colors duration-300">
              Build 16 Medium/Hard JavaScript Projects for Frontend Machine
              coding Interview rounds
            </h3>
            <p className="text-white/70 text-sm mb-4 line-clamp-2">
              Master frontend machine coding interviews by building 16 medium to
              hard JavaScript projects that test real-world problem solving, UI
              design, and code structure.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/60">
                16 modules • 10+ hours
              </span>
              <Link
                href="/courses/16-js-projects"
                className="text-[#F59E0B] font-medium text-sm flex items-center gap-1 hover:underline"
              >
                View Course
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LatestContent;
