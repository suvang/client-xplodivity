"use client";

import { useGetCoursesQuery } from "@app/store/services/courses";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

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

const RootLayout = ({ children, params }) => {
  const { data, error, isLoading } = useGetCoursesQuery({
    url: "16-js-projects",
  });
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state) => state.user.currentUser);
  const paths = pathname.split("/");
  const id = paths[paths.length - 1];

  const handleCourseItemClick = (video) => {
    if (!user) {
      router.push(`${pathname}?authType=login`);
      return;
    }

    router.push(`/courses/16-js-projects/${video.id}`);
  };

  return (
    <div className="flex grow">
      <div className="flex flex-col gap-4 w-[350px] bg-custom-background shadow-md shadow-sky-400 text-custom-text">
        <p className=" text-2xl text-left p-4">
          Build 16 Medium/Hard JavaScript Projects for Frontend Machine coding
          Interview rounds
        </p>

        <div
          onClick={() => router.push("/courses/16-js-projects")}
          className={`${
            !Number(id) && "bg-blue-600"
          } flex gap-3 items-center text-xl font-medium p-2 border-t-[1px] border-b-[1px] border-gray-400`}
        >
          <p>Course Preview</p>
        </div>

        <div>
          <p className=" p-2 text-left mt-[5px]">Content list:</p>
          {data?.courseContent?.map((video) => (
            <div
              onClick={() => handleCourseItemClick(video)}
              className={`${
                Number(id) === video.id && "bg-blue-600"
              } cursor-pointer flex gap-3 items-center text-sm  p-4 border-t-[1px] last:border-b-[1px] border-gray-400`}
            >
              <p>{video.videoName}</p>
              <p className="text-sm">({video.duration})</p>
            </div>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
};

export default RootLayout;
