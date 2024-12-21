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

const Profile = () => {
  const router = useRouter();
  const [emailSent, setIsEmailSent] = useState(false);
  const [openEditProfile, setIsOpenEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logout] = useLazyLogoutUserQuery();
  const [resendEmailVerification] = useLazyResendEmailVerificationQuery();
  const user = useSelector((state) => state.user.currentUser);
  const [savePost] = useSavePostMutation();

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
    <div className="flex-start flex-col gap-12">
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

      <div className="flex flex-wrap justify-center gap-y-4 gap-x-4 p-4 pt-0 pb-8">
        <div className="w-full p-2">
          <h1 className="text-3xl">SAVED POSTS</h1>
        </div>

        {user?.savedPosts?.length === 0 && (
          <p className="text-2xl">You have no saved posts...</p>
        )}

        {user?.savedPosts?.map((item) => (
          <Link href={`/explore/${item?.blogUrl}`}>
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
    </div>
  );
};

export default Profile;
