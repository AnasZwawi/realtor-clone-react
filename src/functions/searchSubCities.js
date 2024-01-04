import React, { useState, useEffect } from 'react';
import data from '../data/tn.json'

const searchSubCities = (searchItem) => {
  const dataArray = data
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Filter the array to include only objects that contain the searchItem in admin_name
    const results = dataArray.filter(obj => 
      obj.admin_name && obj.admin_name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setSearchResults(results);

  }, [dataArray, searchItem]);

  return searchResults;
};

export default searchSubCities