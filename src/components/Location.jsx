import React, { useState, useEffect } from 'react';
import Select from 'react-select'

const Location = ({ inputArray }) => {
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
  
  return (
    <div>
      <h1>Unique Names List</h1>
      <Select options={uniqueNames} />
    </div>
  );
}

export default Location;
