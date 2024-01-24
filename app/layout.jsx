import Nav from "@components/Nav";
import "@styles/globals.css";
import { Providers } from "./store/provider";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { NextAuthProvider } from "@components/NextAuthProvider";
import styles from "./styles.module.css";

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
  // variable: "--font-inter",
});

// className={`${inter.variable}`}
const RootLayout = ({ children }, request) => {
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");

  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-custom-background">
        {/* <div className="main bg-custom-background">
          <div />
        </div> */}
        <NextAuthProvider>
          <Providers>
            <main className="app">
              <Nav />
              <div className="w-full flex flex-col grow">{children}</div>

              {/* {activePath === "/" && (
                <div className={styles.customshape1}>
                  <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                      className={styles.shapefill}
                    ></path>
                  </svg>
                </div>
              )} */}
            </main>
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
