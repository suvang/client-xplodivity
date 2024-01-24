"use client";

import Mdxtest from "@app/explore/[...topic]/mdxtest";
import Button from "@components/Button";
import Card from "@components/Card/Card";
import Image from "next/image";
import Script from "next/script";
import React, { useState } from "react";

{
  /* <h1>
Overview:
</h1>

<p>Full Video Preview of each project from the course- <a>https://www.youtube.com/watch?v=coZucJEvsSk</a> <p/>

<p>Quick Image Preview of Each Project from the course- <a>https://drive.google.com/file/d/1HXMS8uH_8-n7VF70bWC2J0b2DecliD19/view?usp=sharing</a>
</p>


<h3>What you'll get:</h3>

- Lifetime access
</br>
- Full video explanations of building each project from scratch
</br>
- 10+ hours of premium content
</br>
- Step-by-step explanations and code walkthroughs.
</br>
- Should prepare you for any JavaScript live coding interview round.
</br>
- Extremely cheap 
</br>
- Practical tips and strategies for mastering JavaScript.
</br>
- Confidence in handling technical interviews.
</br>
- Enhanced JavaScript proficiency.
</br>
- No bullshit, No time waste */
}

let data = [
  {
    id: 1,
    videoName: "Nested comments Structure",
    sourceCode: "www.github.com",
    duration: "10:42",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: 2,
    videoName: "File Structure",
    sourceCode: "www.github.com",
    duration: "10:42",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: 3,
    videoName: "multiselect dropdown",
    sourceCode: "www.github.com",
    duration: "10:42",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: 4,
    videoName: "star rating",
    sourceCode: "www.github.com",
    duration: "10:42",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: 5,
    videoName: "typewrite effect",
    sourceCode: "www.github.com",
    duration: "10:42",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: 6,
    videoName: "toast notification",
    sourceCode: "www.github.com",
    duration: "10:42",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: 7,
    videoName: "calender picker",
    sourceCode: "www.github.com",
    duration: "10:42",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: 8,
    videoName: "chessboard pattern",
    sourceCode: "www.github.com",
    duration: "10:42",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: 9,
    videoName: "File explorer",
    sourceCode: "www.github.com",
    duration: "10:42",
    videoUrl: "",
    thumbnail: "",
  },
  {
    id: 10,
    videoName: "Nested comments Structure",
    sourceCode: "www.github.com",
    duration: "10:42",
    videoUrl: "",
    thumbnail: "",
  },
];

const CoursePreview = () => {
  const [formValues, setFormValues] = useState({});

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
      // handler: async (response) => {
      // 	try {
      // 		const verifyUrl = "http://localhost:8080/api/payment/verify";
      // 		const { data } = await axios.post(verifyUrl, response);
      // 		console.log(data);
      // 	} catch (error) {
      // 		console.log(error);
      // 	}
      // },
      theme: {
        color: "blue",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:5000/api/v1/payment/order";
      const resp = await fetch(orderUrl, {
        method: "POST",
        headers: {
          // Authorization: 'YOUR_AUTH_HERE'
        },
        body: JSON.stringify({ amount: 399 }),
      });
      const data = await resp.json();
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col p-10 gap-5">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <div className="flex flex-col gap-5 w-[600px]">
          <Image
            src={
              "https://xplodivity.graphy.com/_next/image?url=https%3A%2F%2Fd502jbuhuh9wk.cloudfront.net%2Fcourses%2F65883553e4b08ebe75f39885%2Fcover%2F2024-01-04T12%3A04%3A44.171Z.jpg&w=1920&q=75"
            }
            width={600}
            height={600}
          />

          <p className="text-3xl font-bold">
            Build 16 Medium/Hard JavaScript Projects for Frontend Machine coding
            Interview rounds
          </p>

          <button onClick={handlePayment}>Pay</button>
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

        <article className="prose prose-DEFAULT w-full">
          <Mdxtest source={formValues.description} />
        </article>

        <div className="flex flex-col gap-4">
          <p className="text-2xl">Table of Contents:</p>
          <div className="flex flex-wrap justify-center gap-y-4 gap-x-4">
            {data.map((course) => {
              return (
                <div className="flex flex-col flex-center p-3 rounded-md bg-orange-400 font-medium">
                  <p className="text-xl">{course.videoName}</p>
                  <p className="text-sm">{course.duration} mins</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePreview;
