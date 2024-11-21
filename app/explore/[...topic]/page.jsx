import Link from "next/link";
import Mdxtest from "./mdxtest";
import styles from "./styles.module.css";

async function getData(name) {
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/v1/allcategories?blogUrl=${name}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const TopicPage = async ({ params }) => {
  const data = await getData(`${params.topic[0]}/${params.topic[1]}`);
  const Category = data.data[0];

  return (
    <div className="w-full flex gap-8 p-4">
      <div className="flex-start flex-col gap-8 w-[90vw] max-lg:w-full">
        <div className={`w-full ${styles.videoContainer}`}>
          <iframe
            className="w-full aspect-video"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${Category?.videoId}`}
            title={Category?.topicName}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <h1 className="text-3xl font-bold">{Category?.topicName}</h1>

        <article className="prose prose-headings:text-custom-text prose-a:text-blue-600 hover:prose-a:text-blue-500 w-full">
          <Mdxtest source={Category?.description} />
        </article>
      </div>

      <div className="flex items-center flex-col gap-3 w-1/5 max-lg:hidden">
        <h1 className="text-lg text-center font-bold">
          TABLE OF <br /> CONTENTS
        </h1>
        {Category?.headings?.map((heading) => {
          return (
            <Link
              className={`${styles.heading} bg-custom-button-bg hover:bg-sky-500 text-xl`}
              href={`/explore/${params.topic[0]}/${
                params.topic[1]
              }#${heading.replace(/ /g, "-")}`}
            >
              {heading}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopicPage;
