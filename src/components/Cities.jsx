import React, { useState } from 'react'
import searchSubCities from '../functions/searchSubCities'
import Select from 'react-select'
import getSubCities from '../functions/getSubCities'
import searchLocation from '../functions/searchLocation'

function Cities(props) {
  const [searchItem, setSearchItem] = useState()

  const cities = searchSubCities(props.option.value)

  const uniqueNames = getSubCities(cities)

  function onChangeHandler(opt){
    setSearchItem(opt.value)
  }
  
  
  const res = searchLocation(searchItem)
  props.returnLocation(res)
  return (
    <>
      <p className="text-lg mt-6 font-semibold text-gray-800">Choose the Citie</p>
      <Select options={uniqueNames} onChange={onChangeHandler} className='text-lg'/>
    </>
    
  )
}

export default Cities