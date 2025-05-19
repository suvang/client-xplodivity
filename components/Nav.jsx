"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useLazyGetCurrentUserDetailsQuery } from "@app/store/services/user";
import SearchBar from "./SearchBar";
import { Modal, ModalContent } from "@nextui-org/modal";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    topicName: "",
    page: 1,
  });
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [getUserDetails] = useLazyGetCurrentUserDetailsQuery();
  const user = useSelector((state) => state.user?.currentUser);
  const pathname = usePathname();

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#121521]/90 backdrop-blur-md z-50 border-b border-[#3B82F6]/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="h-10 w-10 rounded-md flex items-center justify-center shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/assets/images/logo.jpeg"
              alt="logo"
              width={30}
              height={30}
              className="object-contain"
            />
          </motion.div>
          <span className="text-xl font-bold text-white">xplodivity</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/explore">Explore</NavLink>
          <NavLink href="/courses">Courses</NavLink>
          <a
            href="https://www.youtube.com/@xplodivity/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors font-medium flex items-center gap-1"
          >
            YouTube
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-red-500"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
        </div>

        <div className="flex items-center gap-3">
          {pathname !== "/" && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenSearchBar(true)}
              className="p-2 rounded-full bg-[#1E213A]/80 border border-[#3B82F6]/20"
            >
              <FaSearch className="text-white/80 h-4 w-4" />
            </motion.button>
          )}

          <Modal
            isOpen={openSearchBar}
            onOpenChange={() => setOpenSearchBar(!openSearchBar)}
            className="bg-[#121521] border border-[#3B82F6]/20"
          >
            <ModalContent className="p-8 bg-[#121521]/90 backdrop-blur-md">
              <SearchBar
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                onChange={handleSearch}
                name="topicName"
                className="w-full"
              />
            </ModalContent>
          </Modal>

          {!user ? (
            <Link
              href="?authType=login"
              className="px-4 py-2 rounded-md text-white/90 hover:text-white transition-colors border border-[#3B82F6]/50 hover:border-[#3B82F6]/80"
            >
              Login
            </Link>
          ) : (
            <Link href="/profile" className="flex items-center gap-2">
              <motion.div
                className="h-10 w-10 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl font-bold text-white">
                  {" "}
                  {user?.fullName?.charAt(0)?.toUpperCase() || "X"}
                </span>
              </motion.div>
              <span className="text-xl font-bold text-white">
                {user?.fullName}
              </span>
            </Link>
          )}
          <button
            className="md:hidden text-white text-xl p-1"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-[#1A1E2E] border-b border-[#3B82F6]/20"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col py-4 px-4 space-y-3">
              <MobileNavLink href="/explore" onClick={toggleMobileMenu}>
                Explore
              </MobileNavLink>
              <MobileNavLink href="/courses" onClick={toggleMobileMenu}>
                Courses
              </MobileNavLink>
              <a
                href="https://www.youtube.com/@xplodivity/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors py-2 font-medium flex items-center gap-1"
                onClick={toggleMobileMenu}
              >
                YouTube
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-red-500"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="text-white/80 hover:text-white transition-colors font-medium relative group"
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3B82F6] group-hover:w-full transition-all duration-300"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
      />
    </Link>
  );
};

const MobileNavLink = ({ href, children, onClick }) => {
  return (
    <Link
      href={href}
      className="text-white/80 hover:text-white transition-colors py-2 font-medium block"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Nav;
