"use client";

import { useGetAllCategoriesQuery } from "@app/store/services/allcategories";
import Card from "@components/Card";
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
    <div className="grid grid-cols-4 gap-4">
      {!isLoading &&
        data?.data?.map((item) => (
          <Link href={`/explore/${item.blogUrl}`}>
            <Card image={item.image} title={item.topicName} tags={item.tags} />
          </Link>
        ))}
    </div>
  );
};

export default SearchQuerypage;
