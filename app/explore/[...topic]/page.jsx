import Link from "next/link";
import Mdxtest from "./mdxtest";
import styles from "./styles.module.css";

const baseUrl = process.env.NEXTAUTH_URL || "";
const cloudfrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL || "";

async function getData(name) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/allcategories?blogUrl=${name}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function stripMarkdownForDescription(text) {
  if (!text || typeof text !== "string") return "";
  const cleaned = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_~`]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  if (cleaned.length <= 500) return cleaned;
  return cleaned.slice(0, 497).trim() + "...";
}

function toAbsoluteImageUrl(url) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = cloudfrontUrl || baseUrl;
  return base
    ? `${base.replace(/\/$/, "")}${url.startsWith("/") ? url : `/${url}`}`
    : url;
}

export async function generateMetadata({ params }) {
  const blogUrl = params?.topic?.[0];
  if (!blogUrl) return { title: "Article | xplodivity" };

  let data;
  try {
    data = await getData(blogUrl);
  } catch {
    return { title: "Article | xplodivity" };
  }

  const category = data?.data?.[0];
  if (!category) return { title: "Article | xplodivity" };

  const title = `${category.topicName} | xplodivity`;
  const description =
    stripMarkdownForDescription(category.description) ||
    `Learn about ${category.topicName} at xplodivity - tech articles and courses for developers.`;
  const canonicalPath = `/explore/${params.topic.join("/")}`;
  const ogImageUrl =
    category.descriptionImages?.[0] != null
      ? toAbsoluteImageUrl(category.descriptionImages[0])
      : cloudfrontUrl
      ? `${cloudfrontUrl}/assets/og-image.png`
      : baseUrl
      ? `${baseUrl}/og-image.png`
      : "/og-image.png";

  return {
    title,
    description,
    alternates: baseUrl
      ? { canonical: `${baseUrl}${canonicalPath}` }
      : undefined,
    openGraph: {
      title,
      description,
      url: baseUrl ? `${baseUrl}${canonicalPath}` : undefined,
      siteName: "xplodivity",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: category.topicName,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

const TopicPage = async ({ params }) => {
  const data = await getData(`${params.topic[0]}`);

  const Category = data.data[0];

  return (
    <div className="w-full flex gap-8 px-4 md:px-8 pt-24 pb-14">
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
