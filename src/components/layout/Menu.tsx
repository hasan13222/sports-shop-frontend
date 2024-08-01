import { IoFootballOutline } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import { menuItems } from "../../constants/menuItems";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
const MenuSection = () => {
  const {cartItems} = useAppSelector(state => state.cart)
  return (
    <>
    {/* menu */}
      <div className="navbar bg-bgColor p-0 h-full border-b border-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[300] mt-3 w-52 p-2 shadow"
            >
              {/* mobile menu */}
              {menuItems.map((item) => (
                <li key={item.title}>
                  <NavLink to={`${item.path}`}>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <a className="pt-5 hover:text-accentColor" href="/">
            <div className="demo-logo">
              <p className="logo mr-10 relative">
                <span className="text-5xl font-bold">SPH</span>
                <IoFootballOutline className="absolute top-[11px] left-[40px] text-txtColor" />
              </p>
            </div>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* desktop menu */}
            {menuItems.map((item) => (
              <li key={item.title}>
                <NavLink to={`${item.path}`}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          {/* cart menu */}
          <a href="/cart" className="btn bg-transparent border-none shadow-none relative hover:bg-transparent">
            <FaShopify className="font-bold text-4xl text-primary" />
            <small className="text-xs bg-txtColor text-white w-4 h-4 rounded-full absolute top-1 right-3">
              {cartItems?.length || 0}
            </small>
          </a>
        </div>
      </div>
    </>
  );
};

export default MenuSection;
