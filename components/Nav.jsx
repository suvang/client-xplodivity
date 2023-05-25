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

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [searchTerm, setSearchTerm] = useState({
    topicName: "",
    page: 1,
  });
  useGetCurrentUserDetailsQuery();
  const user = useSelector((state) => state.user.currentUser);

  console.log("userdata", user);

  const handleSearch = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };
  console.log("search", searchTerm);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
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
      <div className="flex flex-center gap-5 ">
        {user?.admin && (
          <Link href="/upload" className="text-custom-text whitespace-nowrap ">
            UPLOAD
          </Link>
        )}
        <Link
          href="/pricing"
          className="text-custom-text font-bold whitespace-nowrap "
        >
          PREMIUM ACCESS
        </Link>
        <Link href="/explore" className="text-custom-text ">
          Explore
        </Link>
        <Link href="/courses" className=" text-custom-text">
          Courses
        </Link>
        <SearchBar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          onChange={handleSearch}
          name="topicName"
        />
        {!user && (
          <label
            onClick={() => setIsModalOpen(true)}
            htmlFor="my-modal-3"
            className="w-full custom_btn text-custom-text"
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
              className="object-contain"
            />
            <p>xplodivity</p>
          </Link>
        )}
      </div>

      {isModalOpen && (
        <Modal>
          {isLoginView ? (
            <Login setIsLoginView={setIsLoginView} />
          ) : (
            <Signup setIsLoginView={setIsLoginView} />
          )}
        </Modal>
      )}

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        <div className="flex">
          {toggleDropdown && (
            <div className="dropdown">
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link
                href="/create-prompt"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Create Prompt
              </Link>
              <button
                type="button"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className="outline_btn"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
