"use client";

import Link from "next/link";
import Image from "next/image";
import Drawer from "@components/Drawer";
import { useSelector } from "react-redux";
import React from "react";
import { usePathname } from "next/navigation";
import SearchBar from "@components/SearchBar";

const NavMobile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const pathname = usePathname();

  const navItems = () => {
    return (
      <div className="flex flex-col flex-center gap-5 md:gap-3">
        {user?.admin && (
          <Link
            href="/upload"
            className="text-2xl whitespace-nowrap font-medium text-white"
          >
            UPLOAD
          </Link>
        )}
        <Link
          href="/pricing"
          className={`text-2xl text-custom-text font-bold whitespace-nowrap bg-custom-button-bg py-1 px-2 rounded ${
            pathname === "/pricing" && "underline underline-offset-4"
          }`}
        >
          PREMIUM
        </Link>
        <Link
          href="/explore"
          className={`text-2xl text-custom-text font-medium ${
            pathname === "/explore" && "underline underline-offset-4"
          }`}
        >
          EXPLORE
        </Link>
        <Link
          href="/courses"
          className={`text-2xl text-custom-text font-medium ${
            pathname === "/courses" && "underline underline-offset-4"
          }`}
        >
          COURSES
        </Link>

        {!user && (
          <label
            onClick={() => setIsModalOpen(true)}
            htmlFor="my-modal-3"
            className="text-2xl max-sm:py-2 max-sm:px-2 w-full custom_btn text-custom-text"
          >
            LOGIN
          </label>
        )}

        {user && (
          <Link
            href="/profile"
            className="flex gap-1 flex-center flex-col text-2xl text-white"
          >
            <Image
              src="/assets/images/logo.jpeg"
              alt="logo"
              width={30}
              height={30}
              className="object-contain border border-custom-button-bg "
            />
            <p>xplodivity</p>
          </Link>
        )}
      </div>
    );
  };
  return (
    <div className="absolute right-0 top-0 flex justify-end  h-full w-full ">
      <div className="flex mr-[60px] items-center gap-3">
        <Link
          href="/pricing"
          className={`text-sm text-custom-text font-bold whitespace-nowrap bg-custom-button-bg py-1 px-2 h-fit rounded ${
            pathname === "/pricing" && "underline underline-offset-4"
          }`}
        >
          PREMIUM
        </Link>

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
              width={15}
              height={15}
              className="object-contain border border-custom-button-bg"
            />
            <p className="text-xs">xplodivity</p>
          </Link>
        )}
      </div>
      <Drawer navItems={navItems} />
    </div>
  );
};

export default NavMobile;
