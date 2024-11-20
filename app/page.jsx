import Link from "next/link";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <section className={`w-full flex flex-col p-4  ${styles.height}`}>
      <div className="flex flex-col my-10 gap-12">
        <div className="flex-center gap-5 flex-col">
          <h1 className=" text-center text-4xl sm:text-6xl font-semibold">
            <span className="leading-tight">ENGINEER FOR KNOWLEDGE,</span>
            <br className="max-md:hidden" />
            <span>NOT JUST INTERVIEWSS 🧠</span>
          </h1>

          <p className="text-center text-xl">
            Dive into the World of Tech:
            <br /> JavaScript, Web Dev, AI, and More. 🌐
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-y-4 gap-x-4">
          <Link className="max-w-[400px] w-full" href="/explore">
            <div className="mockup-code bg-grey border-2 border-white w-full sm:w-full ">
              <pre data-prefix="" className="text-primary-content font-bold">
                <code className="text-3xl sm:text-3xl">EXPLORE</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-warning font-bold text-md sm:text-lg"
              >
                <code>Frontend dev</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-success font-bold text-md sm:text-lg"
              >
                <code>Backend Dev</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-primary-content font-bold text-md sm:text-lg"
              >
                <code>FullStack Dev</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-info font-bold text-md sm:text-lg"
              >
                <code>Artificial Intelligence</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-error font-bold text-md sm:text-lg"
              >
                <code>Tech news</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-accent font-bold text-md sm:text-lg"
              >
                <code>And more...</code>
              </pre>
            </div>
          </Link>

          <a
            className="max-w-[400px] w-full"
            target="_blank"
            href="https://www.youtube.com/@xplodivity/videos"
          >
            <div className="mockup-code bg-grey border-2 border-white w-full sm:w-full">
              <pre data-prefix="" className="text-primary-content font-bold">
                <code className="text-3xl sm:text-3xl">JOIN US</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-warning font-bold text-md sm:text-lg"
              >
                <code>Big community</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-success font-bold text-md sm:text-lg"
              >
                <code>Frequent uploads</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-primary-content font-bold text-md sm:text-lg"
              >
                <code>Tons of tutorials</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-info font-bold text-md sm:text-lg"
              >
                <code>Giveaways</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-warning font-bold text-md sm:text-lg"
              >
                <code>Tech Insights & News</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-accent font-bold text-md sm:text-lg"
              >
                <code>And more...</code>
              </pre>
            </div>
          </a>

          <Link href="/courses" className="max-w-[450px] w-full">
            <div className="mockup-code bg-grey border-2 border-white w-full sm:w-full ">
              <pre data-prefix="" className="text-primary-content font-bold">
                <code className="text-2xl sm:text-3xl">
                  MEMBER-ONLY CONTENT
                </code>
              </pre>
              <pre
                data-prefix=">"
                className="text-success font-bold text-md sm:text-lg"
              >
                <code>Learn at Your Own Pace</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-warning font-bold text-md sm:text-lg"
              >
                <code>
                  Unlock Premium Content –&nbsp;
                  <span className="text-sm">Enroll Today</span>
                </code>
              </pre>
              <pre
                data-prefix=">"
                className="text-primary-content font-bold text-md sm:text-lg"
              >
                <code>
                  Thorough explanations & <br />
                  &nbsp;<span className="ml-11">code walkthroughs</span>
                </code>
              </pre>
              <pre
                data-prefix=">"
                className="text-error font-bold text-md sm:text-lg"
              >
                <code>No bullshit, No time waste</code>
              </pre>
              <pre
                data-prefix=">"
                className="text-accent font-bold text-md sm:text-lg"
              >
                <code>And more...</code>
              </pre>
            </div>
          </Link>
        </div>
      </div>

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
    </section>
  );
};

export default Home;
