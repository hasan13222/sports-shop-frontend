import { IoFootballOutline } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
const MenuSection = () => {
  return (
    <>
      <div className="navbar bg-bgColor p-0 h-full">
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
              <li>
                <a className="hover:bg-primary hover:text-white text-txtColor">Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
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
            <li>
              <a className="hover:bg-primary hover:text-white text-txtColor">Products</a>
            </li>
            <li>
              <a className="hover:bg-primary hover:text-white text-txtColor">Manage Products</a>
            </li>
            <li>
              <a className="hover:bg-primary hover:text-white text-txtColor">About Us</a>
            </li>
            {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a className="hover:bg-primary hover:text-white text-txtColor">Submenu 1</a>
                  </li>
                  <li>
                    <a className="hover:bg-primary hover:text-white text-txtColor">Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li> */}

            <li>
              <a className="hover:bg-primary hover:text-white text-txtColor">Contact Us</a>
            </li>
          </ul>
        </div>
          <div className="navbar-end">
            <a className="btn bg-transparent border-none shadow-none relative hover:bg-transparent">
                <FaShopify className="font-bold text-4xl text-primary"/>
                <small className="text-xs bg-txtColor text-white w-4 h-4 rounded-full absolute top-1 right-3">1</small>
            </a>
          </div>
      </div>
    </>
  );
};

export default MenuSection;
