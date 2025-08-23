"use client";

import { useGetAllCategoriesQuery } from "@app/store/services/allcategories";
import Card from "@components/Card/Card";
import { ImageGridContentLoader } from "@components/ImageGridContentLoader";
import Link from "next/link";
import React from "react";

const SearchQuerypage = ({ params }) => {
  const {
    data = [],
    error,
    isLoading,
  } = useGetAllCategoriesQuery({
    query: params.query,
    page: 1,
  });

  return (
    <div className="flex-center flex-col gap-10 pt-28 pb-20 px-4">
      <div className="flex-col flex gap-10">
        <p className="text-3xl font-semibold text-left">
          Search Results for: {decodeURI(params.query)}
        </p>

        <div className="flex flex-wrap justify-center gap-y-4 gap-x-4">
          {isLoading && (
            <div className="grid grid-cols-4 w-full gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(() => {
                return <ImageGridContentLoader />;
              })}
            </div>
          )}

          {!isLoading &&
            data?.data?.map((item) => (
              <Link href={`/explore/${item.blogUrl}`}>
                <Card
                  image={item.descriptionImages[0]}
                  title={item.topicName}
                  tags={item.tags}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchQuerypage;
