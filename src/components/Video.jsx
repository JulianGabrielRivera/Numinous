import React, { useEffect, useState } from 'react';

import videoBg from '../assets/video/beachvid.mp4';

import axios from 'axios';
import SearchBar from './SearchBar';
const API_URL = process.env.REACT_APP_SERVER_URL;
const Video = (props) => {
  const {
    setState,
    dataClone,
    filterState,
    originalPlaces,
    filterDataClone,
    filterPlacesByString,
    placesDataState,
    setFilterDataCloneTwo,
    filteredPlacesTwo,
  } = props;
  const [continent, setContinent] = useState('');
  const continents = [
    'South America',
    'North America',
    'Europe',
    'Asia',
    'Oceania',
    'Africa',
  ];
  const handleContinents = (e) => {
    setContinent(e.target.value);
  };
  const handleContinent = (continent) => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        console.log(response.data);

        let filterPlaces = response.data.message.filter((eachPlace) => {
          console.log(eachPlace);
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

  const handleContinentTwo = (event) => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        console.log(response.data);

        let filterPlaces = response.data.message.filter((eachPlace) => {
          console.log(eachPlace);
          if (eachPlace.continent === event.target.value) {
            return eachPlace;
          }
        });

        filterState([...filterPlaces]);
        setContinent([...filterPlaces]);
        console.log(continent);
        console.log(filterPlaces);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(continent);
  const allPlaces = () => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        filterState([...response.data.message]);
        console.log(response.data.message);
      })
      .catch((err) => console.log(err));
  };
  console.log(continent);
  return (
    <>
      <div className='videoContainer'>
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          style={{ height: '400px' }}
          id='videoBackground'
          className='video'
        />

        <div className='centered'>
          <h1>Numinous</h1>
        </div>
      </div>
      <div className='videoButtonContainer'>
        <SearchBar
          filterDataClone={filterDataClone}
          filterPlacesByString={filterPlacesByString}
        />
        <div className='filterContainer'>
          <div className='buttonContainer'>
            <button
              onClick={() => {
                allPlaces();
              }}
            >
              Show All
            </button>
            {/* map will create button for each item in the array then handlebutton function will receive the same value of item of array which would be string and filter function would filter based on value of each item */}
            {/*  if it was bigger we would create an array and foreach item of array it would filter the string */}
            {continents.map((continent) => {
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
          name='selectPlaces'
          id='selectPlaces'
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
        >
          {continents.map((continent) => {
            return (
              <option
                value={continent}
                onClick={(event) => handleContinentTwo(event.target.value)}
              >
                {continent}
              </option>
            );
          })}
          <h1></h1>
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
      </div>
    </>
  );
};

export default Video;
