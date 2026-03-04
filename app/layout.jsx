import Nav from "@components/Nav";
import "@styles/globals.css";
import { Providers } from "./store/provider";
import { Poppins } from "next/font/google";
import { NextAuthProvider } from "@components/NextAuthProvider";
import Footer from "@components/Footer";
import { NextUIProvider } from "@nextui-org/system";
import Auth from "@components/Auth";
import { Suspense } from "react";

const baseUrl = process.env.NEXTAUTH_URL || "";
const cloudfrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL || "";

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://xplodivity.com"),
  title: {
    default: "xplodivity - Tech Articles & Courses for Developers",
    template: "%s | xplodivity",
  },
  description:
    "Get started with your coding journey at xplodivity. Free tech articles, tech news, courses, and tutorials for developers. Learn JavaScript, React, Web Development, AI, and more.",
  keywords: [
    "JavaScript",
    "React",
    "Frontend Development",
    "Web Development",
    "xplodivity",
    "software engineering",
    "programming tutorials",
    "tech courses",
    "coding tutorials",
    "fullstack development",
    "AI tutorials",
    "Tech news",
    "Tech articles",
    "Tech tutorials",
    "Tech courses",
    "Tech development",
    "Tech programming",
    "Tech coding",
    "Tech software",
    "Tech engineering",
    "Coding",
    "programming",
    "programming tutorials",
    "programming courses",
    "programming tutorials",
  ],
  authors: [{ name: "xplodivity", url: "https://xplodivity.com" }],
  creator: "xplodivity",
  publisher: "xplodivity",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "xplodivity - Tech Articles & Courses for Developers",
    description:
      "Free tech articles, tech news, courses, and tutorials for developers. Learn JavaScript, React, Web Development, AI, and more.",
    site: "@xplodivity",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "xplodivity - Tech Articles & Courses",
    description:
      "Get started with your coding journey at xplodivity. Free tech articles, tech news, courses, and tutorials for developers.",
    url: baseUrl || undefined,
    siteName: "xplodivity",
    images: [
      {
        url: `${cloudfrontUrl}/assets/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    videos: [
      {
        url: "https://www.youtube.com/@xplodivity/videos", // 🔗 YouTube video link
        width: 1280,
        height: 720,
        type: "text/html",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXTAUTH_URL || "https://xplodivity.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "xplodivity",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${
          process.env.NEXT_PUBLIC_CLOUDFRONT_URL || siteUrl
        }/assets/android-chrome-512x512.png`,
      },
      sameAs: ["https://www.youtube.com/@xplodivity"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "xplodivity - Tech Articles & Courses",
      description:
        "Free tech articles, tech news, courses, and tutorials for developers. Learn JavaScript, React, Web Development, AI, and more.",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/search/{search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-custom-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextAuthProvider>
          <Providers>
            <NextUIProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <Auth />
              </Suspense>
              <main className="app">
                <Nav />
                <div className="w-full flex flex-col grow">{children}</div>
                <Footer />
              </main>
            </NextUIProvider>
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
