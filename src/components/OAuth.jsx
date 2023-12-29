import React from 'react'
import { FcGoogle } from "react-icons/fc";
import google from '../assets/google.png'

function OAuth() {
  return (
      <button className='flex items-center w-[87%] lg:w-full ml-auto rounded  justify-center bg-red-600 text-white p-[11px] text-[16px] font-normal transition duration-150 ease-in-out hover:bg-red-700 active:bg-red-900 shadow-lg'> <img src={google} className='mr-2 w-5 rounded-full' /> CONTINUE WITH GOOGLE</button>
  )
}

export default OAuth