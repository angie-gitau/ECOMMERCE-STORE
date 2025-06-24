import Button from "@mui/material/Button";

const Banner = () => {
  return (
    <div className="relative bg-[url('/beautybanner2.jpg')] bg-no-repeat bg-cover h-[80vh] px-[200px]">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative flex flex-col text-white w-[50%] pt-[10%]">
        <span className="text-[30px] mt-3">
          Discover your building construction products
        </span>
        <h1 className="text-3xl mt-3">Build with pride</h1>

        <div className="flex items-center mt-[20px]">
          <Button
            sx={{
              backgroundColor: "#8B4513",
              padding: "10px",
              width: "200px",
              color: "white",
              textTransform: "none", // disables uppercase
              marginRight: "36px", // matches Tailwind's mr-9
              "&:hover": {
                backgroundColor: "#CD853F", // optional: hover effect
              },
            }}
          >
            Shop Now
          </Button>

          <Button
            sx={{
              backgroundColor: "#708090",
              padding: "10px",
              width: "200px",
              color: "white",
              textTransform: "none", // disables uppercase
              marginRight: "36px", // matches Tailwind's mr-9
              "&:hover": {
                backgroundColor: "#A9A9A9", // optional: hover effect
              },
            }}
          >
            CALL: 0712345678{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
