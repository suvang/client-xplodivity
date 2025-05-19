"use client";

import Mdxtest from "@app/explore/[...topic]/mdxtest";
import { useAddCategoryMutation } from "@app/store/services/allcategories";
import TextInput from "@components/TextInput";
import React, { useRef, useState } from "react";
import ImagePreview from "./ImagePreview";

const btnIds = [
  { id: 1, text: "Video" },
  { id: 2, text: "Article" },
];
const Upload = () => {
  const [active, setActive] = useState({ id: 1, text: "Video" });
  const [articleFormValues, setArticleFormValues] = useState({
    categoryType: "image",
    topicName: "",
    tags: [],
    coverImage: "",
    popular: false,
    description: "",
    subFiles: [],
    blogUrl: "",
    headings: [],
  });
  const [videoFormValues, setVideoFormValues] = useState({
    categoryType: "video",
    tags: [],
    videoId: "",
    popular: false,
    description: "",
    subFiles: [],
    blogUrl: "",
    headings: [],
  });
  const [headings, setHeadings] = useState("");
  const folderId = useRef(new Date().toISOString().replace(/:/g, "-"));
  const [addCategory] = useAddCategoryMutation();
  let formValues =
    active.text === "Article" ? articleFormValues : videoFormValues;
  let setFormValues =
    active.text === "Article" ? setArticleFormValues : setVideoFormValues;

  const handleOverviewDetails = (e) => {
    if (e === "headings") {
      const tempObj = { ...formValues };
      tempObj.headings.push(headings.target.value);
      setFormValues(tempObj);
    } else if (e.target.name === "tags") {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value.split(","),
      });
    } else if (e.target.name === "coverImage") {
      const tempFileObj = e.target.files[0];
      Object.assign(tempFileObj, {
        urlString: URL.createObjectURL(e.target.files[0]),
      });
      setFormValues({
        ...formValues,
        ["coverImage"]: tempFileObj,
      });
    } else if (e.target.name === "subFiles") {
      const tempFormValues = { ...formValues };
      const tempFileObj = e.target.files[0];
      const type = tempFileObj.type.split("/")[1];
      Object.assign(tempFileObj, {
        urlString: URL.createObjectURL(e.target.files[0]),
        customName: `${new Date().toISOString().replace(/:/g, "-")}.${type}`,
      });
      tempFormValues.subFiles.push(tempFileObj);
      setFormValues(tempFormValues);
      e.target.value = null;
    } else {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onFileCloseBtnClick = async (index) => {
    const tempArticleValues = { ...articleFormValues };
    tempArticleValues.subFiles.splice(index, 1);
    setArticleFormValues(tempArticleValues);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (active.text === "Video") {
      formData.append("videoId", `${videoFormValues.videoId}`);

      for (let i = 0; i < videoFormValues.subFiles.length; i++) {
        formData.append(
          i + 1,
          videoFormValues.subFiles[i],
          videoFormValues.subFiles[i].customName
        );
      }

      const newVideoFormValues = JSON.parse(JSON.stringify(videoFormValues));
      delete newVideoFormValues.subFiles;

      formData.append("finalObj", JSON.stringify(newVideoFormValues));

      await addCategory({ formData });

      for (var pair of formData.entries()) {
        console.log("formData", pair[0] + ", " + pair[1]);
      }
      return;
    }

    formData.append(
      "topicName",
      `${articleFormValues.topicName}-${folderId.current}`
    );
    formData.append("coverImage", articleFormValues.coverImage);

    if (active.text === "Article") {
      for (let i = 0; i < articleFormValues.subFiles.length; i++) {
        formData.append(
          "descriptionImage",
          articleFormValues.subFiles[i],
          articleFormValues.subFiles[i].customName
        );
      }
    }

    const newArticleFormValues = { ...articleFormValues };

    delete newArticleFormValues.coverImage;

    if (active.text === "Article") {
      delete newArticleFormValues.subFiles;
    }

    const finalObj = {
      ...newArticleFormValues,
    };

    formData.append("finalObj", JSON.stringify(finalObj));

    addCategory({ formData });
  };

  return (
    <div className="flex-center flex-col gap-5">
      <div>
        <h1 className="text-3xl mb-3">Choose category</h1>

        <div className="flex-evenly gap-2">
          {btnIds.map((btn) => (
            <button
              onClick={() => setActive(btn)}
              className={`btn ${
                active.id === btn.id ? "btn-outline btn-accent" : "btn-accent"
              } `}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-center flex-col gap-3">
        <h1 className="text-3xl mb-3">Post something...</h1>

        {active.text === "Video" ? (
          <div>
            <p>Content details</p>
            <TextInput
              label="videoId"
              name="videoId"
              onChange={handleOverviewDetails}
            />
            <TextInput
              label="Category type"
              name="categoryType"
              onChange={handleOverviewDetails}
            />
            <TextInput
              label="Popular"
              name="popular"
              onChange={handleOverviewDetails}
            />
            <TextInput
              label="Add Story Tags"
              name="tags"
              onChange={handleOverviewDetails}
            />
            <TextInput
              label="Blog url"
              name="blogUrl"
              onChange={handleOverviewDetails}
            />
            <div>
              <TextInput
                label="headings"
                name="headings"
                onChange={setHeadings}
              />
              <button
                className="btn btn-accent"
                onClick={() => handleOverviewDetails("headings")}
              >
                ADD HEADING
              </button>
              {videoFormValues.headings.map((item) => {
                return <p>{item}</p>;
              })}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Description image</span>
              </label>
              <input
                type="file"
                name="subFiles"
                onChange={handleOverviewDetails}
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex-center gap-2">
              {videoFormValues.subFiles.map((file, index) => (
                <ImagePreview
                  file={file}
                  index={index}
                  onFileCloseBtnClick={onFileCloseBtnClick}
                />
              ))}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Bio"
                name="description"
                onChange={handleOverviewDetails}
              ></textarea>
            </div>
          </div>
        ) : (
          <>
            <div>
              <p>Overview details</p>
              <TextInput
                label="Category type"
                name="categoryType"
                onChange={handleOverviewDetails}
              />
              <TextInput
                label="Topic Name"
                name="topicName"
                onChange={handleOverviewDetails}
              />
              <TextInput
                label="Add Story Tags"
                name="tags"
                onChange={handleOverviewDetails}
              />
              <TextInput
                label="Popular"
                name="popular"
                onChange={handleOverviewDetails}
              />
              <TextInput
                label="Blog url"
                name="blogUrl"
                onChange={handleOverviewDetails}
              />
              <div>
                <TextInput
                  label="headings"
                  name="headings"
                  onChange={setHeadings}
                />
                <button
                  className="btn btn-accent"
                  onClick={() => handleOverviewDetails("headings")}
                >
                  ADD HEADING
                </button>
                {articleFormValues.headings.map((item) => {
                  return <p>{item}</p>;
                })}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Add cover image</span>
                </label>
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleOverviewDetails}
                  className="file-input file-input-bordered w-full max-w-xs"
                />

                {articleFormValues.coverImage !== "" && (
                  <ImagePreview
                    file={articleFormValues.coverImage}
                    index={0}
                    onFileCloseBtnClick={() =>
                      setArticleFormValues({
                        ...articleFormValues,
                        coverImage: "",
                      })
                    }
                  />
                )}
              </div>
            </div>

            <div>
              <p>Content details</p>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Description image</span>
                </label>
                <input
                  type="file"
                  name="subFiles"
                  onChange={handleOverviewDetails}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>

              <div className="flex-center gap-2">
                {articleFormValues.subFiles.map((file, index) => (
                  <ImagePreview
                    file={file}
                    index={index}
                    onFileCloseBtnClick={onFileCloseBtnClick}
                  />
                ))}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Bio"
                  name="description"
                  onChange={handleOverviewDetails}
                ></textarea>
              </div>
            </div>
          </>
        )}

        <article className="prose prose-DEFAULT">
          <Mdxtest source={formValues.description} />
        </article>

        <button className="btn btn-accent" onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Upload;
