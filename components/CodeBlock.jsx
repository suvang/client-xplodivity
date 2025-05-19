"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Animation variants
const blockVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
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

const CodeBlock = ({
  children,
  title,
  icon,
  gradientFrom = "#38BDF8",
  gradientTo = "#A78BFA",
  hoverColor = "#3B82F6",
  href = "/",
  isExternal = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="h-full block group"
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={blockVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full bg-[#1A1E2E] rounded-xl border border-[#3B82F6]/20 overflow-hidden relative shadow-lg"
        animate={{
          boxShadow: isHovered
            ? `0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(${
                hoverColor === "#3B82F6"
                  ? "59, 130, 246"
                  : hoverColor === "#FB7185"
                  ? "251, 113, 133"
                  : "245, 158, 11"
              }, 0.3)`
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-1.5"
          style={{
            background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
          }}
        />
        <div className="px-6 pt-6 pb-2">
          <h2
            className={`text-2xl font-bold mb-4 text-white flex items-center group-hover:text-[${hoverColor}] transition-colors duration-300`}
          >
            {icon && <span className="mr-3">{icon}</span>}
            {title}
          </h2>
        </div>
        <div className="px-6 pb-6 space-y-3">{children}</div>
        {isHovered && (
          <motion.div
            className="absolute bottom-3 right-3 text-[#3B82F6]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ color: hoverColor }}
          >
            {isExternal ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const CodeLine = ({ prefix = ">", text, color = "text-white" }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="text-lg text-[#FB923C]">{prefix}</div>
      <div className={`text-md ${color} font-medium`}>{text}</div>
    </div>
  );
};

export { CodeBlock, CodeLine };
