import StarRatings from "react-star-ratings";

export const showAverageRating = (product) => {
  if (!product?.ratings || product.ratings.length === 0) {
    return <div className="text-sm italic text-gray-400">No ratings yet</div>;
  }

  const total = product.ratings.reduce((acc, curr) => acc + curr.star, 0);
  const length = product.ratings.length;
  const highestPossible = length * 5;
  const average = (total * 5) / highestPossible;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
      }}
    >
      <span>
        <StarRatings
          starSpacing="2px"
          starRatedColor="#d1411e"
          starDimension="18px"
          rating={average}
          numberOfStars={5}
          name="rating"
        />
        <span style={{ marginLeft: "5px", fontSize: "12px", color: "#666" }}>
          ({length})
        </span>
      </span>
    </div>
  );
};
