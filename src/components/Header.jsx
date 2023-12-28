import React from "react";
import { useLocation, useNavigate } from "react-router";
import styles from "../styles/Header.module.css";

function Header() {

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <img
          className="h-5 cursor-pointer"
          src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
          alt=""
          onClick={()=>navigate('/')}
        />
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer select-none py-3 text-sm font-semibold text-gray-400 border-b-[3px]  ${
                location.pathname === "/"
                  ? "border-b-red-500 text-black"
                  : "border-b-transparent"
              }`}
              onClick={()=>navigate('/')}
            >
              Home
            </li>
            <li
              className={`cursor-pointer select-none py-3 text-sm font-semibold text-gray-400 border-b-[3px]  ${
                location.pathname === "/offers"
                  ? "border-b-red-500 text-black"
                  : "border-b-transparent" 
              }`}
              onClick={()=>navigate('/offers')}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer select-none py-3 text-sm font-semibold text-gray-400 border-b-[3px]  ${
                location.pathname === "/sign-in"
                  ? "border-b-red-500 text-black"
                  : "border-b-transparent"
              }`}
              onClick={()=>navigate('/sign-in')}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
