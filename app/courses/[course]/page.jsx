"use client";

import Mdxtest from "@app/explore/[...topic]/mdxtest";
import { useGetCoursesQuery } from "@app/store/services/courses";
import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from "@app/store/services/payment";
import { useLazyGetCurrentUserDetailsQuery } from "@app/store/services/user";
import Button from "@components/Button";
import Carousel from "@components/Carousel";
import { Modal, ModalContent } from "@nextui-org/modal";
import { Tab, Tabs } from "@nextui-org/tabs";
import useIsMobile from "@utils/useIsMobile";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import React, { useState } from "react";
import { useSelector } from "react-redux";

let orderId;
const CoursePreview = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useGetCoursesQuery({
    url: "16-js-projects",
  });
  const user = useSelector((state) => state.user.currentUser);
  const courseDetails = data;
  const [formValues, setFormValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getUserDetails] = useLazyGetCurrentUserDetailsQuery();
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const pathname = usePathname();
  const paths = pathname.split("/");
  const id = paths[paths.length - 1];
  const hasPurchased = user?.payments?.[0]?.courseId == courseDetails?._id;

  if (isMobile && tab === "content-list") return;

  const handleOverviewDetails = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_HwwK3yQRnEOlhI",
      amount: data.amount,
      currency: data.currency,
      name: "xplodivity",
      description: "Test Transaction",
      image:
        "https://yt3.googleusercontent.com/07LmFWIJmi4pSiDwAcW98DIQwwerpEGqvFPpZ4z-lu5hJkriQgDEdlUW8Os3OusguQExvGGc=s176-c-k-c0x00ffffff-no-rj",
      order_id: data.id,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

        // const resp = await fetch(
        //   "http://localhost:5000/api/v1/payment/paymentverification",
        //   {
        //     method: "POST",
        //     headers: {
        //       // Authorization: 'YOUR_AUTH_HERE'
        //       "Content-Type": "application/json", // Ensure this header is set
        //     },

        //     body: JSON.stringify({
        //       orderId,
        //       email: user.email,
        //       userId: user._id,
        //       courseId: courseDetails._id,
        //       razorpay_payment_id: razorpay_payment_id,
        //       razorpay_order_id: razorpay_order_id,
        //       razorpay_signature: razorpay_signature,
        //     }),
        //   }
        // );
        // const data = await resp.json();

        let data = await verifyPayment({
          orderId,
          email: user?.email,
          userId: user?._id,
          courseId: courseDetails._id,
          razorpay_payment_id: razorpay_payment_id,
          razorpay_order_id: razorpay_order_id,
          razorpay_signature: razorpay_signature,
        });

        console.log("verifyPayment", data.data);

        // if data is true, then invalidate user details/refetch user details

        if (data.data.success) {
          //open modal
          setIsModalOpen(true);
        }
      },
      prefill: {
        name: user?.fullName,
        email: user?.email,
      },
      theme: {
        color: "blue",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    if (!user) {
      router.push(`${pathname}?authType=login`);
      return;
    }

    try {
      // const orderUrl = "http://localhost:5000/api/v1/payment/order";
      // const resp = await fetch(orderUrl, {
      //   method: "POST",
      //   headers: {
      //     // Authorization: 'YOUR_AUTH_HERE'
      //   },
      //   body: JSON.stringify({ amount: 399 }),
      // });
      // const data = await resp.json();
      let data = await createOrder({ amount: 399 });
      orderId = data.data.data.id;
      initPayment(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCourseItemClick = (video) => {
    if (!user) {
      router.push(`${pathname}?authType=login`);
      return;
    }
    console.log("video", video);
    router.push(`/courses/16-js-projects/${video.id}`);
  };

  return (
    <div className="flex flex-col p-2 gap-6 w-full lg:p-10">
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

export default CoursePreview;
