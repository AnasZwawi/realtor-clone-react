import React, { useEffect, useState } from 'react'
import data from '../data/tn.json'

function searchLocation(searchItem) {
  const dataArray = data
  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    // Filter the array to include only objects that contain the searchItem in admin_name
    const results = dataArray.filter(obj => 
      obj.city && obj.city.includes(searchItem)
    );
    setSearchResults(results);
  }, [dataArray, searchItem]);

  return searchResults;
}

export default searchLocation