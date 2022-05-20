import React, { useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import videoBg from '../assets/video/beachvid.mp4';
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;
const Video = (props) => {
  const { setState, dataClone, filterState, originalPlaces } = props;

  const continents = [
    'South America',
    'North America',
    'Europe',
    'Asia',
    'Oceania',
    'Africa',
  ];

  const handleContinent = (continent) => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        console.log(response.data);

        let filterPlaces = response.data.message.filter((eachPlace) => {
          if (eachPlace.continent === continent) {
            return eachPlace;
          }
        });
        console.log(filterPlaces);
        filterState([...filterPlaces]);
        originalPlaces([...filterPlaces]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const allPlaces = () => {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        setState([...response.data.message]);
        console.log(response.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='videoContainer'>
      <video src={videoBg} autoPlay loop muted style={{ height: '400px' }} />

      <div className='centered'>
        <h1>Numinous</h1>
      </div>

      <div className='videoButtonContainer'>
        <div className='searchHere'>
          <button
            style={{
              color: '#343a40',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              borderRadius: '10px',
              border: '1.5px dashed #343a40',
              width: '100px',
              textAlign: 'center',
              marginRight: '10px',
            }}
          >
            Filter
          </button>
          <SearchIcon
            className='h-5 w-5 text-blue-500'
            style={{ height: '20px', marginRight: '10px' }}
          />
          <input
            type='text'
            placeholder='Search for places'
            style={{ height: '25px', borderRadius: '5px' }}
          />
        </div>
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
      </div>
    </div>
  );
};

export default Video;
