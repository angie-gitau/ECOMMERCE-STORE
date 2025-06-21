import { Typewriter } from "react-simple-typewriter";

const News = () => {
  return (
    <div className="flex items-center justify-center bg-orange-400 text-black text-[18px] font-semibold h-[30px]">
      <Typewriter
        words={["Build", "Prime", "Discounts available", "20% off"]}
        loop={5}
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />{" "}
    </div>
  );
};

export default News;
