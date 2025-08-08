import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeProduct } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  const handleClearProduct = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    if (!user.currentUser) {
      toast.error("Please login to proceed to checkout.");
      return;
    }
    setLoading(true);

    try {
      if (paymentMethod === "stripe") {
        const res = await userRequest.post("/stripe/create-checkout-session", {
          cart,
          userId: user.currentUser._id,
          email: user.currentUser.email,
          name: user.currentUser.name,
        });
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      } else if (paymentMethod === "mpesa") {
        // Ask user for phone number
        const phone = prompt("Enter your M-Pesa phone number (e.g., 2547XXXXXXXX):");

        // Validate phone format
        if (!phone || !/^2547\d{8}$/.test(phone)) {
          toast.error("Invalid phone number format. Please use 2547XXXXXXXX.");
          setLoading(false);
          return;
        }

        try {
          // Make API call to your backend
          const res = await userRequest.post("/mpesa/stkpush", {
            phone,
            amount: cart.total,
          });

          // Check response success from backend
          if (res.data.success) {
            toast.success("✅ STK Push sent! Check your phone to complete payment.");
          } else {
            toast.error(res.data.message || "Failed to initiate M-Pesa payment.");
          }
        } catch (err) {
          console.error("M-Pesa Payment Error:", err);
          toast.error(err.response?.data?.message || "Payment request failed.");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-[18px] font-bold mb-6">Shopping cart</h2>
      <div className="flex gap-8">
        {/*LEFT*/}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Your Items</h3>
          <div className="flex flex-col space-y-4">
            {cart.products?.map((product, index) => (
              <div
                className="flex items-center justify-between border-b border-gray-200 pb-4"
                key={index}
              >
                <img
                  src={product.img}
                  alt=""
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-2">{product.desc}</p>
                  <div className="flex items-center my-5 p-4">
                    <FaMinus
                      className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl"
                      onClick={() => dispatch(removeProduct(product))}
                    />
                    <span className="text-lg font-semibold mx-4">
                      {product.quantity}
                    </span>
                    <FaPlus
                      className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl"
                      // Add increase quantity functionality if needed
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold mb-6">
                    Ksh {product.discountedPrice}
                  </p>
                  <FaTrashAlt
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleRemoveProduct(product)}
                  />
                </div>
              </div>
            ))}

            <button
              className="bg-red-400 w-[200px] text-white p-3 mt-4 rounded-md font-semibold"
              onClick={handleClearProduct}
            >
              Clear cart
            </button>
          </div>
        </div>

        {/*RIGHT*/}
        <div className="w-80 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order summary</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <span className="text-lg font-medium">Subtotal</span>
              <span className="text-lg font-medium">Ksh {cart.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium">Shipping:</span>
              <span className="text-lg font-medium">Ksh 100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium">Total</span>
              <span className="text-lg font-medium">Ksh {cart.total}</span>
            </div>
            <div>
              <label className="font-semibold mr-2">Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border rounded p-2 w-full mt-2"
              >
                <option value="stripe">Card (Stripe)</option>
                <option value="mpesa">M-Pesa STK</option>
              </select>
            </div>
            <button
              disabled={loading}
              className={`bg-orange-600 text-white p-3 w-full rounded-lg font-semibold mt-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleCheckout}
            >
              {loading ? "Processing..." : "Proceed to checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
