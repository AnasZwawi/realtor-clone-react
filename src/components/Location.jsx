import React, { useState, useEffect } from "react";
import Select from "react-select";
import data from "../data/tn.json";
import getCities from "../functions/getCities";
import Cities from "./Cities";

const Location = (props) => {
  const [search, setSearch] = useState(false);
  const [option, setOption] = useState("");

  const uniqueNames = getCities(data);

  function searchTerm(opt) {
    setOption(opt);
    setSearch(true);
  }

  return (
    <div className="mt-6 mb-1">
      <h1 className="text-lg font-semibold text-gray-800">Choose the State</h1>
      <Select
        options={uniqueNames}
        onChange={searchTerm}
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
            color: "#cacaca !important"
          }),
        }}
      />
      {search && (
        <Cities option={option} returnLocation={props.returnLocation} />
      )}
    </div>
  );
};

export default Location;
