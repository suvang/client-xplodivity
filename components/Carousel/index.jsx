import React from "react";

const Carousel = ({ images }) => {
  return (
    <div className="carousel flex gap-3 h-full">
      {images?.map((image) => (
        <div className="carousel-item">
          <img src={image.thumbnail} width={600} height={400} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
