import React from 'react';

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
          <input type='text' placeholder='Search here' />
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
