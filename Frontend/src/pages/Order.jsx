import StarRatings from "react-star-ratings";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Order = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart); // ✅ Add this line
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const getUserOrder = async () => {
    const userId = user?.currentUser?._id;
    console.log("User ID:", userId); // 👈 Log it here

    if (!userId) {
      console.warn("User ID is missing. Skipping request.");
      return;
    }

    try {
      const res = await userRequest.get(`/orders/find/${userId}`);
      setOrders(res.data);
    } catch (error) {
      console.log("Error fetching user orders:", error);
    }
  };

  getUserOrder();
}, [user]);

const handleRating = async(id) =>{
    const singleRating = {
      star: rating,
      name: user.currentUser.name,
      postedBy: user.currentUser.name,
      comment: comment,
    };
    try {
      await userRequest.put(`/products/rating/${id}`, singleRating);
      setComment("")
      setRating(0);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Thank You For Your Order!</h1>
          <p className="text-gray-600 mt-2">Here is your order data</p>
        </div>
        {orders.map((order, index) => (
          <div className="mb-8" key={index}>
            <h2 className="text-2xl font-semibold mb-4">Order #{order._id}</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Items ordered</h3>
                <div className="flex flex-col">
                  {order.products.map((product, index) => (
                    <div className="mb-4" key={index}>
                      <div className="flex items-center justify-evenly border-b border-gray-200 pb-4">
                        <img
                          src={product.img}
                          alt=""
                          className="w-24 h-24 rounded-md object-cover"
                        />
                        <div className="flex-1 ml-4">
                          <h4 className="text-lg font-semibold">
                            {product.title}
                          </h4>
                          <p className="text-gray-600">{product.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            Ksh {product.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h3>Rate Product</h3>
                         <StarRatings
                           numberOfStars={5}
                           starDimension="25px"
                           rating={rating}
                           isSelectable={true}
                           starRatedColor={"#FF7BA9"}
                           changeRating={(newRating) => {
                             setRating(newRating);
                           }}
                        />
                        <textarea
                          name=""
                          id=""
                          placeholder="leave a comment"
                          className="p-[10px] w-[300px] mt-3"
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                         <button className="bg-[#1e1e1e] mt-3 w-[200px] p-[5px] text-white"  onClick={() => handleRating(product._id)}>
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
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">About Shipping</h3>
          <p className="text-gray-600">bsclmr182821@gmail.com</p>
          <p className="text-gray-600">0712345678</p>
          <p className="text-gray-600">Angela Gitau</p>
        </div>
        <div className="bg-gray-50 rounded-lg my-2">
          <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
          <p className="text-gray-600">VISA</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Order summary</h3>
          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium">Subtotal</span>
            <span className="text-lg font-semibold">Ksh {cart.total}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium">Shipping</span>
            <span className="text-lg font-semibold">Ksh 100</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-semibold">Ksh {cart.total}</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button className="bg-orange-600 text-white p-3 rounded-lg font-semibold">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
