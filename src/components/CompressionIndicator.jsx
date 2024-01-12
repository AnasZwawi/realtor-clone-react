import React from 'react'

function CompressionIndicator() {
  return (
    <div className='bg-white rounded-md shadow-lg z-50 flex h-min items-center flex-col space-x-4 mb-9'>
      <p className='px-[1rem] py-[0.7rem] text-xl font-semibold text-gray-800'>Processing Images...</p>
      <img src="https://icons8.com/preloaders/preloaders/1493/Settings.gif" className='opacity-80 mb-2 relative right-[0.6rem]' alt="" />
    </div>
  )
}

export default CompressionIndicator