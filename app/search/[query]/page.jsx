"use client";

import { useGetAllCategoriesQuery } from "@app/store/services/allcategories";
import Card from "@components/Card/Card";
import { ImageGridContentLoader } from "@components/ImageGridContentLoader";
import Link from "next/link";
import React from "react";

const SearchQuerypage = ({ params }) => {
  console.log("params", params.query);
  const {
    data = [],
    error,
    isLoading,
  } = useGetAllCategoriesQuery({
    query: params.query,
    page: 1,
    filter: "",
    type: "image",
  });

  return (
    <div className="flex-col flex gap-10">
      <p className="text-3xl font-semibold text-left">
        Search Results for: {decodeURI(params.query)}
      </p>

      {isLoading && (
        <div className="grid grid-cols-4 w-full gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
            return <ImageGridContentLoader />;
          })}
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {!isLoading &&
          data?.data?.map((item) => (
            <Link href={`/explore/${item.blogUrl}`}>
              <Card
                image={item.image}
                title={item.topicName}
                tags={item.tags}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchQuerypage;
