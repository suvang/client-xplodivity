import React from "react";

export default function AboutUs() {
  return (
    <section className="py-16 px-8 pt-28 pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-6">Welcome to Xplodivity</h1>
        <p className="text-lg leading-relaxed mb-8">
          Your go-to destination for mastering programming, web development, and
          JavaScript.
        </p>
        <p className="text-lg leading-relaxed mb-8">
          The mission is to demystify complex coding concepts, making them
          accessible and engaging for people at all levels.
        </p>
        <a
          href="https://www.youtube.com/@xplodivity"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg mb-8"
        >
          Visit My YouTube Channel
        </a>
        <div className="text-left mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            By subscribing, you'll gain access to:
          </h2>
          <ul className="list-disc list-inside space-y-4">
            <li className="text-lg">
              In-Depth Tutorials: Step-by-step guides on various programming
              languages and frameworks.
            </li>
            <li className="text-lg">
              Project-Based Learning: Hands-on projects to reinforce your
              understanding.
            </li>
            <li className="text-lg">And more...</li>
          </ul>
        </div>
        <p className="text-lg mt-12">
          Join our growing community of developers and take the next step in
          your programming journey with Xplodivity.
        </p>
      </div>
    </section>
  );
}
