import React from "react";

const Courses = () => {
  return (
    <a
      className="flex items-center flex-col gap-5"
      target="_blank"
      href="https://www.youtube.com/@xplodivity/videos"
    >
      <div className="text-8xl">⏰</div>

      <div className="mockup-code bg-red-600 ">
        <pre
          data-prefix=""
          className="text-primary-content font-bold mb-5 mt-5"
        >
          <code className="text-5xl">COURSES COMING SOON...</code>
        </pre>

        <pre className="text-primary-content font-bold text-2xl mb-3">
          What you'll get:
        </pre>
        <pre data-prefix=">" className="text-warning font-bold text-2xl">
          <code className="text-3xl">Exciting projects 🔖</code>
        </pre>
        <pre data-prefix=">" className="text-success font-bold text-2xl">
          <code className="text-3xl">Long tutorials 📹</code>
        </pre>
        <pre
          data-prefix=">"
          className="text-primary-content font-bold text-2xl"
        >
          <code className="text-3xl">Information packed 📚</code>
        </pre>
        <pre data-prefix=">" className="text-info font-bold text-2xl">
          <code className="text-3xl">Easy to understand 💡</code>
        </pre>
        {/* <pre data-prefix=">" className="text-warning font-bold">
          <code>Tech Insights & News</code>
        </pre> */}
        <pre data-prefix=">" className="text-accent font-bold text-2xl">
          <code className="text-3xl">And more... 📈</code>
        </pre>
      </div>
    </a>
  );
};

export default Courses;
