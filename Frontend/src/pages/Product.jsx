import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct } from "../redux/cartRedux";
import { showAverageRating } from "../components/Ratings";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState(null); // null until loaded
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  let price = 0;

  const handleQuantity = (action) => {
    if (action === "dec") {
      setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
    }
    if (action === "inc") {
      setQuantity((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await userRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handlePrice = (
    originalPrice,
    discountedPrice,
    wholesalePrice,
    minimumQuantity,
    quantity
  ) => {
    if (quantity > (minimumQuantity || 0) && wholesalePrice) {
      price = wholesalePrice;
    } else if (discountedPrice) {
      price = discountedPrice;
    } else {
      price = originalPrice || 0;
    }
    return price;
  };

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addProduct({ ...product, quantity, price, email: "youremail@gmail.com" })
    );
    toast.success("Product has been added to basket successfully", {
      position: "top-right",
      autoClose: 5000,
    });

    console.log(cart);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <p className="text-lg font-semibold">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <p className="text-lg font-semibold text-red-600">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="h-auto flex justify-stretch p-[30px]">
      <ToastContainer />

      {/* LEFT SIDE */}
      <div className="flex-1 h-[500px] w-[600px]">
        <img
          src={product.img || ""}
          alt={product.title || "Product"}
          className="h-[100%] w-[100%] object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 flex-col ml-10">
        <h1 className="text-[25px] font-semibold mb-[20px]">
          {product.title || "Untitled Product"}
        </h1>
        <span>{product.desc || "No description available"}</span>
        <h2 className="font-semibold mt-2 text-[20px]">
          Ksh{" "}
          {handlePrice(
            product.originalPrice,
            product.discountedPrice,
            product.wholesalePrice,
            product?.wholesaleMinimumQuantity,
            quantity
          )}
        </h2>

        <span className="flex items-center">{showAverageRating(product)}</span>

        <div className="h-52 w-96 border-2 border-gray-300 rounded-lg shadow-md my-4 p-6">
          <h2 className="flex items-center justify-center font-semibold text-lg text-gray-700 mb-4">
            Content
          </h2>
          <hr className="mb-4" />
          <span className="block text-gray-600 text-base text-[18px]">
            {product.title}
          </span>
        </div>

        {product.wholesalePrice && product.wholesaleMinimumQuantity && (
          <div className="inline-flex items-center bg-orange-600 text-white font-semibold text-sm p-3 rounded-full shadow-md">
            Available : Ksh {product.wholesalePrice} from{" "}
            {product.wholesaleMinimumQuantity} items
          </div>
        )}

        <div className="flex items-center my-5 p-4">
          <FaMinus
            className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl"
            onClick={() => handleQuantity("dec")}
          />
          <span className="text-lg font-semibold mx-4">{quantity}</span>
          <FaPlus
            className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl"
            onClick={() => handleQuantity("inc")}
          />
        </div>

        <button
          className="bg-black p-[10px] w-[200px] text-white cursor-pointer"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>

        <hr className="my-6" />

        <div className="flex flex-col">
          <h2 className="font-semibold text-[18px]">Reviews</h2>
          {Array.isArray(product?.ratings) && product.ratings.length > 0 ? (
            product.ratings.map((rating, index) => (
              <div className="flex items-center" key={index}>
                <StarRatings
                  rating={parseInt(rating.star)}
                  starDimension="25px"
                  starRatedColor="yellow"
                  starSpacing="5px"
                />
                <span className="font-semibold mx-[20px]">
                  {rating.postedBy || "Anonymous"}
                </span>
              </div>
            ))
          ) : (
            <span className="text-gray-500">No reviews yet</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
