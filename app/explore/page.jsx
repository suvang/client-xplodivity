"use client";

import { useGetAllCategoriesQuery } from "@app/store/services/allcategories";
import Card from "@components/Card";
import Pagination from "@components/Pagination";
import Link from "next/link";
import React, { useState } from "react";

const Explore = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data = [],
    error,
    isLoading,
  } = useGetAllCategoriesQuery({
    query: "",
    page: currentPage,
    filter: "",
    type: "allcategory",
  });

  return (
    <div className="flex-center flex-col gap-10">
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
      <Pagination
        totalPages={data.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Explore;
