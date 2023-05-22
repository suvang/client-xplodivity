import TextInput from "@components/TextInput";
import React from "react";

const Signup = ({ setIsLoginView }) => {
  return (
    <div className="flex-center flex-col gap-5">
      <TextInput label="Name" name="Name" type="Name" />
      <TextInput label="Email" name="Email" type="Email" />
      <TextInput label="Password" name="Password" type="Password" />
      <TextInput
        label="Confirm Password"
        name="Confirm Password"
        type="Password"
      />
      <button className="btn btn-secondary">SIGN UP</button>

      <p onClick={() => setIsLoginView(true)}>
        Already have an account? Log in
      </p>
    </div>
  );
};

export default Signup;
