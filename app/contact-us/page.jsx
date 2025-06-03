import React from "react";

const ContactUs = () => {
  return (
    <div className="flex flex-col gap-6 p-8 pt-28 pb-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Contact Us</h1>

      <div className="flex flex-col gap-4">
        <p className="text-lg text-gray-300">
          If you have any additional questions, feel free to drop us a mail at{" "}
          <a
            href="mailto:xplodivity.mail@gmail.com"
            className="text-sky-500 hover:text-sky-400 transition-colors"
          >
            xplodivity.mail@gmail.com
          </a>
        </p>

        <div className="mt-4 p-6 bg-gray-800/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">xplodivity</h2>
          <address className="text-gray-300 not-italic">
            Building No. 5, 2nd Cross Rd, Rajiv Gandhi Nagar, Near HSR sector 6
            <br />
            Bangalore, Karnataka – 560068
            <br />
            India
          </address>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
