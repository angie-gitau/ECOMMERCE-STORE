import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Myaccount from "./pages/Myaccount";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import News from "./components/News";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Order from "./pages/Order";
import { useSelector } from "react-redux";



function App() {
    const user = useSelector((state) => state.user);

  const Layout = () => {
    return (
      <div>
        <News />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/create-account",
          element: <Register />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/myaccount",
          element: user?.currentUser ? <Myaccount /> : <Home /> //protecting the route
        },
        {
          path: "/product/:productId",
          element: <Product />,
        },
        {
          path: "/products/:searchterm",
          element: <ProductList />,
        },
        {
          path: "/myorders",
          element: user?.currentUser ? <Order /> : <Login /> //protecting the route
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
