import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { TiTick } from "react-icons/ti";

const CourseCard = ({ course }) => {
  return (
    <div className={`w-[320px] rounded-lg bg-custom-card-bg `}>
      <Image
        src={course.thumbnail}
        alt="logo"
        width={384}
        height={100}
        className={`object-contain rounded-t-lg`}
      />

      <div className="py-3 px-3 flex-start flex-col gap-4">
        <h1 className="break-words text-base font-medium">
          {course.courseName}
        </h1>

        <div className="text-xs flex-center gap-2">
          <p className="text-3xl">${course.price}</p>
          <p className="text-base line-through text-gray-400">
            ${course.fullPrice}
          </p>
          <p className="bg-green-500 py-0.5 px-1 font-medium rounded">
            {course.discount}
          </p>
        </div>

        <div>
          {course.tags.map((tag) => (
            <p className="bg-yellow-500 py-0.5 px-2 text-xs font-medium rounded text-black">
              #{tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
