import Nav from "@components/Nav";
import "@styles/globals.css";
import { Providers } from "./store/provider";

export const metadata = {
  title: "xplodivity",
  description: "JavaScript made easy",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main bg-custom-background">
          <div />
        </div>

        <Providers>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
