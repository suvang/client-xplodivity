import Nav from "@components/Nav";
import "@styles/globals.css";
import { Providers } from "./store/provider";
import { Poppins } from "next/font/google";

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
const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <div className="main bg-custom-background">
          <div />
        </div>

        <Providers>
          <main className="app ">
            <Nav />
            <div className="sm:px-12 px-2">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
