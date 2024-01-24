import React from "react";

const GoogleAuthButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="flex-center text-slate-700 hover:text-slate-900 hover:shadow transition duration-150"
    >
      <div className="border-r-2 py-2 px-3 bg-custom-text rounded-l-lg">
        <img
          class="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
      </div>

      <span className="text-custom-text py-2 px-6 bg-[#4285F4] rounded-r-lg">
        {text}
      </span>
    </button>
  );
};

export default GoogleAuthButton;
