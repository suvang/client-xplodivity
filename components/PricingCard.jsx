import React from "react";

const PricingCard = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body flex-center gap-5">
        <h1 className="card-title text-3xl">
          $29/Month
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h1>

        <div className="flex-start flex-col gap-2">
          <p>Unlimited access to PRO courses</p>
          <p>Quizzes with hand-picked meme prizes</p>
          <p>Invite to private Discord chat</p>
          <p>Free Sticker mailed to your door</p>
        </div>
        <button className="btn btn-secondary">BUY NOW</button>
      </div>
    </div>
  );
};

export default PricingCard;
