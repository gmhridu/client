import React from 'react'
import logo from '/logo.jpeg'
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <footer className="footer p-10 bg-[#ccdff8] text-base-content">
        <aside className="">
          <div className="flex items-center">
            <img src={logo} alt="" className="w-10 h-10 rounded-full" />
            <Link to={"/"} className="btn btn-ghost">
              <h2 className=" text-xl sm:text-2xl font-bold">NourishHub</h2>
            </Link>
          </div>
          <p className="font-sans text-base">
            Southwark Council, PO Box 64529,
            <br />
            London SE1P 5LX
          </p>
          <div className="flex items-center gap-x-2 font-sans text-base">
            <FaPhone />
            <p>07-333-433-335</p>
          </div>
          <div className="flex items-center gap-x-2 font-sans text-base">
            <FaEnvelope />
            <p>support@noursihHub.com</p>
          </div>
          <div></div>
        </aside>
        <div className="grid grid-cols-3 lg:grid-cols-3 space-x-20">
          <nav className="flex flex-col">
            <h6 className="footer-title">QUICK LINKS</h6>
            <Link to={"/"} className="link link-hover">
              Home
            </Link>
            <Link to={"/about"} className="link link-hover">
              About
            </Link>
            <Link to={"/contact"} className="link link-hover">
              Contact
            </Link>
          </nav>
          <nav className="flex flex-col">
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav className="flex flex-col col-span-2 lg:col-auto">
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Footer