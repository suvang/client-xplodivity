export default function robots() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://xplodivity.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/admin/",
        "/profile",
        "/upload",
        "/reset-password",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
