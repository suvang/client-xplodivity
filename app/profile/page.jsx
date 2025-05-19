"use client";

import { useSavePostMutation } from "@app/store/services/post";
import {
  useLazyLogoutUserQuery,
  useLazyResendEmailVerificationQuery,
} from "@app/store/services/user";
import Card from "@components/Card/Card";
import TextInput from "@components/TextInput";
import { Modal, ModalContent } from "@nextui-org/modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import withAuth from "@utils/withAuth";
import { Tabs, Tab } from "@nextui-org/tabs";
import CourseCard from "@components/CourseCard";
import { useGetCoursesQuery } from "@app/store/services/courses";

const Profile = () => {
  const router = useRouter();
  const [emailSent, setIsEmailSent] = useState(false);
  const [openEditProfile, setIsOpenEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logout] = useLazyLogoutUserQuery();
  const [resendEmailVerification] = useLazyResendEmailVerificationQuery();
  const user = useSelector((state) => state.user.currentUser);
  const [savePost] = useSavePostMutation();
  const { data: courses = [], error, isLoading } = useGetCoursesQuery({});
  const purchasedCourses = courses?.filter((course) =>
    user?.purchasedCourses?.some(
      (purchasedCourse) => purchasedCourse.courseId == course._id
    )
  );

  const handleLogout = async () => {
    await signOut({ redirect: false });
    await logout();
    router.push("/explore");
  };

  const handleVerifyEmail = async () => {
    setLoading(true);
    const res = await resendEmailVerification().unwrap();

    if (res.emailSent) {
      setIsEmailSent(true);
    }

    setLoading(false);
  };

  return (
    <div className="flex-start flex-col gap-12 pt-28 pb-20">
      <div className="flex-start flex-col gap-3 p-8 pb-2">
        <p>Email: {user?.email}</p>
        <p>Total Posts saved: {user?.savedPosts.length}</p>
        <label
          onClick={() => setIsOpenEditProfile(true)}
          className="text-custom-text btn bg-custom-button-bg hover:bg-sky-500"
        >
          EDIT PROFILE
        </label>

        {!user?.emailVerified && (
          <>
            <button
              onClick={handleVerifyEmail}
              disabled={loading}
              className="btn bg-rose-500 text-custom-text hover:bg-rose-600"
            >
              VERIFY ACCOUNT
            </button>
            {emailSent && (
              <p>link to verify account has been sent to your email</p>
            )}
          </>
        )}

        <button
          onClick={handleLogout}
          className="btn text-custom-text bg-custom-button-bg hover:bg-rose-600"
        >
          LOGOUT
        </button>
      </div>

      <Modal
        isOpen={openEditProfile}
        onOpenChange={() => setIsOpenEditProfile(false)}
        className="bg-custom-background text-white"
      >
        <ModalContent>
          <div className="flex-center flex-col gap-4">
            <h1 className="text-3xl">EDIT PROFILE</h1>
            {user?.password && (
              <>
                <TextInput label="Current password" />
                <TextInput label="New password" />
                <button className="btn bg-green-500 hover:bg-green-400 text-custom-text">
                  SAVE
                </button>
              </>
            )}

            <button className="btn bg-rose-600 hover:bg-rose-500 text-custom-text">
              DELETE ACCOUNT
            </button>
          </div>
        </ModalContent>
      </Modal>

      <div className="w-full max-w-[1400px] mx-auto px-4">
        <Tabs
          aria-label="Profile sections"
          className="w-full"
          variant="underlined"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#22d3ee]",
          }}
        >
          <Tab
            key="courses"
            title={
              <div className="flex items-center space-x-2">
                <span>My Courses</span>
              </div>
            }
          >
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              {(!user?.purchasedCourses ||
                user?.purchasedCourses?.length === 0) && (
                <p className="text-2xl">
                  You haven't purchased any courses yet...
                </p>
              )}

              {purchasedCourses?.map((course) => (
                <Link
                  href={`/courses/${course?.courseId}`}
                  key={course?.courseId}
                >
                  <CourseCard course={course} />
                </Link>
              ))}
            </div>
          </Tab>

          <Tab
            key="saved"
            title={
              <div className="flex items-center space-x-2">
                <span>Saved Posts</span>
              </div>
            }
          >
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              {user?.savedPosts?.length === 0 && (
                <p className="text-2xl">You have no saved posts...</p>
              )}

              {user?.savedPosts?.map((item) => (
                <Link href={`/explore/${item?.blogUrl}`} key={item?._id}>
                  <Card
                    image={item?.image}
                    title={item?.topicName}
                    tags={item?.tags}
                    id={item?._id}
                    categoryType={item?.categoryType}
                    savePost={savePost}
                  />
                </Link>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default withAuth(Profile);
