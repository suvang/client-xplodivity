"use client";

import React, { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "@app/store/services/allcategories";
import { useSavePostMutation } from "@app/store/services/post";
import Card from "@components/Card/Card";
import Pagination from "@components/Pagination";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLazyVerifyEmailQuery } from "@app/store/services/user";

const Explore = ({ params }) => {
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
  const [savePost] = useSavePostMutation();
  const pathname = usePathname();
  const router = useRouter();
  const [verifyEmail] = useLazyVerifyEmailQuery();

  useEffect(() => {
    const id = params[0];
    const token = params[1];

    const verify = async () => {
      if (pathname.includes("/explore") && id && token) {
        const res = await verifyEmail({ id, token }).unwrap();

        if (res.emailVerified) {
          router.push("/explore");
        }
      }
    };

    if (id && token) {
      verify();
    }
  }, [pathname]);

  return (
    <div className="flex-center flex-col gap-10">
      <div className="grid grid-cols-4 gap-x-4 gap-y-8 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3">
        {!isLoading &&
          data?.data?.map((item) => (
            <Link href={`/explore/${item.blogUrl}`}>
              <Card
                image={item.image}
                title={item.topicName}
                tags={item.tags}
                id={item._id}
                categoryType={item.categoryType}
                savePost={savePost}
              />
            </Link>
          ))}
      </div>

      <div className="mb-10">
        <Pagination
          totalPages={data.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Explore;
