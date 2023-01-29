import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import Typewriter from "typewriter-effect";

const SearchPlaces = (props) => {
  const { filterDataClone, filterPlacesByString } = props;
  // console.log(filterDataClone);
  const [searchTerm, setSearchTerm] = useState("");

  // console.log(props);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    props.filterPlacesByString(e.target.value);
  };

  return (
    <div className="searchHere">
      <button
        style={{
          color: "#343a40",
          fontWeight: "bold",
          fontSize: "1.2rem",
          borderRadius: "10px",
          border: "1.5px dashed #343a40",
          width: "100px",
          textAlign: "center",
          marginRight: "10px",
        }}
      >
        <Typewriter
          options={{
            strings: ["Filter"],
            autoStart: true,
            loop: true,
            delay: 60,
            pauseFor: 1000000000,
            cursor: "",
          }}
        />
      </button>
      <SearchIcon
        className="h-5 w-5 text-blue-500"
        style={{ height: "20px", marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Search for places"
        style={{ height: "25px", borderRadius: "5px", padding: "10px" }}
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchPlaces;
