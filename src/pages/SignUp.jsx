import React from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import OAuth from "../components/OAuth";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import  { db } from '../firebase'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const formChangeHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const navigate = useNavigate();

  const submitHandler = async (e) =>{
    e.preventDefault();
    try {
      // signing up user in firebase authentication
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // adding username with updateProfile
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const user = userCredential.user;

      //store fine user data in firestore
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/')
      toast.success('Signed up successfully.')
    } catch (error) {
      toast.error("An error occurred, can't sign up.")
    }
  }
  

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-3xl mt-6 text-center text-gray-700 font-[900]">
        Sign Up
      </h1>
      <div className="w-full flex flex-wrap md:justify-center lg:flex-col lg:justify-between mt-[1.5rem] p-4  items-center">
        <div className="rounded-2xl overflow-hidden sm:w-[95%] md:w-[82%] lg:w-[64%] w-[50%] mx-auto">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="key"
          />
        </div>
        <form onSubmit={submitHandler} className="w-[50%] sm:w-[95%] md:w-[82%] lg:w-[64%] flex flex-col lg:mt-8 space-y-5 ">
        <div className="w-[87%] lg:w-full ml-auto">
            <input
              className="w-full rounded transition ease-in-out text-gray-700 font-normal text-lg border-gray-300"
              type="text"
              id="name"
              placeholder="Full name"
              value={name}
              onChange={formChangeHandler}
            />
          </div>
          <div className="w-[87%] lg:w-full ml-auto">
            <input
              className="w-full rounded transition ease-in-out text-gray-700 font-normal text-lg border-gray-300"
              type="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={formChangeHandler}
            />
          </div>
          <div className="w-[87%] lg:w-full ml-auto relative">
            <input
              className="w-full rounded transition ease-in-out text-gray-700 font-normal text-lg border-gray-300"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={formChangeHandler}
            />
            {showPassword ? (
              <BsFillEyeSlashFill
                onClick={() => {
                  setShowPassword(false);
                }}
                className="absolute right-3 text-xl top-3 cursor-pointer"
              />
            ) : (
              <BsFillEyeFill
                onClick={() => {
                  setShowPassword(true);
                }}
                className="absolute right-3 text-xl top-3 cursor-pointer"
              />
            )}
          </div>
          <div className="w-[87%] lg:w-full sm:flex-col sm:items-center ml-auto flex flex-row justify-between sm:space-y-2">
            <p className="font-normal text-gray-700">Have an account? <a onClick={()=>navigate('/sign-in')} className="text-red-500 cursor-pointer">Sign in</a></p>
            <p className="text-blue-500 w-fit font-normal cursor-pointer" onClick={()=>navigate('/forgot-password')}>Forgot Password?</p>
          </div>
          <div className="w-[87%] lg:w-full ml-auto">
            <button type="submit" className="w-full text-white bg-blue-600 p-[11px] text-[16px] font-normal rounded hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-900 shadow-lg" >SIGN UP</button>
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

export default SignUp;
