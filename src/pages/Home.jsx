import React from "react";
import Location from "../components/Location";
import data from '../data/tn.json'

function Home() {
  return (
    <>
      <div>Home</div>
      <Location inputArray={data}/>
    </>
  );
}

export default Home;
