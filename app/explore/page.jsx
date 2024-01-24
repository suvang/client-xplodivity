"use client";

import React, { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "@app/store/services/allcategories";
import { useSavePostMutation } from "@app/store/services/post";
import Card from "@components/Card/Card";
import Pagination from "@components/Pagination";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useLazyGetCurrentUserDetailsQuery,
  useVerifyEmailMutation,
} from "@app/store/services/user";
import { ImageGridContentLoader } from "@components/ImageGridContentLoader";

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
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const [verifyEmail] = useVerifyEmailMutation();
  const [getUserDetails] = useLazyGetCurrentUserDetailsQuery();

  useEffect(() => {
    const verify = async () => {
      if (pathname.includes("/explore") && id && token) {
        const res = await verifyEmail({ id, token }).unwrap();

        if (res?.emailVerified) {
          await getUserDetails({}, false);
          router.push("/explore");
        }
      }
    };

    if (id && token) {
      verify();
    }
  }, [pathname]);

  return (
    <div className="flex-center flex-col gap-10 p-10">
      <div className="flex flex-wrap justify-center gap-y-4 gap-x-4">
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8].map(() => {
            return <ImageGridContentLoader />;
          })}

        {!isLoading && (
          <>
            {data?.data?.map((item) => (
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
          </>
        )}
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
