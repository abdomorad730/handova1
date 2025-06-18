import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/61d71a78dd3eefe4e069187f4699af9e.jpg";
import './navbar-darkmode.css';
import './navbar-darkmode.css';
import { CiLogin, CiMenuBurger } from "react-icons/ci";
import { FaCartArrowDown, FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineAdminPanelSettings, MdOutlineLightMode } from "react-icons/md";
import { useEffect, useState } from "react";
import { BsFillChatHeartFill } from "react-icons/bs";
import { User } from "../Interfaces/Interfaces";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  function getUserProfile() {
    axios
    .get("https://project1-kohl-iota.vercel.app/users/profile",{
        headers: { Authorization: localStorage.getItem("authorization") },
    })
    .then((res) => {
      setUser(res.data.user);
      //  console.log(res.data.user);
   
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);

    });
  }
  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };


  useEffect(() => {
    if(localStorage.getItem("authorization")){
      getUserProfile();
    }
    // Check system preference for dark mode
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("authorization");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.clear();
    setIsProfileDropdownOpen(false);
    navigate("/login");
  }
  
  // Close dropdown after selecting an option
  function closeProfileDropdown() {
    setIsProfileDropdownOpen(false);
  }

  return (
    <>
      <div className="container mx-auto">
        <nav className=" mt-3 p-1 fixed top-0 z-50 w-[90%] rounded-3xl border-gray-200 bg-black text-white dark:bg-white/70 dark:border-gray-700">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
  <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
    <img
      src={logo}
      className="h-10 w-10 rounded-full"
      alt="Flowbite Logo"
    />
    <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-black">
      Handova <span className="text-amber-500">.</span>
    </span>
  </Link>
</div>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 ml-auto justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-dropdown"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <CiMenuBurger className="text-3xl" />
            </button>
            <div className="flex items-center justify-between">
              {/* Desktop nav: always visible */}
              <div className="hidden md:flex flex-row items-center justify-end gap-4 w-full">
              <ul className="flex flex-row font-medium p-0 m-0 border-0 rounded-lg space-x-4 rtl:space-x-reverse bg-transparent dark:bg-transparent dark:border-gray-700">
                {localStorage.getItem("authorization") ? (
                  <>
                    <li>
                      <NavLink
                        to="/"
                        className="block py-2 px-text-white font-medium bg-amber-700 rounded-sm md:bg-transparent md:text-white md:p-0 md:dark:text-amber-500 dark:bg-amber-600 md:dark:bg-transparent dark:text-white navbar-link-darkmode"
                        aria-current="page"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/category"
                        className="block py-0 px-text-white font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-w md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-black dark:hover:text-white md:dark:hover:bg-transparent navbar-link-darkmode"
                      >
                      Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/product"
                        className="block py-0 px-text-white font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-w md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-black dark:hover:text-white md:dark:hover:bg-transparent navbar-link-darkmode"
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/brand"
                        className="block py-0 px-text-white font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-w md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bgw dark:hover:text-white md:dark:hover:bg-transparent navbar-link-darkmode"
                      >
                        Brands
                      </NavLink>
                    </li>
                    <li>
                      <Link
                        to="/ #about"
                        className="block py-0 px-text-white font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-w md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bgw dark:hover:text-white md:dark:hover:bg-transparent navbar-link-darkmode"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <NavLink
                        to="/cart"
                        className="block py-0 px-text-white font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent navbar-link-darkmode"
                      >
                        <div className=" p-1 rounded-full">

                        <FaCartArrowDown className="text-2xl light:text-white dark:text-black   " />
                        </div>

                      </NavLink>
                      
                    </li>
                
                    <li>
                      <NavLink
                        to="/wishList"
                        className="block py-0 px-text-white font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent navbar-link-darkmode"
                      >
                        <div className="bg-amber-500 p-1 rounded-full">

                        <BsFillChatHeartFill className="text-2xl text-white " />
                        </div>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/login"
                        className="block py-0 px-text-white font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent navbar-link-darkmode"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/register"
                        className="block py-0 px-text-white font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent navbar-link-darkmode"
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                <div className="text-center">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
                >
                  {isDarkMode ? <MdDarkMode className="text-white" /> : <MdOutlineLightMode className="text-white text-xl " />}
                </button>
              </div>
                </li>
              </ul>
              {/* Dark Mode Toggle */}
             
              {/* Profile Dropdown (click) */}
              {localStorage.getItem("authorization") && (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 py-2 px-3 text-gray-900  font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0  md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {user?.image ? (
                      <img
                        src={user.image.secure_url||logo}
                        alt="Profile"
                        className="w-9 h-9 rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="text-3xl text-yellow-600" />
                    )}
                  </button>
                  <ul
                    className={`absolute right-0 mt-2 w-48 bg-black dark:bg-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transition-opacity duration-300 ease-in-out ${isProfileDropdownOpen ? 'block' : 'hidden'}`}
                  >
            
                    <li>
                      <NavLink
                        to="/profile"
                        onClick={closeProfileDropdown}
                        className="block px-4 py-2 md:flex items-center gap-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 navbar-link-darkmode"
                      > 
                     <CgProfile className="text-2xl" />
                     Profile
                      </NavLink>
                    </li>
                    {localStorage.getItem("role") === "admin" && (
                      <li>
                        <NavLink
                          to="/layoutAdmin"
                          onClick={closeProfileDropdown}
                          className="px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 navbar-link-darkmode"
                        >
                        <MdOutlineAdminPanelSettings className="text-2xl" />
                          Admin
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 navbar-link-darkmode"
                      >
                        <CiLogin className="text-2xl" />

                        Logout
                      </button>
                    </li>
                   
                  </ul>
               
                </div>
              )}
            </div>
              {/* Mobile nav: centered dropdowns */}
              {isDropdownOpen && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 mx-auto w-11/12 max-w-xs z-50 flex flex-col gap-3 md:hidden bg-transparent">
                  <ul className="flex flex-col font-medium p-4 border border-gray-100 rounded-lg bg-gray-100 dark:bg-gray-900 dark:border-gray-700 shadow-lg">
                    {localStorage.getItem("authorization") ? (
                      <>
                        <li>
                          <NavLink
                            to="/"
                            className="block py-2 px-3 text-gray-900 font-medium bg-amber-700 rounded-sm md:bg-transparent md:text-white md:p-0 md:dark:text-amber-500 dark:bg-amber-600 md:dark:bg-transparent"
                            aria-current="page"
                          >
                            Home
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/category"
                            className="block py-0 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-w md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bgw dark:hover:text-white md:dark:hover:bg-transparent"
                          >
                            Categories
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/product"
                            className="block py-0 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-w md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bgw dark:hover:text-white md:dark:hover:bg-transparent"
                          >
                            Products
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/brand"
                            className="block py-0 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-w md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bgw dark:hover:text-white md:dark:hover:bg-transparent"
                          >
                            Brands
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/cart"
                            className="block py-0 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          >
                            Cart
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/wishList"
                            className="block py-0 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          >
                            Wishlist
                          </NavLink>
                        </li>
                        
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/login"
                          className="block py-0 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                        Login
                        </NavLink>
                        <NavLink
                          to="/register"
                          className="block py-0 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                         Register
                        </NavLink>
                      </>
                    )}
                  </ul>
                  {/* Dark Mode Toggle */}
                  <div className="relative w-full">
                    <button
                      onClick={toggleDarkMode}
                      className="w-full flex items-center justify-center p-2 rounded-full bg-black dark:bg-black text-white hover:bg-gray-800 transition"
                    >
                      {isDarkMode ? <MdDarkMode className="text-2xl" /> : <MdOutlineLightMode className="text-2xl" />}
                    </button>
                  </div>
                  {/* Profile Dropdown (click) */}
                  {localStorage.getItem("authorization") && (
                    <div className="relative w-full">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(!isProfileDropdownOpen);
                          console.log('Dropdown open:', !isProfileDropdownOpen);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 text-gray-900 font-medium rounded-sm bg-gray-200 dark:bg-gray-700 dark:text-white"
                      >
                        <FaUserCircle className="text-3xl light:text-black dark:text-white" />
                      </button>
                      <ul
                        style={{ background: 'white', color: 'black', zIndex: 9999, minHeight: 100 }}
                        className={`w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transition-opacity duration-300 ease-in-out ${isProfileDropdownOpen ? 'block' : 'hidden'} dropdown-profile-navbar`}
                      > 
                        <li>
                          <NavLink
                            to="/profile"
                            onClick={closeProfileDropdown}
                            className="block px-4 py-2 text-black hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-700"
                          >
                            Profile
                          </NavLink>
                        </li>
                        {localStorage.getItem("role") === "admin" && (
                          <li>
                            <NavLink
                              to="/layoutAdmin"
                              onClick={closeProfileDropdown}
                              className="block px-4 py-2 text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                              Admin
                            </NavLink>
                          </li>
                        )}
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          

          </div>
        </nav>
      </div>
    </>
  );
}
