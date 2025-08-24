import Nav from "@components/Nav";
import "@styles/globals.css";
import { Providers } from "./store/provider";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { NextAuthProvider } from "@components/NextAuthProvider";
import Footer from "@components/Footer";
import { NextUIProvider } from "@nextui-org/system";
import Auth from "@components/Auth";

export const metadata = {
  title: "xplodivity - Tech Articles & Courses",
  description:
    "Learn JavaScript, web development, and modern frontend engineering at xplodivity.",
  keywords: [
    "JavaScript",
    "Frontend",
    "Web Development",
    "xplodivity",
    "software engineering",
  ],
  openGraph: {
    title: "xplodivity",
    description: "Learn JS, frontend system design, and more.",
    url: "https://xplodivity.com",
    siteName: "xplodivity",
    images: [
      {
        url: "/favicon.ico", // place this in public/
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

const RootLayout = ({ children }, request) => {
  const headersList = headers();

  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-custom-background">
        <NextAuthProvider>
          <Providers>
            <NextUIProvider>
              <Auth />
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
