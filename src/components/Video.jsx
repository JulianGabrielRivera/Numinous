import React, { useEffect, useState, useContext } from "react";
import { storeContext } from "../context/store.context";
import { AuthContext } from "../context/auth.context";

import { Link } from "react-router-dom";
import videoBg from "../assets/video/beachvid.mp4";
import "animate.css";
import axios from "axios";
import SearchBar from "./SearchBar";
import { StarIcon } from "@heroicons/react/solid";

const API_URL = process.env.REACT_APP_SERVER_URL;
const Video = (props) => {
  const { filterState, filterDataClone, filterPlacesByString, likess } = props;

  const { storedToken, totalLikes, setTotalLiked } = useContext(AuthContext);
  const [oneContinent, setContinent] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [placesLiked, setTotalPlacesLiked] = useState();
  const continents = [
    "South America",
    "North America",
    "Europe",
    "Asia",
    "Oceania",
    "Africa",
  ];

  let carto = localStorage.getItem("cart");
  carto = JSON.parse(carto);
  // console.log(carto);

  const handleContinents = (e) => {
    setContinent(e.target.value);
  };
  const handleContinent = (continent) => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        // console.log(response.data);

        let filterPlaces = response.data.message.filter((eachPlace) => {
          // console.log(eachPlace);
          if (eachPlace.continent === continent) {
            return eachPlace;
          }
        });

        filterState([...filterPlaces]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleContinentTwo = (continent) => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        // console.log(response.data);

        let filterPlaces = response.data.message.filter((eachPlace) => {
          console.log(eachPlace);
          if (eachPlace.continent === continent) {
            return eachPlace;
          }
        });

        filterState([...filterPlaces]);

        setFilterData([...filterPlaces]);

        // console.log(filterPlaces);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(filterData, 'yo');
  // console.log(oneContinent);

  const allPlaces = () => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        filterState([...response.data.message]);
        // console.log(response.data.message);
      })
      .catch((err) => console.log(err));
  };
  let bagCount = 0;

  carto.forEach((item) => {
    return Number((bagCount += item.quantity));
  });

  // console.log(filterData);
  return (
    <>
      <div className="videoContainer">
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          style={{ height: "400px" }}
          id="videoBackground"
          className="video"
        />

        <div className="centered">
          <h1 className="numinous-title">Numinous</h1>
        </div>
      </div>
      <div className="videoButtonContainer">
        <SearchBar
          filterDataClone={filterDataClone}
          filterPlacesByString={filterPlacesByString}
        />
        <div className="filterContainer">
          <div className="buttonContainer">
            <button
              onClick={() => {
                allPlaces();
              }}
            >
              Show All
            </button>
            {/* map will create button for each item in the array then handlebutton function will receive the same value of item of array which would be string and filter function would filter based on value of each item */}
            {/*  if it was bigger we would create an array and foreach item of array it would filter the string */}
            {continents.map((continent, i) => {
              return (
                <button
                  key={continent}
                  onClick={() => {
                    handleContinent(continent);
                  }}
                >
                  {continent}
                </button>
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
          </div>
        </div>

        <select
          name="selectPlaces"
          id="selectPlaces"
          onChange={(e) => handleContinentTwo(e.target.value)}
        >
          {continents.map((continent, i) => {
            return (
              <option key={i} value={continent}>
                {continent}
              </option>
            );
          })}
          {/* {filterDataClone.map((place) => {
            return <h1>{place.name}</h1>;
          })} */}
          {/* <option
            value='
          South America'
          >
            South America
          </option>
          <option value='North America' onChange={handleContinents}>
            North America
          </option>
          <option value='Europe'>Europe</option>
          <option value='Asia'>Asia</option>
          <option value='Oceania'>Oceania</option>
          <option value='Africa'>Africa</option> */}
        </select>
        <Link to={"/cart"}>
          <div style={{ position: "relative", color: "black" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width={25}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className="bagCount">
              {/* {carto.forEach((item) => {
                console.log(item);
                return (bagCount += item.quantity);
              })} */}
              {bagCount}
            </span>
          </div>
        </Link>
        <Link to={"/mylikedplaces"}>
          <div style={{ position: "relative", color: "blue" }}>
            <StarIcon width={32} />
            <span className="likeCount">{totalLikes}</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Video;
