"use client";

import { Modal, ModalContent } from "@nextui-org/modal";
import { useSearchParams } from "next/navigation";
import React from "react";
import Login from "./Login";
import Signup from "./SignUp";

const Auth = () => {
  const searchParams = useSearchParams();
  const authType = searchParams.get("authType");

  return (
    <Modal
      className="bg-custom-background text-white"
      isOpen={authType}
      onOpenChange={() => searchParams.delete("authType")}
    >
      <ModalContent className="p-8">
        {authType === "login" ? <Login /> : <Signup />}
      </ModalContent>
    </Modal>
  );
};

export default Auth;
