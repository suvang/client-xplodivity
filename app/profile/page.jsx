"use client";

import { useLazyLogoutUserQuery } from "@app/store/services/user";
import Modal from "@components/Modal";
import TextInput from "@components/TextInput";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [trigger] = useLazyLogoutUserQuery();
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="flex-start flex-col gap-12">
      <div className="flex-start flex-col gap-3">
        <p>Email: {user?.email}</p>
        <p>Total Posts saved: {user?.savedPosts.length}</p>
        <label
          htmlFor="my-modal-3"
          className="w-full text-custom-text btn btn-secondary"
        >
          EDIT PROFILE
        </label>
        <button className="btn btn-error">VERIFY ACCOUNT</button>
        <button onClick={() => trigger()} className="btn btn-error">
          LOGOUT
        </button>
      </div>

      <Modal>
        <div className="flex-center flex-col gap-4">
          <h1 className="text-3xl">EDIT PROFILE</h1>
          <TextInput label="Current password" />
          <TextInput label="New password" />
          <button className="btn btn-success">SAVE</button>
          <button className="btn btn-error">DELETE ACCOUNT</button>
        </div>
      </Modal>

      <div className="w-full">
        <h1 className="text-3xl">SAVED POSTS</h1>
      </div>
    </div>
  );
};

export default Profile;
