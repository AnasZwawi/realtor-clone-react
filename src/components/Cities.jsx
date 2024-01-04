import React, { useState } from "react";
import searchSubCities from "../functions/searchSubCities";
import Select from "react-select";
import getSubCities from "../functions/getSubCities";
import searchLocation from "../functions/searchLocation";

function Cities(props) {
  const [searchItem, setSearchItem] = useState();

  const cities = searchSubCities(props.option.value);

  const uniqueNames = getSubCities(cities);

  function onChangeHandler(opt) {
    setSearchItem(opt.value);
  }

  const res = searchLocation(searchItem);
  props.returnLocation(res);
  return (
    <>
      <p className="text-lg mt-6 font-semibold text-gray-800">
        Choose the City
      </p>
      <Select
        isSearchable={false}
        styles={{
          // Example: Override specific styles
          control: (provided) => ({
            ...provided,
            // Add Tailwind classes to override styles
            border: "1px solid #cacaca !important",
            padding: "0.25rem",
            fontSize: "19px",
            fontWeight: "500",
          }),
        }}
        options={uniqueNames}
        onChange={onChangeHandler}
      />
    </>
  );
}

export default Cities;
