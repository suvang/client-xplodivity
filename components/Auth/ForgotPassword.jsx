import TextInput from "@components/TextInput";
import React from "react";

const ForgotPassword = ({ setForgotPassword }) => {
  return (
    <div className="flex-center flex-col gap-3">
      <h1>Find Your Account</h1>
      <p>Please enter your email address to search for your account.</p>
      <TextInput label="Email" />

      <div className="flex-center gap-3">
        <button
          onClick={() => setForgotPassword(false)}
          className="btn btn-secondary"
        >
          GO BACK
        </button>
        <button className="btn btn-secondary">SEARCH</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
