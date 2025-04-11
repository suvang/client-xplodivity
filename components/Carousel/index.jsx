import React from "react";

const Carousel = ({ images }) => {
  return (
    <div className="carousel carousel-center w-full flex overflow-auto max-w-full max-md:max-w-md space-x-4">
      {images?.map((image, index) => (
        <div className="carousel-item">
          <img
            src={image.thumbnail}
            className="rounded-box max-w-[500px] max-h-[275px] max-md:max-w-[350px] max-md:w-full max-md:h-[220px]"
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
