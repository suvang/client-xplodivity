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
import Button from "@components/Button";
import { Button as Btn } from "@heroui/button";
import { FaCrown } from "react-icons/fa";
import Script from "next/script";

let orderId;
const Course = ({ params }) => {
  const { data, error, isLoading } = useGetCoursesQuery({
    url: "16-js-projects",
  });
  const courseDetails = data;
  const user = useSelector((state) => state.user.currentUser);
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const courseId = params.courseid;
  const courseItem = data?.courseContent.find(
    (content) => parseInt(content.id) === parseInt(courseId)
  );
  const hasPurchased = user?.purchasedCourses?.some(
    (course) => course?.courseId === courseDetails?._id
  );

  const initPayment = (data, pricePack) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
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
          pricePack,
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

  const handlePayment = async (pricePack) => {
    if (!user) {
      router.push(`${pathname}?authType=login`);
      return;
    }

    try {
      let data = await createOrder({
        amount: Number(`${pricePack?.price}00`),
      });
      orderId = data.data.data.id;
      initPayment(data.data.data, pricePack);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-2xl p-0 h-full w-full flex max-md:items-center max-md:h-[275px] md:flex-start lg:max-w-[700px] max-h-[500px] lg:p-2 flex-col">
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
          <div className="md:w-full md:h-[50vh] p-3 mx-2 md:mx-0 flex flex-col flex-center bg-black">
            <p className="text-sm mb-6 text-red-500">
              Permission denied. You haven't purchased this course yet.
            </p>

            <div className="flex gap-4 max-md:flex-col max-md:gap-6">
              {courseDetails?.pricePacks?.map((pack) => (
                <div className="relative h-fit w-fit flex flex-col justify-center items-center gap-3 text-center min-w-[200px] bg-black p-4 border rounded-xl">
                  {pack?.popular && (
                    <div className="absolute -top-3 -right-3 bg-[#FFD700] text-black text-xs font-medium px-2 py-[1.5px] rounded-md">
                      Popular
                    </div>
                  )}
                  <p className="text-sm flex gap-1 flex-center">
                    {pack?.accessYears === 1 ? "one" : "Three"} year access{" "}
                    <FaCrown color="#FFD700" />
                  </p>
                  <p className="text-3xl font-bold underline">₹{pack?.price}</p>
                  <Btn
                    onClick={() => handlePayment(pack)}
                    className="py-1 w-full"
                    color="warning"
                    variant="shadow"
                  >
                    BUY NOW
                  </Btn>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Course;
