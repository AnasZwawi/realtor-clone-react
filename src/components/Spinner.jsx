import React from 'react'
import spinner from '../assets/spinner.svg'


function Spinner() {
  return (
    <div className='bg-black bg-opacity-50 flex items-center justify-center right-0 left-0 bottom-0 top-0 z-50 fixed'>
      <img src={spinner} alt="spinner" className='h-24'/>
    </div>
  )
}



export default Spinner