"use client";

import { useGetCoursesQuery } from "@app/store/services/courses";
import VideoPlayer from "@components/VideoPlayer";
import React from "react";

const Course = ({ params }) => {
  const { data, error, isLoading } = useGetCoursesQuery({
    url: "16-js-projects",
  });
  const courseId = params.courseid;
  const courseItem = data?.courseContent.find(
    (content) => parseInt(content.id) === parseInt(courseId)
  );

  return (
    <div className="text-2xl p-0 h-full w-full lg:max-w-[700px] lg:p-2 flex-col">
      <VideoPlayer courseItem={courseItem} />
      <p
        onClick={() => window.open(courseItem.sourceCode, "_blank")}
        className="text-custom-text mt-3 underline underline-offset-8 cursor-pointer"
      >
        Click here to get source code
      </p>
    </div>
  );
};

export default Course;
