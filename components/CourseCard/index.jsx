import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const CourseCard = ({ course }) => {
  const user = useSelector((state) => state.user?.currentUser);
  const purchasedCourse = user?.purchasedCourses?.find(
    (purchasedCourse) => purchasedCourse?.courseId === course?._id
  );

  const calculateTimeRemaining = (expiresAt) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry - now;
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);

    return `${months} month${months > 1 ? "s" : ""} remaining`;
  };

  const formatExpiryDate = (expiresAt) => {
    return new Date(expiresAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
          <p className="text-3xl">₹{course.price}</p>
          <p className="text-base line-through text-gray-400">
            ₹{course.fullPrice}
          </p>
          <p className="bg-green-500 py-0.5 px-1 font-medium rounded">
            {course.discount}
          </p>
        </div>

        <div>
          {course?.tags?.map((tag) => (
            <p className="bg-yellow-500 py-0.5 px-2 text-xs font-medium rounded text-black">
              #{tag}
            </p>
          ))}
        </div>

        {purchasedCourse && (
          <div className="mt-1 border-t w-full border-gray-700 pt-2">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-500 font-medium">Purchased</span>
              </span>
              <div className="flex flex-col text-xs gap-0.5 text-gray-400">
                <span>
                  Expires on {formatExpiryDate(purchasedCourse.expiresAt)}
                </span>
                <span className="text-red-400">
                  {calculateTimeRemaining(purchasedCourse.expiresAt)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
