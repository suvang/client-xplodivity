"use client";

import React, { useEffect, useState } from "react";
import TextInput from "@components/TextInput";
import { usePathname, useRouter } from "next/navigation";
import { useVerifyResetPasswordLinkMutation } from "@app/store/services/user";

const ResetPassword = ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isTokenverified, setIsTokenVerified] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const id = params[0];
  const token = params[1];
  const [verifyResetPasswordLink] = useVerifyResetPasswordLinkMutation();

  useEffect(() => {
    const verify = async () => {
      const res = await verifyResetPasswordLink({ id, token }).unwrap();

      if (!res.verified) {
        setIsTokenVerified(false);
      }
    };

    verify();
  }, [pathname]);

  useEffect(() => {
    let timeout;

    if (showText) {
      timeout = setTimeout(() => {
        router.push("/explore");
      }, 1500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showText]);

  const handleResetPassword = async () => {
    if (
      password !== "" &&
      confirmPassword !== "" &&
      password !== confirmPassword
    ) {
      return;
    }

    setIsLoading(true);
    const res = await dispatch(
      verifyResetPasswordLink({ id, token, password })
    );

    setIsLoading(false);

    if (res.payload.reset) {
      setShowText(true);
    }
  };
  return (
    <div>
      {!isTokenverified || showText ? (
        showText ? (
          <p>Your password has been reset.</p>
        ) : (
          <p>
            The reset password link has expired. Please click on login/signup
            and then forgot password to generate link again.
          </p>
        )
      ) : (
        <>
          <p>Reset password</p>
          <div>
            <p>Password</p>
            <TextInput
              name="Password"
              type="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <p>Confirm password</p>
            <TextInput
              name="password"
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          {password?.length >= 6 &&
            confirmPassword !== "" &&
            (password === confirmPassword ? (
              <p>Your passwords match</p>
            ) : (
              <p>Your passwords do not match</p>
            ))}
          <div>
            <button onClick={handleResetPassword} className="btn btn-accent">
              RESET
            </button>
          </div>
          {showText && <p>Your password has been reset.</p>}
        </>
      )}
    </div>
  );
};

export default ResetPassword;
