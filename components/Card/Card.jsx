import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";

const Card = ({ image, title, tags, savePost, id, categoryType }) => {
  const [save, setSave] = useState("");
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      if (user?.savedPosts?.find((item) => item?._id === id)) {
        setSave(<TiTick />);
      } else {
        setSave("+");
      }
    }
  }, [user]);

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!user) {
      console.log("login first");
      return;
    }

    if (save === "+") {
      setSave(<TiTick />);
    } else {
      setSave("+");
    }

    const res = await savePost({ postId: id, type: categoryType }).unwrap();

    if (res.isSaved) {
      setSave("+");
    } else {
      setSave(<TiTick />);
    }
  };

  const buttonText = () => {
    if (!user) {
      return "+";
    }

    // if (location.pathname.includes("/profile")) {
    //   return "UNSAVE";
    // }

    return save;
  };

  return (
    <div className={`w-[320px] rounded-lg h-80 bg-custom-card-bg `}>
      <Image
        src={`http://localhost:5000/${image}`}
        alt="logo"
        width={384}
        height={100}
        className={`object-contain rounded-t-lg ${styles.image}`}
      />

      <div className="py-2 px-3 flex-start flex-col gap-3.5">
        <h1 className="break-words text-base font-medium">{title}</h1>

        <div className="text-xs flex-center gap-2">
          <p className="bg-green-500 py-0.5 px-1 font-medium rounded">FREE</p>
          <p
            onClick={handleSavePost}
            className="text-sm flex-center rounded-full border-solid border border-custom-text w-5 h-5"
          >
            {buttonText()}
          </p>
        </div>

        <div className="flex-start gap-2">
          {tags?.map((tag) => (
            <div className="badge bg-custom-button-bg text-custom-text text-xs">
              #{tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
