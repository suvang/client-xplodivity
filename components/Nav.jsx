"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Modal, ModalContent } from "@nextui-org/modal";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import { useLazyGetCurrentUserDetailsQuery } from "@app/store/services/user";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useIsMobile from "@utils/useIsMobile";
import NavMobile from "./NavMobile";

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState({
    topicName: "",
    page: 1,
  });
  const pathname = usePathname();
  const [getUserDetails] = useLazyGetCurrentUserDetailsQuery();
  const user = useSelector((state) => state.user.currentUser);
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const router = useRouter();
  const authType = searchParams.get("authType");

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };

  return (
    <nav className=" flex-between w-full pt-2 pb-2 md:px-12 px-2 bg-custom-background border-b border-[#272934]">
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
      {!isMobile && (
        <div className="flex flex-center gap-5 md:gap-3">
          {user?.admin && (
            <Link
              href="/upload"
              className="text-custom-text whitespace-nowrap font-medium"
            >
              UPLOAD
            </Link>
          )}
          {/* <Link
            href="/pricing"
            className={`max-lg:text-sm max-sm:text-xs text-custom-text font-bold whitespace-nowrap bg-custom-button-bg py-1 px-2 rounded ${
              pathname === "/pricing" && "underline underline-offset-4"
            }`}
          >
            PREMIUM
          </Link> */}
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
            PREMIUM
          </Link>

          {pathname === "/" ? null : (
            <>
              <SearchBar
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                onChange={handleSearch}
                name="topicName"
                className="max-[900px]:hidden text-black"
              />

              <label className="min-[900px]:hidden ">
                <FaSearch />
              </label>
            </>
          )}

          {pathname !== "/pricing" && (
            <Modal>
              <ModalContent>
                <SearchBar
                  setSearchTerm={setSearchTerm}
                  searchTerm={searchTerm}
                  onChange={handleSearch}
                  name="topicName"
                />
              </ModalContent>
            </Modal>
          )}

          {!user && (
            <label
              onClick={() => router.push("?authType=login")}
              // htmlFor="my-modal-3"
              className="max-lg:text-sm max-sm:text-xs max-sm:py-2 max-sm:px-2 w-fit custom_btn text-custom-text"
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
              <p>{user?.fullName}</p>
            </Link>
          )}
        </div>
      )}

      <Modal
        className="bg-custom-background text-white"
        isOpen={authType}
        onOpenChange={() => {
          if (authType) {
            router.replace(`${pathname}`);
          }
        }}
      >
        <ModalContent className="p-8">
          {authType === "login" ? <Login /> : <Signup />}
        </ModalContent>
      </Modal>

      {isMobile && <NavMobile />}
    </nav>
  );
};

export default Nav;
