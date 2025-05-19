"use client";

import { useGetCoursesQuery } from "@app/store/services/courses";
import useIsMobile from "@utils/useIsMobile";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Tabs, Tab } from "@nextui-org/tabs";
import { cn } from "@nextui-org/theme";
import { FaLock } from "react-icons/fa";

const RootLayout = ({ children, params }) => {
  const { data, error, isLoading } = useGetCoursesQuery({
    url: "16-js-projects",
  });
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const user = useSelector((state) => state.user.currentUser);
  const paths = pathname.split("/");
  const id = paths[paths.length - 1];
  const hasPurchased = user?.purchasedCourses?.some(
    (course) => course?.courseId === data?._id
  );

  const handleCourseItemClick = (video) => {
    if (!user) {
      router.push(`${pathname}?authType=login`);
      return;
    }

    router.push(`/courses/16-js-projects/${video.id}`);
  };

  return (
    <>
      {!isMobile ? (
        <div className="flex grow w-full py-14">
          <div className="flex flex-col gap-4 w-[20%] max-w-[350px] bg-custom-background shadow-md shadow-sky-400 text-custom-text">
            <p className=" text-2xl text-left p-4">
              Build 16 Medium/Hard JavaScript Projects for Frontend Machine
              coding Interview rounds
            </p>

            <div
              onClick={() => router.push("/courses/16-js-projects")}
              className={`${
                !Number(id) && "bg-blue-600"
              } flex gap-3 hover:bg-blue-600 cursor-pointer items-center text-xl font-medium p-2 border-t-[1px] border-b-[1px] border-gray-400`}
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
                  } cursor-pointer hover:bg-blue-600 flex gap-3 items-center text-sm  p-4 border-t-[1px] last:border-b-[1px] border-[#287cd9] shadow-[1px_2px_0px_0px_#287cd9]`}
                >
                  <div className="flex gap-2 items-center">
                    {!hasPurchased && (
                      <div className="w-[20px] h-[20px]">
                        <FaLock size={20} />
                      </div>
                    )}
                    <p>{video.videoName}</p>
                  </div>
                  <p className="text-sm">({video.duration})</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[80%]">{children}</div>
        </div>
      ) : (
        <div className="flex w-full flex-col flex-center pt-20 pb-20">
          <Tabs
            onSelectionChange={(key) =>
              key === "overview"
                ? router.push("/courses/16-js-projects")
                : router.push(`${pathname}/1?tab=${key}`)
            }
            aria-label="Options"
            className="m-4"
          >
            <Tab key="overview" title="Overview">
              {children}
            </Tab>

            <Tab key="content-list" title="Content List">
              {children}

              <div
                className={cn(
                  "flex flex-col gap-4 w-full bg-custom-background shadow-md shadow-sky-400 text-custom-text mt-10 lg:mt-0 lg:w-[350px] "
                )}
              >
                <p className=" text-xl text-left p-2">
                  Build 16 Medium/Hard JavaScript Projects for Frontend Machine
                  coding Interview rounds
                </p>

                <div>
                  <p className=" p-1 text-left">Content list:</p>
                  {data?.courseContent?.map((video) => (
                    <div
                      onClick={() => handleCourseItemClick(video)}
                      className={`${
                        Number(id) === video.id && "bg-blue-600"
                      } cursor-pointer flex gap-3 items-center justify-between text-sm  p-4 border-t-[1px] last:border-b-[1px] border-gray-400`}
                    >
                      <div className="flex gap-2 items-center">
                        {!hasPurchased && (
                          <div className="w-[20px] h-[20px]">
                            <FaLock size={20} />
                          </div>
                        )}
                        <p>{video.videoName}</p>
                      </div>
                      <p className="text-sm">({video.duration})</p>
                    </div>
                  ))}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default RootLayout;
