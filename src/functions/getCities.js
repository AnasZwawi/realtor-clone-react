import React, { useEffect, useState } from 'react'

function getCities(inputArray) {
  const [uniqueNames, setUniqueNames] = useState([]);
  
  // Function to get unique names from an array of objects
  const getUniqueNames = (arr) => {
    const uniqueNamesSet = new Set();
    const uniqueNamesArray = [];

    arr.forEach(obj => {
      if (obj && obj.admin_name && !uniqueNamesSet.has(obj.admin_name)) {
        uniqueNamesSet.add(obj.admin_name);
        uniqueNamesArray.push({ value: obj.admin_name, label: obj.admin_name });
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

export default getCities