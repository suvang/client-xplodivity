"use client";

import { useRegisterUserMutation } from "@app/store/services/user";
import TextInput from "@components/TextInput";
import { validateEmail } from "@utils/validation";
import React, { useEffect, useState } from "react";
import GoogleAuthButton from "@components/GoogleAuthButton";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Signup = ({}) => {
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [register] = useRegisterUserMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState({
    message: "",
    error: false,
  });
  const [emailError, setEmailError] = useState({
    message: "",
    error: false,
  });
  const router = useRouter();
  const pathname = usePathname();

  const inputData = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (emailError.error) {
      if (!validateEmail(value.email)) {
        const temp = { ...emailError };
        temp.message = "Please enter a valid email address";
        temp.error = true;
        setEmailError(temp);
      } else {
        const temp = { ...emailError };
        temp.message = "";
        temp.error = false;
        setEmailError(temp);
      }
    }
  }, [value.email]);

  useEffect(() => {
    if (passwordError.error) {
      if (value.password !== value.confirmPassword) {
        setPasswordError({
          ...passwordError,
          message: "Passwords do not match",
          error: true,
        });
      } else if (value.password.length <= 6) {
        setPasswordError({
          ...passwordError,
          message: "Password should have atleast 6 characters or more",
          error: true,
        });
      } else {
        setPasswordError({ ...passwordError, message: "", error: false });
      }
    }
  }, [value.password, value.confirmPassword]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      value.password !== value.confirmPassword ||
      value.password.length <= 6 ||
      !validateEmail(value.email)
    ) {
      if (value.password !== value.confirmPassword) {
        const temp = { ...emailError };
        temp.message = "Passwords do not match";
        temp.error = true;
        setPasswordError(temp);
      }

      if (value.password.length <= 6) {
        const temp = { ...emailError };
        temp.message = "Password should have atleast 6 characters or more";
        temp.error = true;
        setPasswordError(temp);
      }

      if (!validateEmail(value.email)) {
        const temp = { ...emailError };
        temp.message = "Please enter a valid email address";
        temp.error = true;
        setEmailError(temp);
      }

      return;
    }

    try {
      setIsLoading(true);
      const data = {
        email: value.email,
        password: value.password,
      };
      await register(data);
      // setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  }

  return (
    <div className="flex-center flex-col gap-5">
      <GoogleAuthButton
        onClick={() => signIn("google")}
        text="Signup with Google"
      />

      <div className="flex w-full flex-center gap-2">
        <hr className="w-3/6" />
        <p className="text-3xl font-semibold">OR</p>
        <hr className="w-3/6" />
      </div>

      <TextInput
        label="Email"
        name="email"
        type="email"
        onChange={(e) => inputData(e)}
        value={value.email}
      />
      <TextInput
        label="Password"
        name="password"
        type="password"
        onChange={(e) => inputData(e)}
        value={value.password}
      />
      <TextInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        onChange={(e) => inputData(e)}
        value={value.confirmPassword}
      />
      <button className="btn btn-secondary" onClick={(e) => handleSubmit(e)}>
        SIGN UP
      </button>

      <p onClick={() => router.push(`${pathname}?authType=login`)}>
        Already have an account? Log in
      </p>
    </div>
  );
};

export default Signup;
