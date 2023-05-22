const Home = () => {
  return (
    <section className="w-full flex-center flex-col gap-10">
      <h1 className="head_text text-center ">
        Learn to Code
        <br className="max-md:hidden" />
        <span className="text-center">And</span>
        <br className="max-md:hidden" />
        Dive into the World of Technology
      </h1>

      <div className="flex">
        <button type="button" className="custom_btn mr-2">
          EXPLORE
        </button>

        <button type="button" className="custom_btn ml-2">
          COURSES
        </button>
      </div>

      <div>Youtube video</div>
    </section>
  );
};

export default Home;
