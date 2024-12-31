"use client";

import { useGetCoursesQuery } from "@app/store/services/courses";
import VideoPlayer from "@components/VideoPlayer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from "@app/store/services/payment";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/modal";
import Script from "next/script";

let orderId;
const Course = ({ params }) => {
  const { data, error, isLoading } = useGetCoursesQuery({
    url: "16-js-projects",
  });
  const user = useSelector((state) => state.user.currentUser);
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const courseId = params.courseid;
  const courseItem = data?.courseContent.find(
    (content) => parseInt(content.id) === parseInt(courseId)
  );
  const hasPurchased = user?.purchasedCourses?.some(
    (course) => course?.courseId === data?._id
  );

  const initPayment = (data) => {
    const options = {
      key: process.env.NEXT_RAZORPAY_KEY_ID,
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
    <div className="text-2xl p-0 h-full w-full flex-center md:flex-start lg:max-w-[700px] lg:p-2 flex-col">
      {hasPurchased ? (
        <>
          {" "}
          <VideoPlayer courseItem={courseItem} />
          <p
            onClick={() => window.open(courseItem.sourceCode, "_blank")}
            className="text-custom-text mt-3 underline underline-offset-8 cursor-pointer"
          >
            Click here to get source code
          </p>
        </>
      ) : (
        <>
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
          <div
            className="md:w-[50vw] md:h-[50vh] p-3 mx-2 md:mx-0 flex flex-col flex-center bg-black"
            onClick={handlePayment}
          >
            <p className="text-sm mb-2 text-red-500">
              Permission denied. You haven't purchased this course yet.
            </p>
            <div className=" flex flex-col gap-2 p-4 items-center border-2 border-blue-600 hover:bg-gray-900 rounded-md w-fit h-fit cursor-pointer">
              <div className="flex flex-col gap-3 items-center text-3xl">
                <span className="text-blue-600 font-bold text-3xl">
                  BUY THIS COURSE
                </span>
                FOR ₹{data?.price}
              </div>
              <p className="text-base">Get full access for 1 Year</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Course;
