import React from "react";

const ImagePreview = ({ onFileCloseBtnClick, file, index }) => {
  return (
    <div>
      <div right="10px" onClick={() => onFileCloseBtnClick(index)}>
        x
      </div>

      <img
        style={{
          width: "80px",
          height: "80px",
          marginRight: "20px",
          objectFit: "cover",
          borderRadius: "5px",
        }}
        src={file.urlString}
        alt="..."
      />

      <p className="text-xs">{file.customName}</p>
    </div>
  );
};

export default ImagePreview;
