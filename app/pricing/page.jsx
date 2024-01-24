"use client";

import PricingCard from "@components/PricingCard";
import React from "react";

const Pricing = () => {
  return (
    <div className="w-full flex-center flex-col gap-10 text-center">
      {/* <div>
        <h1 className="text-3xl font-bold mb-2">Become an awesome developer</h1>
        <p>
          Learn the essential skills for modern fullstack app development while
          having tons of fun in the process.
        </p>
      </div>

      <div className="w-full flex-center gap-10 max-md:flex-col max-[400px]:w-11/12">
        <PricingCard />
        <PricingCard />
      </div> */}

      <p className="text-6xl font-bold">PREMIUM ACCESS COMING SOON...</p>

      <div className="flex flex-col gap-5">
        <p className="text-3xl font-semibold">WHAT YOU WILL GET:</p>
        <div className="text-2xl text-left border-2 p-4 rounded-md flex flex-col gap-4 border-custom-button-bg">
          <p>Unlimited access to PRO courses 📹</p>
          <p>Access to premium indepth articles 📝</p>
          <p>Access to complete Interview preparation series 👨‍💻</p>
          <p>And more... 💡</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
