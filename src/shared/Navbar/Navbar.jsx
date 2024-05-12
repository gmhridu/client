import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/logo.jpeg";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const [dropdown, setDropDown] = useState(false);
  const { user, logOut } = useAuth();

  const toggleDropDown = () => {
    setDropDown((isOpen) => !isOpen);
  };

  const closeDropdown = () => {
    setDropDown(false);
  };

  const handleLinkClick = () => {
    closeDropdown();
  };

  const handleLogOut = () => {
    logOut();
    toast.success("Logged out successfully");
    setDropDown(false); 
  };

  return (
    <div className="navbar bg-base-100 flex justify-between items-center px-2 md:px-6 py-2">
      <Link to={"/"} className="flex items-center justify-center gap-1">
        <img src={logo} alt="logo" className="h-12 w-12" />
        <a className="text-xl font-bold space-x-1">NourishHub</a>
      </Link>
      <div className="hidden md:block">
        <ul className="menu menu-horizontal px-1 text-lg font-semibold flex space-x-6">
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-400" : "")}
            to={"/"}
          >
            Home
          </NavLink>
          {user && (
            <NavLink
              className={({ isActive }) => (isActive ? "text-blue-400" : "")}
              to={"/my-foods"}
            >
              My Foods
            </NavLink>
          )}

          {user && (
            <NavLink
              className={({ isActive }) => (isActive ? "text-blue-400" : "")}
              to={"/my-request"}
            >
              My Food Request
            </NavLink>
          )}
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-400" : "")}
            to={"/about"}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-400" : "")}
            to={"/contact"}
          >
            Contact Us
          </NavLink>
        </ul>
      </div>
      <div className="flex-none gap-x-2">
        {!user && (
          <ul>
            <button className="btn btn-outline border-blue-400 hover:bg-blue-400 hover:text-white hover:border-none text-lg font-semibold">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-400 hover:text-white" : ""
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </button>
          </ul>
        )}
        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              onClick={toggleDropDown}
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            {dropdown && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to={"/add-food"}
                    onClick={handleLinkClick}
                    className="justify-between"
                  >
                    Add Food
                  </Link>
                </li>
                <li>
                  <Link to={"/my-foods"} onClick={handleLinkClick}>
                    My Foods
                  </Link>
                </li>
                <li>
                  <Link to={"/my-request"} onClick={handleLinkClick}>
                    My Food Request
                  </Link>
                </li>
                <li className="mt-2">
                  <button
                    onClick={handleLogOut}
                    className="bg-gray-200 block text-center"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
