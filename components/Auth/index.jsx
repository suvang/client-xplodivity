"use client";

import { Modal, ModalContent } from "@nextui-org/modal";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import Login from "./Login";
import Signup from "./SignUp";
import { useRouter } from "next/navigation";

const Auth = () => {
  const searchParams = useSearchParams();
  const authType = searchParams.get("authType");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Modal
      className="bg-custom-background text-white"
      isOpen={authType}
      onOpenChange={() => {
        router.replace(pathname);
      }}
    >
      <ModalContent className="p-8">
        {authType === "login" ? <Login /> : <Signup />}
      </ModalContent>
    </Modal>
  );
};

export default Auth;
