"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ courseItem }) => {
  return (
    <ReactPlayer
      width={"100%"}
      height={"100%"}
      url={courseItem?.videoUrl}
      config={{
        file: {
          attributes: {
            controlsList: "nodownload",
          },
        },
      }}
      onContextMenu={(e) => e.preventDefault()}
      controls={true}
      // light is usefull incase of dark mode
      light={false}
      // picture in picture
      pip={true}
    />
  );
};

export default VideoPlayer;
