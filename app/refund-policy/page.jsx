import React from "react";

const RefundPolicy = () => {
  return (
    <div className="flex flex-col gap-6 p-8 pt-28 pb-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Refund/Cancellation Policy</h1>

      <div className="flex flex-col gap-4">
        <p className="text-lg">
          You may be eligible for a refund under the following specific
          conditions:
        </p>

        <div className="flex flex-col gap-3 pl-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Course Assignment Issue</h2>
            <p className="text-gray-300">
              If the course you purchased has not been assigned to your account
              within 10 days from the date of purchase, and you are still within
              the course's validity or expiration period, you are entitled to
              request a refund.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Duplicate Payment</h2>
            <p className="text-gray-300">
              If you have been charged twice for the same course, we will verify
              and issue a refund for the duplicate transaction.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
          <p className="text-gray-300">
            Please note that outside of these two scenarios, no refund requests
            will be entertained. This is due to the nature of the product being
            a digital course, which provides immediate access to learning
            materials and cannot be "returned" once accessed or assigned.
          </p>
        </div>

        <p className="text-gray-300 mt-2">
          We encourage you to review your purchase details carefully and reach
          out to our support team promptly if any of the above situations apply.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
