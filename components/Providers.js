"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const GoogleProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default GoogleProvider;
