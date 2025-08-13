import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeProduct, updateQuantity } from "../redux/cartRedux";
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

  // ========== SHIPPING LOGIC ==========
  const calculateShipping = () => {
    if (cart.total < 1000) return 100;
    if (cart.total < 10000) return cart.total * 0.09;
    return cart.total * 0.1;
  };

  const shippingCost = calculateShipping();
  const totalWithShipping = cart.total + shippingCost;

  // ========== PRODUCT ACTIONS ==========
  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      dispatch(updateQuantity({ id: product._id, quantity: product.quantity - 1 }));
    } else {
      dispatch(removeProduct(product));
    }
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(updateQuantity({ id: product._id, quantity: product.quantity + 1 }));
  };

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  const handleClearProduct = () => {
    dispatch(clearCart());
  };

  // ========== CHECKOUT ==========
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
          shipping: shippingCost,
          total: totalWithShipping,
        });

        if (res.data.url) {
          window.location.href = res.data.url;
        } else {
          toast.error("Stripe checkout URL not received.");
        }

      } else if (paymentMethod === "mpesa") {
        const phone = prompt("Enter your M-Pesa phone number (e.g., 2547XXXXXXXX):");

        if (!phone || !/^2547\d{8}$/.test(phone)) {
          toast.error("Invalid phone number format. Use 2547XXXXXXXX.");
          return;
        }

        const res = await userRequest.post("/mpesa/stkpush", {
          phone,
          amount: totalWithShipping,
        });

        if (res.data.success) {
          toast.success("✅ STK Push sent! Check your phone.");
        } else {
          toast.error(res.data.message || "Failed to initiate M-Pesa payment.");
        }
      }

    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <ToastContainer position="top-right" autoClose={5000} />
      <h2 className="text-[18px] font-bold mb-6">Shopping cart</h2>
      <div className="flex gap-8">
        {/* ========== LEFT COLUMN ========== */}
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
                      onClick={() => handleDecreaseQuantity(product)}
                    />
                    <span className="text-lg font-semibold mx-4">
                      {product.quantity}
                    </span>
                    <FaPlus
                      className="bg-orange-600 text-white cursor-pointer p-2 rounded-full mr-4 text-3xl"
                      onClick={() => handleIncreaseQuantity(product)}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold mb-6">
                    Ksh {(product.discountedPrice * product.quantity).toFixed(2)}
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

        {/* ========== RIGHT COLUMN ========== */}
        <div className="w-80 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order summary</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <span className="text-lg font-medium">Subtotal</span>
              <span className="text-lg font-medium">
                Ksh {cart.total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium">Shipping</span>
              <span className="text-lg font-medium">
                Ksh {shippingCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Ksh {totalWithShipping.toFixed(2)}</span>
            </div>

            <div>
              <label className="font-semibold mr-2">Payment Method</label>
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
              onClick={handleCheckout}
              className={`bg-orange-600 text-white p-3 w-full rounded-lg font-semibold mt-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
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