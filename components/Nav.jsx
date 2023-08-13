"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import { useGetCurrentUserDetailsQuery } from "@app/store/services/user";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [searchTerm, setSearchTerm] = useState({
    topicName: "",
    page: 1,
  });
  const pathname = usePathname();
  useGetCurrentUserDetailsQuery();
  const user = useSelector((state) => state.user.currentUser);

  console.log("userdata", user);

  const handleSearch = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };
  console.log("pathname", pathname);

  return (
    <nav className="flex-between w-full mb-16 pt-2 pb-2 sm:px-12 px-2 bg-custom-background border-b border-[#272934]">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.jpeg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="flex flex-center gap-5 max-sm:gap-3">
        {user?.admin && (
          <Link
            href="/upload"
            className="text-custom-text whitespace-nowrap font-medium"
          >
            UPLOAD
          </Link>
        )}
        <Link
          href="/pricing"
          className={`max-lg:text-sm max-sm:text-xs text-custom-text font-bold whitespace-nowrap bg-custom-button-bg py-1 px-2 rounded ${
            pathname === "/pricing" && "underline underline-offset-4"
          }`}
        >
          PREMIUM
        </Link>
        <Link
          href="/explore"
          className={`max-lg:text-sm max-sm:text-xs text-custom-text font-medium ${
            pathname === "/explore" && "underline underline-offset-4"
          }`}
        >
          EXPLORE
        </Link>
        <Link
          href="/courses"
          className={`max-lg:text-sm max-sm:text-xs text-custom-text font-medium ${
            pathname === "/courses" && "underline underline-offset-4"
          }`}
        >
          COURSES
        </Link>

        {pathname === "/pricing" || pathname === "/" ? null : (
          <>
            <SearchBar
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              onChange={handleSearch}
              name="topicName"
              className="max-[900px]:hidden"
            />

            <label htmlFor="my-modal-search" className="min-[900px]:hidden ">
              <FaSearch />
            </label>
          </>
        )}

        {pathname !== "/pricing" && (
          <Modal htmlFor="my-modal-search">
            <SearchBar
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              onChange={handleSearch}
              name="topicName"
            />
          </Modal>
        )}

        {!user && (
          <label
            onClick={() => setIsModalOpen(true)}
            htmlFor="my-modal-3"
            className="max-lg:text-sm max-sm:text-xs max-sm:py-2 max-sm:px-2 w-full custom_btn text-custom-text"
          >
            LOGIN
          </label>
        )}

        {user && (
          <Link href="/profile" className="flex gap-1 flex-center flex-col">
            <Image
              src="/assets/images/logo.jpeg"
              alt="logo"
              width={30}
              height={30}
              className="object-contain border border-custom-button-bg"
            />
            <p>xplodivity</p>
          </Link>
        )}
      </div>

      {isModalOpen && (
        <Modal>
          {isLoginView ? (
            <Login
              setIsLoginView={setIsLoginView}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <Signup
              setIsLoginView={setIsLoginView}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </Modal>
      )}
    </nav>
  );
};

export default Nav;
