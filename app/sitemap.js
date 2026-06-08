// This will auto generate sitemap.xml in Next.js 14
export const revalidate = 3600;

// Raw & in slugs is valid in URLs but must be &amp; inside XML <loc> elements.
function toXmlSafeUrl(url) {
  return url.replace(/&/g, "&amp;");
}

async function fetchAllArticles(apiBaseUrl) {
  const articles = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(
      `${apiBaseUrl}/api/v1/allcategories?page=${page}`,
      { cache: "no-store" }
    );
    if (!res.ok) break;

    const json = await res.json();
    if (Array.isArray(json.data)) articles.push(...json.data);
    totalPages = json.totalPages ?? 1;
    page += 1;
  }

  return articles;
}

export default async function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://xplodivity.com";

  // Static pages (single home page entry - no duplicate)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Fetch all articles/categories for explore page
  let articlePages = [];
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (apiBaseUrl) {
      const articles = await fetchAllArticles(apiBaseUrl);

      articlePages = articles
        .filter((article) => article.blogUrl)
        .map((article) => ({
          url: toXmlSafeUrl(`${baseUrl}/explore/${article.blogUrl}`),
          lastModified: new Date(article.createdAt),
          changeFrequency: "weekly",
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.warn("Could not fetch articles for sitemap:", error.message);
  }

  // Fetch all courses
  let coursePages = [];
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (apiBaseUrl) {
      // Fetch all courses
      const coursesResponse = await fetch(`${apiBaseUrl}/api/v1/course`);

      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json();

        if (coursesData && Array.isArray(coursesData)) {
          coursePages = coursesData.map((course) => {
            const safeCourseSlug = encodeURIComponent(
              course.url || course._id || ""
            );
            return {
              url: `${baseUrl}/courses/${safeCourseSlug}`,
              lastModified: new Date(
                course.updatedAt || course.createdAt || Date.now()
              ),
              changeFrequency: "weekly",
              priority: 0.9,
            };
          });
        }
      }
    }
  } catch (error) {
    console.warn("Could not fetch courses for sitemap:", error.message);
  }

  // Combine all pages
  return [...staticPages, ...articlePages, ...coursePages];
}
