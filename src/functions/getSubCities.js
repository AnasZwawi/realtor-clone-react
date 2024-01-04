import React, { useEffect, useState } from 'react'

function getSubCities(inputArray) {
  const [uniqueNames, setUniqueNames] = useState([]);
  
  // Function to get unique names from an array of objects
  const getUniqueNames = (arr) => {
    const uniqueNamesSet = new Set();
    const uniqueNamesArray = [];

    arr.forEach(obj => {
      if (obj && obj.city && !uniqueNamesSet.has(obj.city)) {
        uniqueNamesSet.add(obj.city);
        uniqueNamesArray.push({ value: obj.city, label: obj.city });
      }
    });
    return uniqueNamesArray;
  }

  // Set unique names when the component mounts or when inputArray changes
  useEffect(() => {
    const names = getUniqueNames(inputArray);
    setUniqueNames(names);
  }, [inputArray]);
  
  return uniqueNames
}

export default getSubCities