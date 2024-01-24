import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { TiTick } from "react-icons/ti";

const CourseCard = ({ image, title }) => {
  return (
    <div className={`w-[320px] rounded-lg bg-custom-card-bg `}>
      <Image
        src="https://i.ytimg.com/vi/coZucJEvsSk/maxresdefault.jpg"
        alt="logo"
        width={384}
        height={100}
        className={`object-contain rounded-t-lg ${styles.image}`}
      />

      <div className="py-3 px-3 flex-start flex-col gap-4">
        <h1 className="break-words text-base font-medium">
          Build 16 Medium/Hard JavaScript Projects for Frontend Machine coding
          Interview rounds
        </h1>

        <div className="text-xs flex-center gap-2">
          <p className="text-3xl">$10</p>
          <p className="text-base line-through text-gray-400">$20</p>
          <p className="bg-green-500 py-0.5 px-1 font-medium rounded">
            50% OFF
          </p>
        </div>

        <div>
          <p className="bg-yellow-500 py-0.5 px-2 text-xs font-medium rounded text-black">
            #JavaScript
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
