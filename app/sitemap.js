//This will auto generate sitemap.xml in next js 14
export default async function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL;

  // Static pages
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
      // Fetch all categories/articles (you might need to adjust this based on your API)
      const articlesResponse = await fetch(
        `${apiBaseUrl}/api/v1/allcategories?page=1`
      );

      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json();

        if (articlesData.data && Array.isArray(articlesData.data)) {
          articlePages = articlesData.data.map((article) => {
            // Safely encode the blogUrl to handle special characters
            const safeBlogUrl = encodeURIComponent(article.blogUrl || "");
            return {
              url: `${baseUrl}/explore/${safeBlogUrl}`,
              lastModified: new Date(article.createdAt),
              changeFrequency: "weekly",
              priority: 0.8,
            };
          });
        }
      }
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
            // Safely encode the course URL to handle special characters
            const safeCourseUrl = encodeURIComponent(
              course.url || course._id || ""
            );
            return {
              url: `${baseUrl}/courses/${safeCourseUrl}`,
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
