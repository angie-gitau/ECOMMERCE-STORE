import { FaSearch, FaUser } from "react-icons/fa";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  return (
    <div className="flex items-center justify-between h-[100px] shadow-md px-6">
      <Link to="/">
        <div className="cursor-pointer m-2">
          <img src="/logo1.jpg" alt="" height="200px" width="200px" />
        </div>
      </Link>
      <div className="flex items-center m-2">
        <input
          type="text"
          placeholder="search"
          className="p-[15px] border-2 border-orange-400 border-solid w-[500px] outline-none rounded-lg mr-[-30px]"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to={`/products/${search}`} >
          <FaSearch className="text-[20px] cursor-pointer" />
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/cart">
          <div className="mr-[20px] cursor-pointer">
            <Badge badgeContent={2} color="secondary">
              <ShoppingBasketIcon className="text-orange-500" />
            </Badge>
          </div>
        </Link>
        <Link to="/login">
          <div className="flex items-center cursor-pointer space-x-2 border border-orange-400 p-2 rounded-lg hover:bg-orange-100 duration-300">
            <FaUser className="text-orange-600 hover:text-orange-600 transition duration 300" />
            <span className="text-orange-600 hover:text-orange-600 font-semibold">
              Login
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
