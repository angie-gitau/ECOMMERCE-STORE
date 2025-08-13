import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Order = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchAndVerify = async () => {
      setLoading(true);

      // Extract session_id from URL query string
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");

      try {
        if (sessionId) {
          // Verify Stripe session and create order backend-side
          await userRequest.post("/stripe/verify-session", { sessionId });
        }

        if (!user?.currentUser?._id) {
          setOrders([]);
          setLoading(false);
          return;
        }

        // Fetch orders for the current logged-in user
        const res = await userRequest.get(`/orders/find/${user.currentUser._id}`);

        // Res structure should be an array of orders with expected fields
        setOrders(res.data || []);
      } catch (err) {
        console.error("Error verifying session or fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndVerify();
  }, [location.search, user]);

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  if (!orders.length) {
    return (
      <div>
        <h2>No orders found</h2>
        <p>Looks like you haven’t purchased anything yet.</p>
        {/* Add navigation link/button to continue shopping */}
      </div>
    );
  }

  return (
    <div>
      <h1>My Orders</h1>
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", marginBottom: 20, padding: 10 }}>
          <h3>Order ID: {order._id}</h3>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Total:</strong> KES {order.total}</p>
          <p><strong>Shipping Cost:</strong> KES {order.shipping}</p>
          <p><strong>Status:</strong> {order.status === 1 ? "Paid" : "Pending"}</p>
          <h4>Products:</h4>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {order.products.map((prod, index) => (
              <li key={index} style={{ marginBottom: 10, display: "flex", alignItems: "center" }}>
                {prod.img && (
                  <img
                    src={prod.img}
                    alt={prod.title}
                    style={{ width: 60, height: 60, objectFit: "cover", marginRight: 15 }}
                  />
                )}
                <div>
                  <p><strong>{prod.title}</strong></p>
                  <p>{prod.desc}</p>
                  <p>Quantity: {prod.quantity}</p>
                  <p>Price per item: KES {prod.discountedPrice}</p>
                  <p>Subtotal: KES {prod.discountedPrice * prod.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Order;
