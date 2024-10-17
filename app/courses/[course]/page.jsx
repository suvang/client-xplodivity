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
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/modal";
import useIsMobile from "@utils/useIsMobile";
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

        let data = await verifyPayment({
          orderId,
          email: user?.email,
          userId: user?._id,
          courseId: courseDetails._id,
          courseName: courseDetails?.courseName,
          courseUrl: window.location.href,
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
      let data = await createOrder({
        amount: process.env.NEXT_16_JS_PROJECTS_PRICE,
      });
      orderId = data.data.data.id;
      initPayment(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-2 gap-6 w-full lg:p-10">
      <Modal
        isOpen={isModalOpen}
        onOpenChange={() => {
          if (isModalOpen) {
            setIsModalOpen(false);
          }
        }}
        classNames={{
          closeButton: "hover:bg-white/5 active:bg-white/10 text-white",
        }}
      >
        <ModalContent className="bg-modal-background">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                CONGRATULATIONS!
              </ModalHeader>
              <ModalBody>
                <p>You have successfully purchased the course.</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="rounded-md border-none text-sm bg-red-500 hover:bg-red-400 font-medium"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
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

      {user?.admin && (
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>

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
        </div>
      )}

      <article className="prose prose-headings:text-custom-text prose-a:text-blue-600 hover:prose-a:text-blue-500 w-full">
        <Mdxtest source={courseDetails?.topDescription} />
      </article>

      <div className="flex flex-col gap-4">
        <p className="text-3xl font-medium">Table of Contents:</p>
        <div className="flex flex-wrap justify-center gap-y-4 gap-x-4">
          {courseDetails?.courseContent?.map((course) => {
            return (
              <div className="flex flex-col items-center space-between text-center p-2 gap-2 rounded-md bg-orange-400 font-medium max-w-[300px]">
                <img src={course.thumbnail} width={300} height={300} />

                <div className="flex flex-col">
                  <p className="text-xl">{course.videoName}</p>
                  <p className="text-sm">{course.duration}</p>
                </div>
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
