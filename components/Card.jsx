import React from "react";
import Image from "next/image";

const Card = ({ image, title, tags }) => {
  return (
    <div className="bg-neutral-800 w-80 rounded-lg h-96">
      <Image
        src={`http://localhost:5000/${image}`}
        alt="logo"
        width={320}
        height={150}
        className="object-contain rounded-t-lg h-56 w-full"
      />

      <div className="p-5 flex-start flex-col gap-5">
        <h1 className="break-words text-xl font-bold">{title}</h1>

        <div className="flex-start gap-2 text-sm">
          {tags.map((tag) => (
            <span>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
