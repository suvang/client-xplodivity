import Mdxtest from "@app/explore/[...topic]/mdxtest";
import Button from "@components/Button";
import Carousel from "@components/Carousel";
import { Modal, ModalContent } from "@nextui-org/modal";
import Image from "next/image";
import Script from "next/script";
import React from "react";

const Overview = ({
  courseDetails,
  handlePayment,
  handleOverviewDetails,
  hasPurchased,
  user,
  formValues,
}) => {
  return (
    <div className="flex flex-col p-10 gap-6 w-full">
      <Modal>
        <ModalContent>You have purchased the course</ModalContent>
      </Modal>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="flex flex-col gap-5 h-[450px]">
        <Carousel images={courseDetails.courseContent} />

        <p className="text-3xl font-bold">{courseDetails.courseName}</p>

        {!hasPurchased && (
          <Button
            className="w-52 rounded-sm border-none text-xl hover:bg-custom-button-bg-hover bg-custom-button-bg font-medium"
            onClick={handlePayment}
          >
            BUY NOW
          </Button>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        {user?.admin && (
          <>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
              name="description"
              onChange={handleOverviewDetails}
            ></textarea>

            <article className="prose prose-DEFAULT w-full">
              <Mdxtest source={formValues.description} />
            </article>
          </>
        )}
      </div>

      <article className="prose prose-headings:text-custom-text prose-a:text-blue-600 hover:prose-a:text-blue-500 w-full">
        <Mdxtest source={courseDetails?.topDescription} />
      </article>

      <div className="flex flex-col gap-4">
        <p className="text-3xl font-medium">Table of Contents:</p>
        <div className="flex flex-wrap justify-center gap-y-4 gap-x-4">
          {courseDetails?.courseContent?.map((course) => {
            return (
              <div className="flex flex-col flex-center p-2 rounded-md bg-orange-400 font-medium">
                <Image
                  src={`http://localhost:5000/${course.thumbnail}`}
                  width={300}
                  height={300}
                />
                <p className="text-xl">{course.videoName}</p>
                <p className="text-sm">{course.duration}</p>
              </div>
            );
          })}
        </div>
      </div>

      {courseDetails.bottomDescription && (
        <article className="prose prose-DEFAULT w-full">
          <Mdxtest source={courseDetails.bottomDescription} />
        </article>
      )}
    </div>
  );
};

export default Overview;
