import Image from "next/image";
import React from "react";

const Carousel = ({ images }) => {
  return (
    <div className="carousel flex gap-3 h-full">
      {images?.map((image) => (
        <div className="carousel-item">
          <Image
            src={`http://localhost:5000/${image.thumbnail}`}
            width={600}
            height={400}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
