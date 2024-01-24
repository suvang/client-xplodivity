import VideoPlayer from "@components/VideoPlayer";
import React from "react";

const Course = () => {
  return (
    <div className="text-2xl p-10 h-full w-full flex-col">
      <VideoPlayer />
      <p className="text-custom-text mt-3 underline underline-offset-8 cursor-pointer">
        Click here to get source code
      </p>
    </div>
  );
};

export default Course;
