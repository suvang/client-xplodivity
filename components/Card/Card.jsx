import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";

const Card = ({ image, title, tags, savePost, id, categoryType }) => {
  const [save, setSave] = useState("");
  const [imageError, setImageError] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const hasValidImage = Boolean(image?.trim?.()) && !imageError;

  useEffect(() => {
    setImageError(false);
  }, [image]);

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
    e.stopPropagation();
    if (!user) {
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

    return save;
  };

  return (
    <div className={`${styles.card} rounded-lg overflow-hidden bg-custom-card-bg`}>
      <div className={`${styles.media} flex-shrink-0`}>
        {hasValidImage ? (
          <img
            src={`https://${image}`}
            alt={title || "Post preview"}
            className={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderText}>No preview</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h1 className="break-words text-base font-medium line-clamp-2 flex-shrink-0">
          {title}
        </h1>

        <div className="text-xs flex-center gap-2 flex-shrink-0 self-start">
          <p className="bg-green-500 py-0.5 px-1 font-medium rounded">FREE</p>
          <p
            onClick={handleSavePost}
            className="text-sm flex-center rounded-full border-solid border border-custom-text w-5 h-5"
          >
            {buttonText()}
          </p>
        </div>

        {tags?.length > 0 && (
          <div className={styles.tagsScroll}>
            {tags.map((tag, index) => (
              <div
                key={`${tag}-${index}`}
                className={`badge bg-custom-button-bg text-custom-text text-xs ${styles.tag}`}
              >
                #{tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
