import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";

const Order = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getUserOrder = async () => {
      if (!user?.currentUser?._id) return;

      try {
        const res = await userRequest.get(`/orders/find/${user.currentUser._id}`);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserOrder();
  }, [user]);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{border: "1px solid gray", margin: "10px", padding: "10px"}}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> Ksh {order.total}</p>
            <p><strong>Shipping:</strong> Ksh {order.shipping}</p>
            <p><strong>Products:</strong></p>
            <ul>
              {order.products.map((prod) => (
                <li key={prod._id}>
                  {prod.title} x {prod.quantity} - Ksh {prod.discountedPrice}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
