import Link from "next/link";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <section
      className={`w-full flex items-center flex-col gap-16 ${styles.height}`}
    >
      <div className="flex-center gap-5 flex-col">
        <h1 className="head_text text-center">
          <span className="leading-tight">SUPERCHARGE YOUR</span>
          <br className="max-md:hidden" />
          <span>CODING SKILLS</span>
        </h1>

        <p className="text-center">
          Unlock the world of coding and tech with our engaging tutorials.{" "}
          <br /> Stay in the loop with our tech-filled universe.
        </p>
      </div>

      <div className="flex gap-5">
        <Link href="/explore">
          <div className="mockup-code bg-indigo-700  ">
            <pre data-prefix="" className="text-primary-content font-bold">
              <code className="text-3xl">EXPLORE</code>
            </pre>
            <pre data-prefix=">" className="text-warning font-bold">
              <code>Frontend dev</code>
            </pre>
            <pre data-prefix=">" className="text-success font-bold">
              <code>Backend Dev</code>
            </pre>
            <pre data-prefix=">" className="text-primary-content font-bold">
              <code>FullStack Dev</code>
            </pre>
            <pre data-prefix=">" className="text-info font-bold">
              <code>Artificial Intelligence</code>
            </pre>
            <pre data-prefix=">" className="text-error font-bold">
              <code>Tech news</code>
            </pre>
            <pre data-prefix=">" className="text-accent font-bold">
              <code>And more...</code>
            </pre>
          </div>
        </Link>

        <a target="_blank" href="https://www.youtube.com/@xplodivity/videos">
          <div className="mockup-code bg-red-600 ">
            <pre data-prefix="" className="text-primary-content font-bold">
              <code className="text-3xl">JOIN US</code>
            </pre>
            <pre data-prefix=">" className="text-warning font-bold">
              <code>1600+ subscribers</code>
            </pre>
            <pre data-prefix=">" className="text-success font-bold">
              <code>Frequent uploads</code>
            </pre>
            <pre data-prefix=">" className="text-primary-content font-bold">
              <code>Tons of tutorials</code>
            </pre>
            <pre data-prefix=">" className="text-info font-bold">
              <code>Giveaways</code>
            </pre>
            <pre data-prefix=">" className="text-warning font-bold">
              <code>Tech Insights & News</code>
            </pre>
            <pre data-prefix=">" className="text-accent font-bold">
              <code>And more...</code>
            </pre>
          </div>
        </a>
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
