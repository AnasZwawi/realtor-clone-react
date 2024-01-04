import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import data from '../data/tn.json'
import getCities from '../functions/getCities';
import Cities from './Cities';


const Location = (props) => {
  const [search, setSearch] = useState(false)
  const [option, setOption] = useState('')
  
  const uniqueNames = getCities(data)

  function searchTerm(opt){
    setOption(opt)
    setSearch(true)
  }


  return (
    <div className='mt-6'>
      <h1 className="text-lg mt-6 font-semibold text-gray-800">Choose the State</h1>
      <Select options={uniqueNames} onChange={searchTerm} className='text-lg'/>
      {search && <Cities option={option} returnLocation={props.returnLocation}/>}
    </div>
  );
}

export default Location;
