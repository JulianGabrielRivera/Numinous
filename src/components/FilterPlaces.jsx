import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const FilterPlaces = (props) => {
  const { filteredPlaces, showAll, handleSearch } = props;

  const [firstLetter, setFirstLetter] = useState("");

  const API_URL = process.env.REACT_APP_SERVER_URL;

  const continents = [
    "South America",
    "North America",
    "Europe",
    "Asia",
    "Oceania",
    "Africa",
  ];

  return (
    <>
      <motion.div layout className="filterButtonContainer">
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
            Filter
          </button>
          <SearchIcon
            className="h-5 w-5 text-blue-500"
            style={{ height: "20px", marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="Search for places"
            style={{ height: "25px", borderRadius: "5px" }}
            onChange={handleSearch}
          />
        </div>
        <motion.div layout className="filterContainer">
          <motion.div layout className="buttonContainer">
            <button onClick={showAll}>Show All</button>
            {/* map will create button for each item in the array then handlebutton function will receive the same value of item of array which would be string and filter function would filter based on value of each item */}
            {/*  if it was bigger we would create an array and foreach item of array it would filter the string */}
            {continents.map((continent) => {
              return (
                <button
                  key={continent}
                  onClick={() => {
                    filteredPlaces(continent);
                  }}
                ></button>
              );
            })}

            {/*            
           
              <button
                onClick={() => {
                  handleContinent('South America');
                }}
              >
                North America
              </button>
  
              <button
                onClick={() => {
                  handleContinent('Europe');
                }}
              >
                Europe
              </button>
              <button>Asia</button>
              <button>South America</button>
              <button>Australia</button>
              <button>Africa</button>
              <button>Antartica</button> */}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FilterPlaces;
