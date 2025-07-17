import {
  FaBox,
  FaChartBar,
  FaClipboard,
  FaClipboardList,
  FaCog,
  FaElementor,
  FaHdd,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="h-[100vh]  bg-[#f3f4f6] p-[20px] w-[350px] shadow-lg">
      <ul className="flex flex-col items-start justify-start mt-[20px] pl-[20px]">
        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
          <FaHome className="mr-[15px] text-[#f97316]" />
          Home
        </li>
        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
          <FaUser className="mr-[15px] text-[#f97316]" />
          Profile
        </li>
        <hr className="w-full my-[20px] border border-[#d1d5db]" />
        <Link to="/users">
          <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
            <FaUsers className="mr-[15px] text-[#f97316]" />
            Users
          </li>
        </Link>

        <Link to="/products">
          <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
            <FaBox className="mr-[15px] text-[#f97316]" />
            Products
          </li>
        </Link>
        <Link to="/orders">
          <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
            <FaClipboardList className="mr-[15px] text-[#f97316]" />
            Orders
          </li>
        </Link>
        <hr className="w-full my-[20px] border border-[#d1d5db]" />
        <Link to="/banners">
          <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
            <FaElementor className="mr-[15px] text-[#f97316]" />
            Banners
          </li>
        </Link>

        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
          <FaCog className="mr-[15px] text-[#f97316]" />
          Settings
        </li>
        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
          <FaHdd className="mr-[15px] text-[#f97316]" />
          Backups
        </li>
        <hr className="w-full my-[20px] border border-[#d1d5db]" />
        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
          <FaChartBar className="mr-[15px] text-[#f97316]" />
          Charts
        </li>
        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
          <FaClipboard className="mr-[15px] text-[#f97316]" />
          All logs
        </li>
        <li className="flex items-center text-[20px] cursor-pointer mt-[20px] transition-colors duration-100 hover:bg-[#fdba74]">
          <FaSignOutAlt className="mr-[15px] text-[#f97316]" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Menu;
