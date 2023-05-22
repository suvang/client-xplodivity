"use client";

import PricingCard from "@components/PricingCard";
import React from "react";

const Pricing = () => {
  return (
    <div className="w-full flex-center flex-col gap-10 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">Become an awesome developer</h1>
        <p>
          Learn the essential skills for modern fullstack app development while
          having tons of fun in the process.
        </p>
      </div>

      <div className="w-full flex-center gap-10 ">
        <PricingCard />
        <PricingCard />
      </div>
    </div>
  );
};

export default Pricing;
