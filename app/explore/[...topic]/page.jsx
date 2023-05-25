import Link from "next/link";
import Mdx from "./mdx";
import Mdxtest from "./mdxtest";

async function getData(name) {
  const res = await fetch(
    `http://localhost:5000/api/v1/allcategories?blogUrl=${name}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const TopicPage = async ({ params }) => {
  const data = await getData(`${params.topic[0]}/${params.topic[1]}`);
  const Category = data.data[0];

  console.log("Category", Category);

  return (
    <div className="w-full flex-between">
      <div className="flex-start flex-col gap-10">
        <div>
          <iframe
            width="1022"
            height="575"
            src={`https://www.youtube.com/embed/${Category.videoId}`}
            title={Category.topicName}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <h1 className="text-3xl font-bold">{Category.topicName}</h1>

        <article className="prose prose-DEFAULT">
          <Mdxtest source={Category.description} />
        </article>
      </div>

      <div className="flex-start flex-col gap-2">
        {Category.headings.map((heading) => {
          return (
            <Link
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
