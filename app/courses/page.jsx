"use client";

import { useGetCoursesQuery } from "@app/store/services/courses";
import CourseCard from "@components/CourseCard";
import Link from "next/link";
import React from "react";

const Courses = () => {
  const { data = [], error, isLoading } = useGetCoursesQuery({});

  return (
    <div className="pt-24 pb-14">
      <h1 className="text-4xl font-medium text-center px-4 pt-6 underline underline-offset-4">
        Member-only content
      </h1>

      <div className="flex flex-wrap justify-center gap-y-4 gap-x-4 p-10">
        <Link href={`/courses/16-js-projects`}>
          {data?.map((course) => (
            <CourseCard course={course} />
          ))}
        </Link>
      </div>
    </div>
  );
};

export default Courses;
