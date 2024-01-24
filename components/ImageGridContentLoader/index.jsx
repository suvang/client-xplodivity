/* eslint-disable import/prefer-default-export */
import React from "react";
import ContentLoader from "react-content-loader";

export function ImageGridContentLoader() {
  return (
    <ContentLoader
      viewBox="0 0 355 255"
      height={250}
      speed={1}
      backgroundColor="#354b91"
      foregroundColor="#4c65b5"
    >
      <rect x="3" y="3" rx="10" ry="10" width="350" height="250" />
    </ContentLoader>
  );
}
