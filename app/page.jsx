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

      <div className={styles.blobShape}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#139dff"
            d="M39.1,-27C45.7,-11.2,42.5,5.8,34.4,18C26.3,30.2,13.1,37.6,-7.2,41.8C-27.5,45.9,-55.1,46.8,-64.7,33.7C-74.3,20.7,-66.1,-6.4,-52.3,-26.4C-38.5,-46.4,-19.3,-59.3,-1.5,-58.5C16.3,-57.6,32.5,-42.9,39.1,-27Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className={styles.blobTwoShape}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#139dff"
            d="M59.5,-38.8C67.1,-21.3,56.2,2.4,43.2,23.1C30.2,43.9,15.1,61.6,-0.3,61.8C-15.7,62,-31.4,44.6,-42,25.3C-52.6,5.9,-58.1,-15.4,-50.3,-33.1C-42.4,-50.8,-21.2,-64.9,2.4,-66.3C26,-67.6,52,-56.3,59.5,-38.8Z"
            transform="translate(100 100)"
          />
        </svg>
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
