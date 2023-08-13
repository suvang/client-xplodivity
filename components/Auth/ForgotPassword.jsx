import { useForgotPasswordEmailLinkMutation } from "@app/store/services/user";
import TextInput from "@components/TextInput";
import React, { useState } from "react";

const ForgotPassword = ({ setForgotPassword }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [showLinkText, setShowLinktext] = useState(false);
  const [forgotPasswordEmailLink] = useForgotPasswordEmailLinkMutation();

  const handleSearch = async () => {
    setIsLoading(true);
    const res = await forgotPasswordEmailLink({ email: value });
    setIsLoading(false);

    if (res.emailFound) {
      return setShowLinktext(
        <>
          A link has been sent to your email. Click on the link sent to your
          email to reset your password.
        </>
      );
    }

    if (!res.emailFound) {
      return setShowLinktext(
        <>
          There is no account registered with this email in the website. Please
          enter a valid registered email.
        </>
      );
    }

    return setShowLinktext(<>Error occurred. Please try after some time.</>);
  };

  return (
    <div className="flex-center flex-col gap-3">
      <h1>Find Your Account</h1>
      <p>Please enter your email address to search for your account.</p>
      <TextInput
        label="Email"
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="flex-center gap-3">
        <button
          onClick={() => setForgotPassword(false)}
          className="btn btn-secondary"
        >
          GO BACK
        </button>
        <button className="btn btn-secondary" onClick={handleSearch}>
          SEARCH
        </button>
      </div>

      {showLinkText && showLinkText}
    </div>
  );
};

export default ForgotPassword;
