import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import videoBg from '../assets/video/beachvid.mp4';

const Video = (props) => {
  return (
    <div className='videoContainer'>
      <video src={videoBg} autoPlay loop muted />
      <div className='centered'>
        <h1>Numinous</h1>
      </div>
      <div className='videoButtonContainer'>
        <div>
          <SearchIcon
            className='h-5 w-5 text-blue-500'
            style={{ height: '20px', marginRight: '10px' }}
          />
          <input
            type='text'
            placeholder='Search here'
            style={{ height: '25px', borderRadius: '5px' }}
          />
        </div>
        <div className='filterContainer'>
          <div className='buttonContainer'>
            <button>North America</button>
            <button>Europe</button>
            <button>Asia</button>
            <button>South America</button>
            <button>Australia</button>
            <button>Africa</button>
            <button>Antartica</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
