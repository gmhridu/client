import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '/logo.jpeg'

const Navbar = () => {
  const [dropdown, setDropDown] = useState(false)
  
  const toggleDropDown = () => {
    setDropDown((isOpen)=> !isOpen)
  }

  const closeDropdown = () => {
    setDropDown(false)
  }

  const handleLinkClick = (e) => {
    e.preventDefault()
    closeDropdown()
  }

  return (
    <div className="navbar bg-base-100 flex justify-between items-center">
      <Link to={"/"} className="flex items-center justify-center gap-1">
        <img src={logo} alt="logo" className="h-12 w-12" />
        <a className="text-xl font-bold space-x-1">NourishHub</a>
      </Link>
      <div>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/jobs"}>All Jobs</Link>
          </li>
        </ul>
      </div>
      <div className="flex-none gap-x-2">
        <div>
          <ul>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end z-50">
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          ></div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            onClick={toggleDropDown}
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          {dropdown && (
            <ul
              onClick={handleLinkClick}
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/setting"}>Settings</Link>
              </li>
              <li>
                <Link to={'/logout'}>Logout</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
