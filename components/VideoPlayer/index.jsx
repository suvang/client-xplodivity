"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  //video path
  let videosrc = "https://www.youtube.com/watch?v=8dYC3NQK6ns";

  return (
    <ReactPlayer
      // width={"100%"}
      // height={"100%"}
      url={videosrc}
      controls={true}
      // light is usefull incase of dark mode
      light={false}
      // picture in picture
      pip={true}
    />
  );
};

export default VideoPlayer;
