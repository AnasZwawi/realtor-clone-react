import React from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import SignUp from "./SignUp";
import OAuth from "../components/OAuth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-3xl mt-6 text-center text-gray-700 font-[900]">
        Forgot Password
      </h1>
      <div className="w-full flex flex-wrap md:justify-center lg:flex-col lg:justify-between mt-[1.5rem] p-4  items-center">
        <div className="rounded-2xl overflow-hidden sm:w-[95%] md:w-[82%] lg:w-[64%] w-[50%] mx-auto">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="key"
          />
        </div>
        <form className="w-[50%] sm:w-[95%] md:w-[82%] lg:w-[64%] flex flex-col lg:mt-8 space-y-5 ">
          <div className="w-[87%] lg:w-full ml-auto">
            <input
              className="w-full rounded transition ease-in-out text-gray-700 font-normal text-lg border-gray-300"
              type="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={onChangeHandler}
            />
          </div>

          <div className="w-[87%] lg:w-full sm:flex-col sm:items-center ml-auto flex flex-row justify-between sm:space-y-2">
            <p className="font-normal text-gray-700">Don't have an account? <a onClick={()=>navigate('/sign-up')} className="text-red-500 cursor-pointer">Register Now</a></p>
          </div>
          <div className="w-[87%] lg:w-full ml-auto">
            <button type="submit" className="w-full text-white bg-blue-600 p-[11px] text-[16px] font-normal rounded hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-900 shadow-lg" >SEND RESET PASSWORD</button>
          </div>
          <div className="w-[87%] lg:w-full ml-auto flex items-center before:border-t before:border-gray-400  before:flex-1 after:border-t after:border-gray-400  after:flex-1">
            <p className="text-center text-gray-700 pl-3 pr-3">OR</p>
          </div>
          <OAuth className="w-[87%] lg:w-full"></OAuth>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword