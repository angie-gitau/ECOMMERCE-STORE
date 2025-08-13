import { FaCheckCircle } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Order = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const getUserOrder = async () => {
      try {
        const res = await userRequest.get(
          `/orders/find/${user.currentUser._id}`
        );
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserOrder();
  }, [user]);

  const handleRating = async (id) => {
    const singleRating = {
      star: rating,
      name: user.currentUser.name,
      postedBy: user.currentUser.name,
      comment: comment,
    };
    try {
      await userRequest.put(`/products/rating/${id}`, singleRating);
      setComment("");
      setRating(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Thank You for Your Orders!</h1>
          <p className="text-gray-600 mt-2">
            Here are the details of your recent orders.
          </p>
        </div>

        {orders.map((order, index) => (
          <div className="mb-8" key={index}>
            <h2 className="text-2xl font-semibold mb-4">Order #{order._id}</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Items Ordered</h3>

                <div className="flex flex-col space-y-4">
                  {order.products
                    .filter(
                      (product) =>
                        product.title.toLowerCase() !== "shipping" &&
                        product.title.toLowerCase() !== "shipping cost"
                    )
                    .map((product, idx) => (
                      <div
                        className="flex flex-col border-b border-gray-200 pb-4"
                        key={idx}
                      >
                        <div className="flex items-center space-x-4 mb-2">
                          <img
                            src={product.img}
                            alt={product.title}
                            className="w-24 h-24 rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold">
                              {product.title}
                            </h4>
                            <p className="text-gray-600">
                              Quantity: {product.quantity}
                            </p>
                            <p className="text-gray-800 font-semibold">
                              KES {product.discountedPrice}
                            </p>
                          </div>
                        </div>

                        {/* Rating & Comment */}
                        <div className="flex flex-col mt-2 space-y-2">
                          <h3 className="font-medium">Rate this product</h3>
                          <StarRatings
                            numberOfStars={5}
                            starDimension="25px"
                            rating={rating}
                            starRatedColor="#FF7BA9"
                            changeRating={(newRating) => setRating(newRating)}
                          />
                          <textarea
                            placeholder="Leave a comment..."
                            className="p-2 w-full max-w-md border rounded-md mt-2"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <button
                            className="bg-black text-white py-1 px-4 rounded-md text-sm w-fit"
                            onClick={() => handleRating(product._id)}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Shipping Information */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
          <p className="text-gray-600">{orders[0]?.email}</p>
          <p className="text-gray-600">{orders[0]?.name}</p>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-50 rounded-lg mb-4 p-4">
          <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
          <p className="text-gray-600">VISA</p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium">Subtotal:</span>
            <span className="text-lg font-semibold">
              KES {orders[0]?.total}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-lg font-semibold">
              KES {orders[0]?.total}
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-orange-500 text-white p-3 rounded-lg font-semibold">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
