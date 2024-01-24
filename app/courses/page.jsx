import CourseCard from "@components/CourseCard";
import Link from "next/link";

import React from "react";

const Courses = () => {
  return (
    <div className="flex flex-wrap justify-center gap-y-4 gap-x-4 p-10">
      <Link href={`/courses/16-js-projects`}>
        <CourseCard />
      </Link>
    </div>
  );
};

export default Courses;
