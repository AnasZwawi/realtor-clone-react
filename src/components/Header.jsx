import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styles from "../styles/Header.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth"

function Header() {
  const [pageState, setPageState] = useState("Sign in")
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setPageState("Profile")
      }
      else{
        setPageState("Sign in")
      }
    })
  },[auth])
  const pathMatchRoute = (route)=>{
    if(route === location.pathname){
      return true;
    }
  }
  function toNav(){
    if(pageState === 'Profile'){
      navigate('/profile')
    }
    else{
      navigate('/sign-in')
    }
  }

  return (
    <div className="bg-white shadow sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto sm:flex-col sm:items-center">
        <img
          className="h-5 cursor-pointer sm:mt-3 relative bottom-[3px]"
          src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
          alt=""
          onClick={()=>navigate('/')}
        />
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer select-none py-3 text-[16px] pt-[0.8rem] font-semibold text-gray-400 border-b-[3px]  ${
                location.pathname === "/"
                  ? "border-b-red-500 text-gray-600"
                  : "border-b-transparent"
              }`}
              onClick={()=>navigate('/')}
            >
              Home
            </li>
            <li
              className={`cursor-pointer select-none py-3 text-[16px] pt-[0.8rem] font-semibold text-gray-400 border-b-[3px]  ${
                location.pathname === "/offers"
                  ? "border-b-red-500 text-gray-600"
                  : "border-b-transparent" 
              }`}
              onClick={()=>navigate('/offers')}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer select-none py-3 text-[16px] pt-[0.8rem] font-semibold border-transparent text-gray-400 border-b-[3px]  ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "border-b-red-500 text-gray-600"
              }`}
              onClick={toNav}
            >
            {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
