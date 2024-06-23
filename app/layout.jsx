import Nav from "@components/Nav";
import "@styles/globals.css";
import { Providers } from "./store/provider";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { NextAuthProvider } from "@components/NextAuthProvider";
import Footer from "@components/Footer";
import { NextUIProvider } from "@nextui-org/system";

export const metadata = {
  title: "xplodivity",
  description: "JavaScript made easy",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
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
