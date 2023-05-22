import React from "react";

const TextInput = ({ label, name, type, value, onChange }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};

export default TextInput;
